
import "server-only";

import { adminDb } from "@/lib/firebase-admin";

export type NotificationInput = {
  title: string;
  message: string;
  type: string;
  link: string;
  entityId?: string;
};

export async function createNotification(
  input: NotificationInput
): Promise<void> {
  try {
    if (!adminDb) {
      console.error(
        "Notification was not saved: Firebase Admin database is unavailable."
      );
      return;
    }

    await adminDb.collection("notifications").add({
      title: input.title,
      message: input.message,
      type: input.type,
      link: input.link,
      entityId: input.entityId ?? null,
      isRead: false,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    // A notification failure must not undo a successful business operation.
    console.error("Failed to save notification:", error);
  }
}
