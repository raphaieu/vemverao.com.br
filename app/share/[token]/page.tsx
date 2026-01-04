"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ShareableCard from "@/components/share/ShareableCard";
import { QuizResponse, QuizResult } from "@/types/quiz";

export default function SharePage() {
  const params = useParams();
  const [data, setData] = useState<{
    responses: QuizResponse;
    result: QuizResult;
    reportName?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShareData();
  }, [params.token]);

  const loadShareData = async () => {
    try {
      const response = await fetch(`/api/share/${params.token}`);
      if (response.ok) {
        const shareData = await response.json();
        setData(shareData);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-summer-orange"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Resultado não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <ShareableCard
        responses={data.responses}
        result={data.result}
        reportName={data.reportName}
      />
    </div>
  );
}

