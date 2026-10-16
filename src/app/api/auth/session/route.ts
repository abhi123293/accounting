import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { isAdminUid } from "@/lib/admin-uid";

const SESSION_DURATION = 5 * 24 * 60 * 60 * 1000;

export async function POST(request: Request) {
  try {
    if (!adminAuth) {
      return NextResponse.json(
        { error: "Firebase Admin not configured" },
        { status: 503 }
      );
    }

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

    if (!isAdminUid(decoded.uid)) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const sessionCookie = await adminAuth.createSessionCookie(token, {
      expiresIn: SESSION_DURATION,
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set("__session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION / 1000,
    });

    return response;
  } catch (error) {
    console.error(
      "Session cookie creation failed:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Unable to create session" },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("__session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}