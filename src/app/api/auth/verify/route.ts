import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

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

    const decodedToken = await adminAuth.verifyIdToken(token);

    const adminUid = process.env.FIREBASE_ADMIN_UID;

    if (!adminUid || decodedToken.uid !== adminUid) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      verified: true,
      uid: decodedToken.uid,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}