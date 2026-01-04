"use client";

import { Question } from "@/types/quiz";

interface RadioQuestionProps {
  question: Question;
  value?: any;
  onChange: (value: string) => void;
}

export default function RadioQuestion({
  question,
  value,
  onChange,
}: RadioQuestionProps) {
  return (
    <div className="space-y-3">
      <label className="block text-lg font-semibold text-gray-800">
        {question.label}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {question.options?.map((option) => (
          <label
            key={option.value}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
              value === option.value
                ? "border-summer-orange bg-summer-light"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="mr-3 w-5 h-5 text-summer-orange focus:ring-summer-orange"
            />
            <span className="text-gray-700 font-medium">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

