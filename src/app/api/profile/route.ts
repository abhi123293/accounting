import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

async function verifySession() {
  if (!adminAuth) {
    throw new Error("ADMIN_NOT_CONFIGURED");
  }

  const cookieStore = await cookies();
  const session = cookieStore.get("__session")?.value;

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  try {
    return await adminAuth.verifySessionCookie(session, true);
  } catch {
    // Invalid/expired session cookie — force re-auth
    throw new Error("UNAUTHORIZED");
  }
}

function handleError(error: unknown) {
  const message = error instanceof Error ? error.message : "";

  if (message === "UNAUTHORIZED") {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  console.error("Profile API error:", error);

  return NextResponse.json(
    { error: "Unable to process profile request." },
    { status: 500 }
  );
}

export async function GET() {
  try {
    const decoded = await verifySession();

    if (!adminDb) {
      return NextResponse.json(
        { error: "Firebase Admin not configured." },
        { status: 503 }
      );
    }

    const snapshot = await adminDb
      .collection("users")
      .doc(decoded.uid)
      .get();
    const data = snapshot.exists ? snapshot.data()! : {};

    const str = (value: unknown) => (typeof value === "string" ? value : "");

    const name = str(decoded.name) || str(data.displayName);
    const firstName =
      str(data.firstName) || (name ? name.split(" ")[0] : "");
    const lastName =
      str(data.lastName) ||
      (name ? name.split(" ").slice(1).join(" ") : "");

    return NextResponse.json({
      profile: {
        firstName,
        lastName,
        phone: str(data.phone),
        bio: str(data.bio),
        email: str(decoded.email),
      },
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const decoded = await verifySession();

    if (!adminDb) {
      return NextResponse.json(
        { error: "Firebase Admin not configured." },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => null);
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid profile payload." },
        { status: 400 }
      );
    }

    const firstName =
      typeof body.firstName === "string" ? body.firstName.trim() : "";
    const lastName =
      typeof body.lastName === "string" ? body.lastName.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const bio = typeof body.bio === "string" ? body.bio.trim() : "";

    if (!firstName || firstName.length > 60) {
      return NextResponse.json(
        { error: "First name is required (max 60 characters)." },
        { status: 400 }
      );
    }

    if (lastName.length > 60) {
      return NextResponse.json(
        { error: "Last name is too long (max 60 characters)." },
        { status: 400 }
      );
    }

    if (phone.length > 30) {
      return NextResponse.json(
        { error: "Phone number is too long." },
        { status: 400 }
      );
    }

    if (bio.length > 200) {
      return NextResponse.json(
        { error: "Bio is too long (max 200 characters)." },
        { status: 400 }
      );
    }

    const displayName = `${firstName} ${lastName}`.trim();

    const data = {
      firstName,
      lastName,
      displayName,
      phone,
      bio,
      email: typeof decoded.email === "string" ? decoded.email : "",
      updatedAt: new Date().toISOString(),
    };

    await adminDb.collection("users").doc(decoded.uid).set(data, { merge: true });

    if (adminAuth && decoded.email) {
      try {
        await adminAuth.updateUser(decoded.uid, { displayName });
      } catch (error) {
        console.warn("Unable to update Firebase Auth displayName:", error);
      }
    }

    return NextResponse.json({ profile: data });
  } catch (error) {
    return handleError(error);
  }
}
