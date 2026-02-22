"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              甄嬛传 · 台词宫闱问答
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link
                href="/quiz"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                宫闱小考
              </Link>
              <Link
                href="/leaderboard"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                宫中排行榜
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                我的战绩
              </Link>
            </nav>
          </div>
          {/* 顶部右侧暂时不再显示单独的“登录”入口，避免已登录时重复出现 */}
        </div>
      </div>
    </header>
  );
}
