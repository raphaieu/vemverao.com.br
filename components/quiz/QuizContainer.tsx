"use client";

import { useState } from "react";
import { quizBlocks } from "@/lib/quiz/quizData";
import { QuestionBlock } from "@/types/quiz";
import QuestionBlockComponent from "./QuestionBlock";
import { QuizResponse } from "@/types/quiz";

interface QuizContainerProps {
  onSubmit: (responses: QuizResponse) => void;
}

export default function QuizContainer({ onSubmit }: QuizContainerProps) {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [responses, setResponses] = useState<Partial<QuizResponse>>({});

  const currentBlock = quizBlocks[currentBlockIndex];
  const isLastBlock = currentBlockIndex === quizBlocks.length - 1;
  const progress = ((currentBlockIndex + 1) / quizBlocks.length) * 100;

  const handleNext = () => {
    if (isLastBlock) {
      onSubmit(responses as QuizResponse);
    } else {
      setCurrentBlockIndex(currentBlockIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(currentBlockIndex - 1);
    }
  };

  const handleAnswer = (questionId: string, value: any) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-summer-yellow via-summer-orange to-summer-blue p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Bloco {currentBlockIndex + 1} de {quizBlocks.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Block */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <QuestionBlockComponent
            block={currentBlock}
            responses={responses}
            onAnswer={handleAnswer}
          />

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentBlockIndex === 0}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-all"
            >
              ← Voltar
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-summer-orange text-white rounded-lg font-semibold hover:bg-orange-600 transition-all shadow-lg"
            >
              {isLastBlock ? "Finalizar" : "Próximo →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

