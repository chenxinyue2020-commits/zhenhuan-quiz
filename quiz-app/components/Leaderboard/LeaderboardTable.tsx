"use client";

import { db } from "@/lib/db";

export default function LeaderboardTable() {
  const { data, isLoading } = db.useQuery({
    userStats: {
      $: {
        where: {},
      },
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">加载中...</p>
      </div>
    );
  }

  const stats = data?.userStats || [];

  // Only show players who have completed at least one test
  const eligibleStats = stats.filter((s) => s.totalTestsCompleted > 0);

  // Sort by overallCorrectnessRatio descending
  const sortedStats = [...eligibleStats].sort(
    (a, b) => b.overallCorrectnessRatio - a.overallCorrectnessRatio
  );

  // Get top 50
  const topStats = sortedStats.slice(0, 50);

  if (topStats.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">暂无排行榜数据</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              排名
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              昵称
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              正确率
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              完成测试数
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              最佳得分
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {topStats.map((stat, index) => {
            const label = stat.displayName || `玩家 ${index + 1}`;
            const correctnessPercent = Math.round(
              stat.overallCorrectnessRatio * 100
            );

            return (
              <tr
                key={stat.id}
                className={index < 3 ? "bg-yellow-50" : ""}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {label}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="font-semibold">{correctnessPercent}%</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${correctnessPercent}%` }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {stat.totalTestsCompleted}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {stat.bestScore}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
