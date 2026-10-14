
import "server-only";

import {
  cert,
  getApp,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

if (!serviceAccountJson) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_JSON is missing from the environment."
  );
}

let serviceAccount: {
  project_id: string;
  client_email: string;
  private_key: string;
};

try {
  serviceAccount = JSON.parse(serviceAccountJson);
} catch {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON."
  );
}

if (
  !serviceAccount.project_id ||
  !serviceAccount.client_email ||
  !serviceAccount.private_key
) {
  throw new Error(
    "Firebase service account is missing required fields."
  );
}

const app =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: cert({
          projectId: serviceAccount.project_id,
          clientEmail: serviceAccount.client_email,
          privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
        }),
      });

const adminAuth = getAuth(app);
const adminDb = getFirestore(app);

export { adminAuth, adminDb };
