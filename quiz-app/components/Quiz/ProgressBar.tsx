"use client";

interface ProgressBarProps {
  currentPage: number;
  totalPages: number;
  cumulativeScore: number;
  totalQuestionsAnswered: number;
}

export default function ProgressBar({
  currentPage,
  totalPages,
  cumulativeScore,
  totalQuestionsAnswered,
}: ProgressBarProps) {
  const progress = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          页面 {currentPage + 1} / {totalPages}
        </div>
        <div className="text-sm text-gray-600">
          累计得分: {cumulativeScore} / {totalQuestionsAnswered}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
