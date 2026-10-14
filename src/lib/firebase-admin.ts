import "server-only";

import {
  cert,
  getApp,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../../firebase-service-account.json";

const app = getApps().length
  ? getApp()
  : initializeApp({
      credential: cert(serviceAccount),
    });

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);