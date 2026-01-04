import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let adminApp: App | undefined;
let adminDb: Firestore | undefined;

function getAdminApp(): App {
  if (adminApp) return adminApp;

  if (!getApps().length) {
    try {
      const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
        ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
        : undefined;

      if (serviceAccount) {
        adminApp = initializeApp({
          credential: cert(serviceAccount),
        });
      } else if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        // Fallback para desenvolvimento local (emulator ou sem credenciais)
        adminApp = initializeApp({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
      } else {
        throw new Error("Firebase não configurado. Configure as variáveis de ambiente.");
      }
    } catch (error) {
      console.warn("⚠️  Firebase Admin não inicializado:", error);
      // Em desenvolvimento, pode continuar sem Firebase
      if (process.env.NODE_ENV === "development") {
        adminApp = initializeApp({
          projectId: "dev-project",
        });
      } else {
        throw error;
      }
    }
  } else {
    adminApp = getApps()[0];
  }

  return adminApp;
}

function getAdminDb(): Firestore {
  if (adminDb) return adminDb;
  adminDb = getFirestore(getAdminApp());
  return adminDb;
}

export function adminApp() {
  return getAdminApp();
}

export function adminDb() {
  return getAdminDb();
}
