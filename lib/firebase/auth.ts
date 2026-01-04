import { getAuth } from "firebase-admin/auth";
import { adminApp } from "./admin";

export function getAdminAuth() {
  try {
    return getAuth(adminApp());
  } catch (error) {
    console.warn("Firebase Admin Auth não disponível:", error);
    throw error;
  }
}

