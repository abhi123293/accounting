import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) throw new Error("UNAUTHORIZED");

if (!adminAuth || !adminDb) {
  throw new Error("FIREBASE_ADMIN_NOT_INITIALIZED");
}

const decoded = await adminAuth.verifySessionCookie(session, true);

  if (
    !process.env.FIREBASE_ADMIN_UID ||
    decoded.uid !== process.env.FIREBASE_ADMIN_UID
  ) {
    throw new Error("FORBIDDEN");
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await verifyAdmin();

    if (!adminAuth || !adminDb) {
  throw new Error("FIREBASE_ADMIN_NOT_INITIALIZED");
}
    const { id } = await params;
    const body = await request.json();

    const amount = Number(body.amount);
    const paymentDate =
      typeof body.paymentDate === "string" ? body.paymentDate : "";
    const method =
      typeof body.method === "string" ? body.method : "";
    const reference =
      typeof body.reference === "string" ? body.reference.trim() : "";

    const allowedMethods = [
      "cash",
      "bank_transfer",
      "card",
      "upi",
      "cheque",
      "other",
    ];

    if (
      !Number.isFinite(amount) ||
      amount <= 0 ||
      !/^\d{4}-\d{2}-\d{2}$/.test(paymentDate) ||
      !Number.isFinite(Date.parse(`${paymentDate}T00:00:00Z`)) ||
      !allowedMethods.includes(method)
    ) {
      return NextResponse.json(
        { error: "Enter a valid amount, payment date, and method." },
        { status: 400 }
      );
    }

    const invoiceRef = adminDb.collection("invoices").doc(id);
    const paymentRef = invoiceRef.collection("payments").doc();

    const result = await adminDb.runTransaction(async (transaction) => {
      const invoiceDoc = await transaction.get(invoiceRef);

      if (!invoiceDoc.exists) throw new Error("INVOICE_NOT_FOUND");

      const invoice = invoiceDoc.data()!;

      if (invoice.status === "draft") {
        throw new Error("ISSUE_INVOICE_FIRST");
      }

      if (invoice.status === "paid") {
        throw new Error("INVOICE_ALREADY_PAID");
      }

      const paymentsSnapshot = await transaction.get(
        invoiceRef.collection("payments")
      );

      const amountPaidCents = paymentsSnapshot.docs.reduce(
        (sum, doc) =>
          sum + Math.round(Number(doc.data().amount ?? 0) * 100),
        0
      );

      const totalCents = Math.round(Number(invoice.total) * 100);
      const paymentCents = Math.round(amount * 100);
      const balanceCents = totalCents - amountPaidCents;

      if (
        !Number.isFinite(totalCents) ||
        totalCents <= 0 ||
        balanceCents <= 0
      ) {
        throw new Error("INVALID_INVOICE_TOTAL");
      }

      if (paymentCents > balanceCents) {
        throw new Error("PAYMENT_EXCEEDS_BALANCE");
      }

      const newPaidCents = amountPaidCents + paymentCents;
      const newBalanceCents = totalCents - newPaidCents;
      const today = new Date().toISOString().slice(0, 10);

      const status =
        newBalanceCents === 0
          ? "paid"
          : invoice.dueDate < today
            ? "overdue"
            : "partially_paid";

      transaction.set(paymentRef, {
        amount: paymentCents / 100,
        paymentDate,
        method,
        reference,
        createdAt: new Date().toISOString(),
      });

      transaction.update(invoiceRef, {
        amountPaid: newPaidCents / 100,
        balanceDue: newBalanceCents / 100,
        status,
        updatedAt: new Date().toISOString(),
      });

      return {
        amountPaid: newPaidCents / 100,
        balanceDue: newBalanceCents / 100,
        status,
      };
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    const errors: Record<string, { error: string; status: number }> = {
      UNAUTHORIZED: {
        error: "Authentication required.",
        status: 401,
      },
      FORBIDDEN: {
        error: "Admin access required.",
        status: 403,
      },
      INVOICE_NOT_FOUND: {
        error: "Invoice not found.",
        status: 404,
      },
      ISSUE_INVOICE_FIRST: {
        error: "Issue the invoice before recording a payment.",
        status: 400,
      },
      INVOICE_ALREADY_PAID: {
        error: "This invoice is already paid.",
        status: 400,
      },
      INVALID_INVOICE_TOTAL: {
        error: "The invoice total or remaining balance is invalid.",
        status: 400,
      },
      PAYMENT_EXCEEDS_BALANCE: {
        error: "Payment cannot exceed the remaining balance.",
        status: 400,
      },
      FIREBASE_ADMIN_NOT_INITIALIZED: {
  error: "Firebase Admin is not initialized. Check your server configuration.",
  status: 500,
},
    };

    const knownError = errors[message];

    if (knownError) {
      return NextResponse.json(
        { error: knownError.error },
        { status: knownError.status }
      );
    }

    console.error("Record invoice payment error:", error);

    return NextResponse.json(
      { error: "Unable to record invoice payment." },
      { status: 500 }
    );
  }
}

