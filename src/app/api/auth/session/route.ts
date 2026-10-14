import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

const SESSION_DURATION = 5 * 24 * 60 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get("authorization");
    const token = authorization?.startsWith("Bearer ")
      ? authorization.slice(7)
      : null;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const decoded = await adminAuth.verifyIdToken(token, true);
    const adminUid = process.env.FIREBASE_ADMIN_UID;

    if (!adminUid || decoded.uid !== adminUid) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const sessionCookie = await adminAuth.createSessionCookie(token, {
      expiresIn: SESSION_DURATION,
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION / 1000,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to create session" },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}