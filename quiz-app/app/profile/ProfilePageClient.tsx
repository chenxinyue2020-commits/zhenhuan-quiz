"use client";

import { db } from "@/lib/db";
import Link from "next/link";

export default function ProfilePageClient() {
  const user = db.useUser();

  const { data, isLoading } = db.useQuery({
    testSessions: {
      $: {
        where: {
          userId: user?.id,
        },
      },
    },
    userStats: {
      $: {
        where: {
          userId: user?.id,
        },
      },
    },
  });

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-4">请先登录</p>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 underline"
        >
          返回登录页面
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">加载中...</p>
      </div>
    );
  }

  const stats = data?.userStats?.[0];
  const sessions = data?.testSessions || [];
  const inProgressSessions = sessions.filter(
    (s: any) => s.status === "in_progress"
  );
  const completedSessions = sessions.filter(
    (s: any) => s.status === "completed"
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">个人资料</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">用户信息</h2>
        <p className="text-gray-700">
          <strong>邮箱:</strong> {user.email}
        </p>
      </div>

      {stats && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">统计数据</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">完成测试数</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalTestsCompleted}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">总正确率</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(stats.overallCorrectnessRatio * 100)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">总答题数</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalQuestionsAnswered}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">最佳得分</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.bestScore}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">测试会话</h2>
        {inProgressSessions.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              进行中的测试 ({inProgressSessions.length})
            </h3>
            {inProgressSessions.map((session: any) => (
              <div
                key={session.id}
                className="p-4 bg-blue-50 rounded-md mb-2 border border-blue-200"
              >
                <p className="text-sm text-gray-700">
                  进度: 页面 {session.currentPage + 1} / {Math.ceil(30 / 10)}
                </p>
                <p className="text-sm text-gray-700">
                  最近保存时间:{" "}
                  {new Date(
                    session.lastUpdatedAt ?? session.startedAt
                  ).toLocaleString("zh-CN")}
                </p>
                <p className="text-sm text-gray-700">
                  得分: {session.cumulativeScore} / {session.totalQuestionsAnswered}
                </p>
                <Link
                  href={`/quiz?session=${session.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm underline mt-2 inline-block"
                >
                  继续测试
                </Link>
              </div>
            ))}
          </div>
        )}
        {completedSessions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              已完成的测试 ({completedSessions.length})
            </h3>
            <div className="space-y-2">
              {completedSessions.slice(0, 5).map((session: any) => (
                <div
                  key={session.id}
                  className="p-4 bg-gray-50 rounded-md border border-gray-200"
                >
                  <p className="text-sm text-gray-700">
                    完成时间:{" "}
                    {new Date(session.completedAt).toLocaleString("zh-CN")}
                  </p>
                  <p className="text-sm text-gray-700">
                    最终得分: {session.cumulativeScore} / {session.totalQuestionsAnswered}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {sessions.length === 0 && (
          <p className="text-gray-600">还没有测试记录</p>
        )}
      </div>

      <div className="text-center">
        <Link
          href="/quiz"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 inline-block"
        >
          开始新测试
        </Link>
      </div>
    </div>
  );
}
