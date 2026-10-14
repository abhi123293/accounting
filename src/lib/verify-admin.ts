import { auth } from "@/lib/firebase";

export async function verifyAdmin(): Promise<boolean> {
  const user = auth.currentUser;

  if (!user) {
    return false;
  }

  const token = await user.getIdToken();

  const response = await fetch("/api/auth/verify", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return false;
  }

  const result = await response.json();

  return result.verified === true;
}