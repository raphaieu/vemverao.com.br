"use client";

import { Question } from "@/types/quiz";

interface CheckboxQuestionProps {
  question: Question;
  value?: any;
  onChange: (value: string[]) => void;
}

export default function CheckboxQuestion({
  question,
  value,
  onChange,
}: CheckboxQuestionProps) {
  const selectedValues = Array.isArray(value) ? value : [];

  const handleChange = (optionValue: string) => {
    if (selectedValues.includes(optionValue)) {
      onChange(selectedValues.filter((v) => v !== optionValue));
    } else {
      // Limit to 5 selections if specified
      if (question.label?.includes("até 5") && selectedValues.length >= 5) {
        return;
      }
      onChange([...selectedValues, optionValue]);
    }
  };

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
              selectedValues.includes(option.value)
                ? "border-summer-orange bg-summer-light"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="mr-3 w-5 h-5 text-summer-orange focus:ring-summer-orange rounded"
            />
            <span className="text-gray-700 font-medium">{option.label}</span>
          </label>
        ))}
      </div>
      {question.label?.includes("até 5") && (
        <p className="text-sm text-gray-500">
          {selectedValues.length}/5 selecionados
        </p>
      )}
    </div>
  );
}

