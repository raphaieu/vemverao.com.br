import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-firebase";
import { createQuizResponse } from "@/lib/db";
import { calculateScore } from "@/lib/scoring/calculateScore";
import { getBadges } from "@/lib/scoring/getBadges";
import { getArchetype } from "@/lib/scoring/getArchetype";
import { QuizResponse } from "@/types/quiz";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const responses: QuizResponse = body.responses;

    // Calcular score, badges e arquétipo
    const score = calculateScore(responses);
    const badges = getBadges(responses);
    const archetype = getArchetype(responses);

    // Salvar no Firestore
    const quizResponseId = await createQuizResponse({
      userId: session.user.id as string,
      responses,
      score,
      archetype,
      badges,
    });

    return NextResponse.json({ id: quizResponseId });
  } catch (error) {
    console.error("Erro ao submeter quiz:", error);
    return NextResponse.json(
      { 
        error: "Erro ao processar quiz",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

