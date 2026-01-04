import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-firebase";
import { getQuizResponseById, updateQuizResponse } from "@/lib/db";
import { generateTexts } from "@/lib/ai/generateTexts";
import { QuizResponse, QuizResult } from "@/types/quiz";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const { quizResponseId } = body;

    // Buscar resposta do quiz
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

    // Se já tem textos gerados, retornar
    if (
      quizResponse.aiSummary &&
      quizResponse.aiAdvice &&
      quizResponse.aiCaption &&
      quizResponse.reportName
    ) {
      return NextResponse.json({
        summary: quizResponse.aiSummary,
        advice: quizResponse.aiAdvice,
        caption: quizResponse.aiCaption,
        reportName: quizResponse.reportName,
      });
    }

    // Gerar textos com IA
    const responses = quizResponse.responses as QuizResponse;
    const badges = Array.isArray(quizResponse.badges)
      ? quizResponse.badges
      : [];

    const result: QuizResult = {
      score: quizResponse.score,
      archetype: quizResponse.archetype,
      badges,
    };

    const texts = await generateTexts(responses, result);

    // Atualizar no Firestore
    await updateQuizResponse(quizResponseId, {
      aiSummary: texts.summary,
      aiAdvice: texts.advice,
      aiCaption: texts.caption,
      reportName: texts.reportName,
    });

    return NextResponse.json(texts);
  } catch (error) {
    console.error("Erro ao gerar textos:", error);
    return NextResponse.json(
      { error: "Erro ao gerar textos" },
      { status: 500 }
    );
  }
}

