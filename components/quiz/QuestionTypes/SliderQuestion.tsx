"use client";

import { Question } from "@/types/quiz";

interface SliderQuestionProps {
  question: Question;
  value?: any;
  onChange: (value: number) => void;
}

export default function SliderQuestion({
  question,
  value,
  onChange,
}: SliderQuestionProps) {
  const numValue = value !== undefined ? Number(value) : (question.min || 0);

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold text-gray-800">
        {question.label}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="px-4">
        <input
          type="range"
          min={question.min || 0}
          max={question.max || 10}
          step={question.step || 1}
          value={numValue}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-summer-orange"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{question.min || 0}</span>
          <span className="text-2xl font-bold text-summer-orange">{numValue}</span>
          <span>{question.max || 10}</span>
        </div>
      </div>
    </div>
  );
}

