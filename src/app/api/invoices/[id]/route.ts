
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { isAdminUid } from "@/lib/admin-uid";

async function verifyAdmin() {
  if (!adminAuth) {
    throw new Error("ADMIN_NOT_CONFIGURED");
  }

  const cookieStore = await cookies();
  const session = cookieStore.get("__session")?.value;

  if (!session) throw new Error("UNAUTHORIZED");

 if (!adminAuth || !adminDb) {
  throw new Error("FIREBASE_ADMIN_NOT_INITIALIZED");
}

const decoded = await adminAuth.verifySessionCookie(session, true);

  if (!isAdminUid(decoded.uid)) {
    throw new Error("FORBIDDEN");
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await verifyAdmin();

    const { id } = await params;
    const body = await request.json();

    if (!adminDb) {
  return NextResponse.json(
    { error: "Firebase Admin database is not initialized." },
    { status: 500 }
  );
}

    if (body.status !== "sent") {
      return NextResponse.json(
        { error: "Only issuing a draft invoice is supported." },
        { status: 400 }
      );
    }

    const invoiceRef = adminDb.collection("invoices").doc(id);
    const invoice = await invoiceRef.get();

    if (!invoice.exists) {
      return NextResponse.json(
        { error: "Invoice not found." },
        { status: 404 }
      );
    }

    if (invoice.data()?.status !== "draft") {
      return NextResponse.json(
        { error: "Only draft invoices can be issued." },
        { status: 400 }
      );
    }

    await invoiceRef.update({
      status: "sent",
      sentAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      status: "sent",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    

    if (message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    if (message === "FORBIDDEN") {
      return NextResponse.json(
        { error: "Admin access required." },
        { status: 403 }
      );
    }

    if (message === "FIREBASE_ADMIN_NOT_INITIALIZED") {
  return NextResponse.json(
    {
      error:
        "Firebase Admin is not initialized. Check your server configuration.",
    },
    { status: 500 }
  );
}
    

    console.error("Issue invoice error:", error);

    return NextResponse.json(
      { error: "Unable to issue invoice." },
      { status: 500 }
    );
  }
}
