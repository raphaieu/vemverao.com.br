"use client";

import { Question } from "@/types/quiz";

interface DateQuestionProps {
  question: Question;
  value?: any;
  onChange: (value: string[]) => void;
}

export default function DateQuestion({
  question,
  value,
  onChange,
}: DateQuestionProps) {
  const dates = Array.isArray(value) ? value : [];

  const handleDateChange = (index: number, dateValue: string) => {
    const newDates = [...dates];
    newDates[index] = dateValue;
    // Keep only 3 dates
    const filteredDates = newDates.filter((d) => d).slice(0, 3);
    onChange(filteredDates);
  };

  const addDateField = () => {
    if (dates.length < 3) {
      onChange([...dates, ""]);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold text-gray-800">
        {question.label}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {[0, 1, 2].map((index) => (
        <input
          key={index}
          type="date"
          value={dates[index] || ""}
          onChange={(e) => handleDateChange(index, e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-summer-orange"
        />
      ))}
      <p className="text-sm text-gray-500">
        Preencha até 3 datas dos seus melhores dias
      </p>
    </div>
  );
}

