"use client";

import { Question } from "@/types/quiz";
import { useState } from "react";

interface TextQuestionProps {
  question: Question;
  value?: any;
  onChange: (value: string | string[]) => void;
}

export default function TextQuestion({
  question,
  value,
  onChange,
}: TextQuestionProps) {
  const isMultiple = question.multiple;
  const values = isMultiple
    ? (Array.isArray(value) ? value : value ? [value] : [""])
    : undefined;
  const singleValue = !isMultiple ? (value || "") : undefined;

  const handleSingleChange = (newValue: string) => {
    onChange(newValue);
  };

  const handleMultipleChange = (index: number, newValue: string) => {
    if (!values) return;
    const newValues = [...values];
    newValues[index] = newValue;
    onChange(newValues);
  };

  const addField = () => {
    if (!values) return;
    if (values.length < 3) {
      onChange([...values, ""]);
    }
  };

  if (isMultiple) {
    return (
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-800">
          {question.label}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {(values || [""]).map((val, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={val}
              onChange={(e) => handleMultipleChange(index, e.target.value)}
              placeholder={`${question.label} ${index + 1}`}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-summer-orange"
            />
          </div>
        ))}
        {values && values.length < 3 && (
          <button
            type="button"
            onClick={addField}
            className="text-summer-orange hover:underline text-sm"
          >
            + Adicionar mais
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="block text-lg font-semibold text-gray-800">
        {question.label}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        value={singleValue}
        onChange={(e) => handleSingleChange(e.target.value)}
        placeholder={question.label}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-summer-orange"
      />
    </div>
  );
}

