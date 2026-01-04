"use client";

import { QuestionBlock, QuizResponse } from "@/types/quiz";
import SliderQuestion from "./QuestionTypes/SliderQuestion";
import RadioQuestion from "./QuestionTypes/RadioQuestion";
import CheckboxQuestion from "./QuestionTypes/CheckboxQuestion";
import TextQuestion from "./QuestionTypes/TextQuestion";
import DateQuestion from "./QuestionTypes/DateQuestion";
import FileQuestion from "./QuestionTypes/FileQuestion";

interface QuestionBlockComponentProps {
  block: QuestionBlock;
  responses: Partial<QuizResponse>;
  onAnswer: (questionId: string, value: any) => void;
}

export default function QuestionBlockComponent({
  block,
  responses,
  onAnswer,
}: QuestionBlockComponentProps) {
  const shouldShowQuestion = (question: any) => {
    if (!question.conditional) return true;
    const { field, value } = question.conditional;
    const responseValue = responses[field as keyof QuizResponse];
    
    // Handle boolean strings from radio buttons ("true"/"false")
    if (value === true || value === false) {
      return String(responseValue) === String(value);
    }
    // Handle string values
    return String(responseValue) === String(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{block.title}</h2>
        {block.description && (
          <p className="text-gray-600">{block.description}</p>
        )}
      </div>

      <div className="space-y-8">
        {block.questions
          .filter(shouldShowQuestion)
          .map((question) => {
            const questionProps = {
              question,
              value: responses[question.id as keyof QuizResponse],
              onChange: (value: any) => onAnswer(question.id, value),
            };

            switch (question.type) {
              case "slider":
                return <SliderQuestion key={question.id} {...questionProps} />;
              case "radio":
                return <RadioQuestion key={question.id} {...questionProps} />;
              case "checkbox":
                return <CheckboxQuestion key={question.id} {...questionProps} />;
              case "text":
                return <TextQuestion key={question.id} {...questionProps} />;
              case "date":
                return <DateQuestion key={question.id} {...questionProps} />;
              case "file":
                return <FileQuestion key={question.id} {...questionProps} />;
              default:
                return null;
            }
          })}
      </div>
    </div>
  );
}

