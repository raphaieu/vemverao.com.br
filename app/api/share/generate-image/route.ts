import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-firebase";
import { getQuizResponseById, getOrCreateShareableResult } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const { quizResponseId } = body;

    // Verificar se o quiz pertence ao usuário
    const quizResponse = await getQuizResponseById(
      quizResponseId,
      session.user.id as string
    );

    if (!quizResponse) {
      return NextResponse.json(
        { error: "Quiz não encontrado" },
        { status: 404 }
      );
    }

    // Criar ou buscar shareable result
    const shareToken = await getOrCreateShareableResult(quizResponseId);

    // Retornar token para compartilhamento
    return NextResponse.json({
      shareToken,
      shareUrl: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/share/${shareToken}`,
    });
  } catch (error) {
    console.error("Erro ao gerar share:", error);
    return NextResponse.json(
      { error: "Erro ao gerar link de compartilhamento" },
      { status: 500 }
    );
  }
}
