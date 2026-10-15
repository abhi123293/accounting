import "server-only";

import {
  cert,
  getApp,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let adminAuth: ReturnType<typeof getAuth> | null = null;
let adminDb: ReturnType<typeof getFirestore> | null = null;

try {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (serviceAccountJson) {
    let serviceAccount: {
      project_id: string;
      client_email: string;
      private_key: string;
    };

    try {
      serviceAccount = JSON.parse(serviceAccountJson);
    } catch {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON.");
    }

    if (
      serviceAccount.project_id &&
      serviceAccount.client_email &&
      serviceAccount.private_key
    ) {
      const app =
        getApps().length > 0
          ? getApp()
          : initializeApp({
              credential: cert({
                projectId: serviceAccount.project_id,
                clientEmail: serviceAccount.client_email,
                privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
              }),
storageBucket: 'accounting-software-505d5',
            });

      adminAuth = getAuth(app);
      adminDb = getFirestore(app);
    }
  } else if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    };

    const app =
      getApps().length > 0
        ? getApp()
        : initializeApp({
            credential: cert(serviceAccount),
            storageBucket: 'accounting-software-505d5',
          });

    adminAuth = getAuth(app);
    adminDb = getFirestore(app);
  }
} catch (error) {
  console.warn("Firebase Admin SDK initialization failed:", error);
}

export { adminAuth, adminDb };