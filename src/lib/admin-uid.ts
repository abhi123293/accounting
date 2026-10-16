export function isAdminUid(uid: string): boolean {
  const raw = process.env.FIREBASE_ADMIN_UID;
  if (!raw) return false;
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .includes(uid);
}
