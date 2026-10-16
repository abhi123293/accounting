
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { isAdminUid } from "@/lib/admin-uid";
import { createNotification } from "@/lib/notifications";

const ACCOUNT_TYPES = [
  "asset",
  "liability",
  "equity",
  "revenue",
  "expense",
] as const;

type AccountType = (typeof ACCOUNT_TYPES)[number];

async function verifyAdminSession() {
  if (!adminAuth) {
    throw new Error("ADMIN_NOT_CONFIGURED");
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) {
    throw new Error("UNAUTHORIZED");
  }

  // Verify as session cookie (created by /api/auth/session)
  let decoded;
  try {
    decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
  } catch {
    // Invalid/expired session cookie (or raw ID token fallback) — force re-auth
    throw new Error("UNAUTHORIZED");
  }

  if (!isAdminUid(decoded.uid)) {
    throw new Error("FORBIDDEN");
  }

  return decoded;
}

function errorResponse(error: unknown) {
  if (error instanceof Error && error.message === "UNAUTHORIZED") {
    return NextResponse.json(
      { error: "Please sign in to continue." },
      { status: 401 }
    );
  }

  if (error instanceof Error && error.message === "FORBIDDEN") {
    return NextResponse.json(
      { error: "Administrator access required." },
      { status: 403 }
    );
  }

  if (error instanceof Error && error.message === "ADMIN_NOT_CONFIGURED") {
    return NextResponse.json(
      { error: "Firebase Admin is not configured correctly." },
      { status: 503 }
    );
  }

  console.error("Accounts API error:", error);

  return NextResponse.json(
    { error: "Unable to process accounts request." },
    { status: 500 }
  );
}

export async function GET() {
  try {
    await verifyAdminSession();

    if (!adminDb) {
      return NextResponse.json(
        { error: "Firebase Admin not configured." },
        { status: 503 }
      );
    }

    const snapshot = await adminDb.collection("accounts").get();

    const accounts = snapshot.docs.map((document) => {
      const data = document.data();

      return {
        id: document.id,
        code: String(data.code ?? ""),
        name: String(data.name ?? ""),
        type: data.type as AccountType,
        isActive: data.isActive !== false,
      };
    });

    accounts.sort((a, b) => a.code.localeCompare(b.code));

    return NextResponse.json({ accounts });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await verifyAdminSession();

    if (!adminDb) {
      return NextResponse.json(
        { error: "Firebase Admin not configured." },
        { status: 503 }
      );
    }

    const body = await request.json();

    const code =
      typeof body.code === "string" ? body.code.trim() : "";
    const name =
      typeof body.name === "string" ? body.name.trim() : "";
    const type = body.type as AccountType;

    if (!code || !name || code.length > 30 || name.length > 150) {
      return NextResponse.json(
        { error: "Enter a valid account code and name." },
        { status: 400 }
      );
    }

    if (!ACCOUNT_TYPES.includes(type)) {
      return NextResponse.json(
        { error: "Select a valid account type." },
        { status: 400 }
      );
    }

    const accountsRef = adminDb.collection("accounts");

    const account = await adminDb.runTransaction(async (transaction) => {
      const existing = await transaction.get(
        accountsRef.where("code", "==", code)
      );

      if (!existing.empty) {
        throw new Error("DUPLICATE_ACCOUNT_CODE");
      }

      const documentRef = accountsRef.doc();

      const newAccount = {
        code,
        name,
        type,
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      transaction.set(documentRef, newAccount);

      return {
        id: documentRef.id,
        ...newAccount,
      };
    });

    await createNotification({
  title: "Account created",
  message: `${account.code} — ${account.name} was added to the chart of accounts.`,
  type: "account_created",
  link: "/accounts",
  entityId: account.id,
});

    return NextResponse.json({ account }, { status: 201 });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "DUPLICATE_ACCOUNT_CODE"
    ) {
      return NextResponse.json(
        { error: "An account with this code already exists." },
        { status: 409 }
      );
    }

    return errorResponse(error);
  }
}
