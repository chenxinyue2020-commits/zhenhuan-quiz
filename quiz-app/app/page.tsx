"use client";

import Link from "next/link";
import SignIn from "@/components/Auth/SignIn";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf3df] via-[#f9ecce] to-[#f6e3c1]">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.35em] text-[#a8743a] mb-3">
            Z H E N H U A N · Q U I Z
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3d2614] mb-3">
            甄嬛传 · 台词宫闱问答
          </h1>
          <p className="text-base sm:text-lg text-[#6b4a2c] max-w-2xl mx-auto">
            借一段台词，重回华妃笑、皇后泪、甄嬛叹的深宫旧梦。
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
          {/* 左侧：登录卡片 */}
          <SignIn />

          {/* 右侧：说明卡片 */}
          <div className="bg-[#fffaf1] rounded-xl shadow-lg border border-[#e7d3a8] p-6 sm:p-7">
            <h3 className="text-xl font-semibold text-[#3d2614] mb-3">
              宫闱小考 · 玩法说明
            </h3>
            <p className="text-sm text-[#7a5a3a] mb-3">
              选出真正说出台词的角色，看看你是「甄学家」，还是需要再进宫复习几轮。
            </p>
            <ul className="space-y-2 text-sm text-[#5a3c24]">
              <li>
                · 每题给出一句《甄嬛传》经典台词，你需要在三位候选主子中，选出真正说出这句话的人。
              </li>
              <li>
                · 做完后点击「提交答案」，即可查看本次宫闱小考得分，以及每题的对错与正确主子。
              </li>
              <li>· 答题进度会自动保存，可以随时暂停，稍后再回宫继续应考。</li>
              <li>· 完成测试后，你的正确率将会出现在宫中排行榜上。</li>
            </ul>
            <div className="mt-5 pt-4 border-t border-[#ead8b4] text-xs text-[#a0743d]">
              <p>
                小提示：建议佩戴耳机，边听配乐边做题，更易入戏。
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#f5e1b8] text-[#7a4d20]">
                # 甄嬛
              </span>
              <span className="px-3 py-1 rounded-full bg-[#f5e1b8] text-[#7a4d20]">
                # 皇后宜修
              </span>
              <span className="px-3 py-1 rounded-full bg-[#f5e1b8] text-[#7a4d20]">
                # 华妃年氏
              </span>
              <span className="px-3 py-1 rounded-full bg-[#f5e1b8] text-[#7a4d20]">
                # 安陵容
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-[#8b6a3e]">
          <p>
            登录后点击{" "}
            <Link href="/quiz" className="text-[#c04843] underline underline-offset-4">
              开始宫闱小考
            </Link>
            ，或直接前往{" "}
            <Link
              href="/leaderboard"
              className="text-[#c04843] underline underline-offset-4"
            >
              宫中排行榜
            </Link>
            。
          </p>
        </div>
      </div>
    </div>
  );
}
