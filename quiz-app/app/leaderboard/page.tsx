"use client";

import LeaderboardTable from "@/components/Leaderboard/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">排行榜</h1>
        <p className="text-gray-700">
          查看所有用户的正确率排名。排行榜实时更新。
        </p>
      </div>
      <LeaderboardTable />
    </div>
  );
}
