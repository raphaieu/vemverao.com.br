"use client";

import { Question } from "@/types/quiz";
import { useState } from "react";

interface FileQuestionProps {
  question: Question;
  value?: any;
  onChange: (value: string[]) => void;
}

export default function FileQuestion({
  question,
  value,
  onChange,
}: FileQuestionProps) {
  const [previews, setPreviews] = useState<string[]>(
    Array.isArray(value) ? value : []
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews: string[] = [];
    const fileArray = Array.from(files).slice(0, 5 - previews.length);

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === fileArray.length) {
          const allPreviews = [...previews, ...newPreviews].slice(0, 5);
          setPreviews(allPreviews);
          onChange(allPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onChange(newPreviews);
  };

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold text-gray-800">
        {question.label}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {previews.length < 5 && (
        <label className="block">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-summer-orange transition-all">
            <p className="text-gray-600 mb-2">
              Clique para selecionar fotos
            </p>
            <p className="text-sm text-gray-500">
              {previews.length}/5 fotos selecionadas
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}

