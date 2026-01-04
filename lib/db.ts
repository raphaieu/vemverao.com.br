import { adminDb } from "./firebase/admin";
import { QuizResponse, QuizResult } from "@/types/quiz";

// Helper para garantir que o adminDb está disponível
function getDb() {
  try {
    return adminDb();
  } catch (error) {
    console.error("Erro ao acessar Firestore:", error);
    throw new Error("Firestore não está disponível. Configure o Firebase.");
  }
}

// Collections
export const COLLECTIONS = {
  USERS: "users",
  QUIZ_RESPONSES: "quizResponses",
  SHAREABLE_RESULTS: "shareableResults",
} as const;

// User operations
export async function getUserById(userId: string) {
  const db = getDb();
  const userDoc = await db.collection(COLLECTIONS.USERS).doc(userId).get();
  return userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
}

export async function createUser(userData: {
  id: string;
  email: string;
  name?: string;
  image?: string;
}) {
  const db = getDb();
  await db.collection(COLLECTIONS.USERS).doc(userData.id).set({
    email: userData.email,
    name: userData.name || null,
    image: userData.image || null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return userData;
}

export async function getOrCreateUser(userData: {
  id: string;
  email: string;
  name?: string;
  image?: string;
}) {
  const existing = await getUserById(userData.id);
  if (existing) return existing;
  return createUser(userData);
}

// Quiz Response operations
export async function createQuizResponse(data: {
  userId: string;
  responses: QuizResponse;
  score: number;
  archetype: string;
  badges: string[];
}) {
  const db = getDb();
  const docRef = db.collection(COLLECTIONS.QUIZ_RESPONSES).doc();
  
  await docRef.set({
    userId: data.userId,
    responses: data.responses,
    score: data.score,
    archetype: data.archetype,
    badges: data.badges,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return docRef.id;
}

export async function getQuizResponseById(id: string, userId: string) {
  const db = getDb();
  const doc = await db
    .collection(COLLECTIONS.QUIZ_RESPONSES)
    .doc(id)
    .get();

  if (!doc.exists) return null;

  const data = doc.data()!;
  
  // Verificar se pertence ao usuário
  if (data.userId !== userId) return null;

  return {
    id: doc.id,
    ...data,
  };
}

export async function updateQuizResponse(
  id: string,
  updates: {
    aiSummary?: string;
    aiAdvice?: string;
    aiCaption?: string;
    reportName?: string;
  }
) {
  const db = getDb();
  await db
    .collection(COLLECTIONS.QUIZ_RESPONSES)
    .doc(id)
    .update({
      ...updates,
      updatedAt: new Date(),
    });
}

// Shareable Result operations
export async function createShareableResult(quizResponseId: string) {
  const db = getDb();
  const shareToken = `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const docRef = db.collection(COLLECTIONS.SHAREABLE_RESULTS).doc();
  
  await docRef.set({
    quizResponseId,
    shareToken,
    createdAt: new Date(),
  });

  return shareToken;
}

export async function getShareableResultByToken(token: string) {
  const db = getDb();
  const snapshot = await db
    .collection(COLLECTIONS.SHAREABLE_RESULTS)
    .where("shareToken", "==", token)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  const data = doc.data();

  // Buscar o quiz response relacionado
  const quizResponse = await db
    .collection(COLLECTIONS.QUIZ_RESPONSES)
    .doc(data.quizResponseId)
    .get();

  if (!quizResponse.exists) return null;

  return {
    shareToken: data.shareToken,
    quizResponse: {
      id: quizResponse.id,
      ...quizResponse.data(),
    },
  };
}

export async function getOrCreateShareableResult(quizResponseId: string) {
  const db = getDb();
  // Verificar se já existe
  const snapshot = await db
    .collection(COLLECTIONS.SHAREABLE_RESULTS)
    .where("quizResponseId", "==", quizResponseId)
    .limit(1)
    .get();

  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return doc.data().shareToken;
  }

  // Criar novo
  return createShareableResult(quizResponseId);
}

