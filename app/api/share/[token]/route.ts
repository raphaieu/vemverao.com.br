import { NextRequest, NextResponse } from "next/server";
import { getShareableResultByToken } from "@/lib/db";
import { QuizResponse, QuizResult } from "@/types/quiz";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const shareable = await getShareableResultByToken(params.token);

    if (!shareable) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 404 }
      );
    }

    const responses = shareable.quizResponse.responses as QuizResponse;
    const badges = Array.isArray(shareable.quizResponse.badges)
      ? shareable.quizResponse.badges
      : [];

    const result: QuizResult = {
      score: shareable.quizResponse.score,
      archetype: shareable.quizResponse.archetype,
      badges,
    };

    return NextResponse.json({
      responses,
      result,
      reportName: shareable.quizResponse.reportName || undefined,
    });
  } catch (error) {
    console.error("Erro ao buscar share:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 500 }
    );
  }
}

