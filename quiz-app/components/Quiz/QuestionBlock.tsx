"use client";

import { useState } from "react";
import Image from "next/image";
import { Question, characterImages } from "@/lib/quiz-data";

interface QuestionBlockProps {
  question: Question;
  questionIndex: number;
  selectedOption: number | null;
  onSelect: (optionIndex: number) => void;
  showFeedback: boolean;
  isCorrect: boolean | null;
}

export default function QuestionBlock({
  question,
  questionIndex,
  selectedOption,
  onSelect,
  showFeedback,
  isCorrect,
}: QuestionBlockProps) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
      <div className="mb-4">
        <strong className="text-lg text-gray-800">第 {questionIndex + 1} 题：</strong>
        <span className="text-gray-700 ml-2">{question.text}</span>
      </div>
      <div className="space-y-2 mb-4">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const imgSrc = characterImages[option];
          return (
            <label
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer border-2 transition-colors ${
                isSelected
                  ? "bg-blue-50 border-blue-500"
                  : "bg-gray-50 border-gray-200 hover:border-gray-300"
              } ${showFeedback && isCorrect === false && isSelected ? "bg-red-50 border-red-300" : ""}`}
            >
              <input
                type="radio"
                name={`question-${questionIndex}`}
                value={index}
                checked={isSelected}
                onChange={() => onSelect(index)}
                disabled={showFeedback}
                className="w-4 h-4 text-blue-600"
              />
              {imgSrc && (
                <Image
                  src={imgSrc}
                  alt={option}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-300"
                />
              )}
              <span className="text-gray-800">
                {String.fromCharCode(65 + index)}. {option}
              </span>
            </label>
          );
        })}
      </div>
      {showFeedback && (
        <div
          className={`mt-2 text-sm font-medium ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {isCorrect ? "回答正确 ✔" : `回答错误 ✘，正确答案是 ${String.fromCharCode(65 + question.answerIndex)}. ${question.options[question.answerIndex]}`}
        </div>
      )}
      <div className="mt-3 flex items-center space-x-2">
        <button
          type="button"
          onClick={() => setShowHint(!showHint)}
          className="text-xs px-3 py-1 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
        >
          小小提示
        </button>
        {showHint && (
          <span className="text-xs text-gray-600">{question.hint}</span>
        )}
      </div>
    </div>
  );
}
