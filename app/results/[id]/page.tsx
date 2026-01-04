import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-firebase";
import { redirect } from "next/navigation";
import { getQuizResponseById } from "@/lib/db";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import { QuizResponse, QuizResult } from "@/types/quiz";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ResultsPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const quizResponse = await getQuizResponseById(
    params.id,
    session.user.id as string
  );

  if (!quizResponse) {
    redirect("/");
  }

  const responses = quizResponse.responses as QuizResponse;
  const badges = Array.isArray(quizResponse.badges)
    ? quizResponse.badges
    : [];

  const result: QuizResult = {
    score: quizResponse.score,
    archetype: quizResponse.archetype,
    badges,
    aiSummary: quizResponse.aiSummary || undefined,
    aiAdvice: quizResponse.aiAdvice || undefined,
    aiCaption: quizResponse.aiCaption || undefined,
    reportName: quizResponse.reportName || undefined,
  };

  return (
    <DashboardContainer
      quizResponseId={params.id}
      initialData={{ responses, result }}
    />
  );
}

