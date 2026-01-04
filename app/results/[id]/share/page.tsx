"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import ShareableCard from "@/components/share/ShareableCard";
import { QuizResponse, QuizResult } from "@/types/quiz";

export default function SharePage() {
  const params = useParams();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<{
    responses: QuizResponse;
    result: QuizResult;
    reportName?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadShareData();
  }, [params.id]);

  const loadShareData = async () => {
    try {
      // Primeiro, criar ou buscar o shareable result
      const response = await fetch(`/api/share/generate-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizResponseId: params.id }),
      });

      if (response.ok) {
        const { shareToken } = await response.json();
        // Buscar os dados do share
        const shareResponse = await fetch(`/api/share/${shareToken}`);
        if (shareResponse.ok) {
          const shareData = await shareResponse.json();
          setData(shareData);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async () => {
    if (!cardRef.current) return;

    setGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
      });

      const dataUrl = canvas.toDataURL("image/png");

      // Criar link de download
      const link = document.createElement("a");
      link.download = `vem-verao-${params.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-summer-yellow via-summer-orange to-summer-blue">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Carregando...</p>
        </div>
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
    <div className="min-h-screen bg-gradient-to-br from-summer-yellow via-summer-orange to-summer-blue p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Compartilhe seu Verão!
          </h1>
          <div className="flex gap-4 justify-center">
            <button
              onClick={generateImage}
              disabled={generating}
              className="bg-white text-summer-orange px-8 py-4 rounded-full font-bold hover:bg-summer-light transition-all shadow-lg disabled:opacity-50"
            >
              {generating ? "Gerando..." : "📥 Baixar Imagem"}
            </button>
            <button
              onClick={() => router.push(`/results/${params.id}`)}
              className="bg-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/30 transition-all"
            >
              ← Voltar
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div ref={cardRef} className="scale-50 origin-top">
            <ShareableCard
              responses={data.responses}
              result={data.result}
              reportName={data.reportName}
            />
          </div>
        </div>

        <div className="mt-8 text-center text-white/80">
          <p className="mb-4">
            A imagem será baixada automaticamente. Compartilhe nas suas redes
            sociais!
          </p>
        </div>
      </div>
    </div>
  );
}

