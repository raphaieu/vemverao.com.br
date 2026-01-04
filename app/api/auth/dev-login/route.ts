import { NextRequest, NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/db";

export async function POST(request: NextRequest) {
  // Só funciona em desenvolvimento
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Não disponível em produção" },
      { status: 403 }
    );
  }

  try {
    const devUserId = "dev-user-id";
    const devEmail = "dev@vemverao.com.br";

    // Criar ou buscar usuário de desenvolvimento no Firestore
    try {
      await getOrCreateUser({
        id: devUserId,
        email: devEmail,
        name: "Usuário de Desenvolvimento",
      });
    } catch (error) {
      console.warn("Firebase não configurado, continuando sem banco:", error);
    }

    // Redirecionar para o quiz
    // O NextAuth vai gerenciar a sessão via cookie
    const response = NextResponse.redirect(
      new URL("/quiz", request.url)
    );

    // Nota: Em produção, você precisaria criar uma sessão válida do NextAuth
    // Por enquanto, isso só funciona se o Firebase estiver configurado
    // ou se você usar o login social real
    
    return response;
  } catch (error) {
    console.error("Erro ao criar login de desenvolvimento:", error);
    return NextResponse.json(
      { 
        error: "Erro ao criar sessão de desenvolvimento",
        details: error instanceof Error ? error.message : String(error),
        hint: "Configure o Firebase ou use login social"
      },
      { status: 500 }
    );
  }
}

