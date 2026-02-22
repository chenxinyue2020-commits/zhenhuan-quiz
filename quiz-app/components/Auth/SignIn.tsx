"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  // 从本地恢复“记住我”的邮箱
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedRemember = window.localStorage.getItem("quiz_remember_me");
      const storedEmail = window.localStorage.getItem("quiz_email");
      const storedNickname = window.localStorage.getItem("quiz_nickname");
      if (storedRemember === "true") {
        setRememberMe(true);
        if (storedEmail) setEmail(storedEmail);
        if (storedNickname) setNickname(storedNickname);
      } else if (storedNickname) {
        // 没有记住邮箱时，也可以恢复上一次使用的昵称
        setNickname(storedNickname);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      if (step === "email") {
        // Step 1: send magic code email，并保存邮箱 / 昵称到本地
        if (rememberMe && typeof window !== "undefined") {
          try {
            window.localStorage.setItem("quiz_remember_me", "true");
            window.localStorage.setItem("quiz_email", email);
            window.localStorage.setItem("quiz_nickname", nickname.trim());
          } catch {
            // ignore storage errors
          }
        } else if (typeof window !== "undefined") {
          // 即使没勾选“记住我”，也记住昵称，方便下次进入页面时显示
          try {
            window.localStorage.setItem("quiz_nickname", nickname.trim());
          } catch {
            // ignore storage errors
          }
        }
        await db.auth.sendMagicCode({ email });
        setStep("code");
        setMessage("已发送魔法暗语，请查收邮箱。");
      } else if (step === "code") {
        // Step 2: verify code and sign in
        const trimmed = nickname.trim();
        if (!trimmed) {
          setMessage("请先输入一个昵称。");
          setIsLoading(false);
          return;
        }
        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem("quiz_nickname", trimmed);
          } catch {
            // ignore storage errors
          }
        }
        await db.auth.signInWithMagicCode({ email, code });
        setMessage("登录成功，正在为您打开宫闱试题…");
        router.push("/quiz");
      }
    } catch (error: any) {
      setMessage(error.message || "发生了一点小意外，请稍后再试。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-8 palace-card rounded-2xl border border-[#d7b980] bg-[radial-gradient(circle_at_top,_#fffef8,_#f9edd6)] relative overflow-hidden">
      {/* 顶部宫阙剪影 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[url('/images/palace-roof.svg')] bg-top bg-repeat-x opacity-70" />

      <div className="relative flex flex-col md:flex-row gap-8">
        {/* 左侧宫廷插画区域 */}
        <div className="hidden md:flex md:w-5/12 flex-col justify-center items-center border-r border-[#e4cfa3]/70 pr-6">
          <div className="w-full h-40 rounded-xl bg-[linear-gradient(to_bottom,#f7e3b8,#f3d39c)] border border-[#d6b16b] shadow-inner flex items-end justify-center overflow-hidden">
            {/* 宫殿楼宇与台阶，用纯色块组合出剪影感 */}
            <div className="w-10/12 h-28 bg-[#c38b47] rounded-t-lg shadow-md relative flex items-end justify-center">
              <div className="absolute -top-4 w-9/12 h-4 bg-[#8b4a2d] rounded-t-full shadow" />
              <div className="absolute bottom-0 w-full h-7 bg-[#e8c48a] flex flex-col justify-between px-3 py-1">
                <div className="flex justify-between text-[9px] text-[#7a4c25] tracking-[0.2em]">
                  <span>金瓦</span>
                  <span>朱栏</span>
                  <span>飞檐</span>
                </div>
                <div className="h-[2px] bg-gradient-to-r from-[#c89b4b] via-[#f6e0a8] to-[#c89b4b]" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-[#7a5a3a] text-center leading-relaxed">
            远处金瓦红墙，近处青砖石阶，先在宫门处留名，再入殿中应试。
          </p>
        </div>

        {/* 右侧表单区域 */}
        <div className="md:w-7/12">
          <h2 className="text-2xl font-bold mb-2 text-[#3d2a1a] text-center md:text-left">
            宫门信使 · 登录
          </h2>
          <p className="text-sm text-[#7a5a3a] mb-6 text-center md:text-left">
            输入邮箱接收宫中暗语，再输入暗语完成入宫签到。
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#5a3c24]"
          >
            邮箱 Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={step !== "email"}
            className="w-full px-3 py-2 border border-[#e0c9a6] rounded-md shadow-sm bg-[#fffdf7]
                       focus:outline-none focus:ring-2 focus:ring-[#c48c43] focus:border-[#c48c43]
                       disabled:bg-gray-100 disabled:text-gray-500"
            placeholder="your@email.com"
          />
        </div>

        {step === "email" && (
          <div className="flex items-center justify-between text-xs text-[#7a5a3a]">
            <label className="inline-flex items-center space-x-1">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3 w-3 text-[#c48c43] border-[#e0c9a6] rounded"
              />
              <span>记住我（下次自动填入邮箱）</span>
            </label>
          </div>
        )}

        {/* 昵称输入框与邮箱一起出现 */}
        <div className="space-y-2">
          <label
            htmlFor="nickname"
            className="block text-sm font-medium text-[#5a3c24]"
          >
            宫中绰号（昵称）
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={20}
            className="w-full px-3 py-2 border border-[#e0c9a6] rounded-md shadow-sm bg-[#fffdf7]
                       focus:outline-none focus:ring-2 focus:ring-[#c48c43] focus:border-[#c48c43]"
            placeholder="例如：菀若清风、莞莞如玉"
          />
          <p className="text-xs text-[#7a5a3a]">
            昵称将显示在宫中排行榜中，可以在这里随时修改。
          </p>
        </div>

        {step === "code" && (
          <div className="space-y-2">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-[#5a3c24]"
            >
              魔法暗语 Magic Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full px-3 py-2 border border-[#e0c9a6] rounded-md shadow-sm bg-[#fffdf7]
                         focus:outline-none focus:ring-2 focus:ring-[#c48c43] focus:border-[#c48c43]"
              placeholder="输入邮件中收到的数字或短句"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={
            isLoading ||
            (step === "code" && (!code || !nickname.trim()))
          }
          className="w-full bg-[#c04843] text-white py-2.5 px-4 rounded-md font-medium
                     hover:bg-[#a63b36] disabled:opacity-60 disabled:cursor-not-allowed
                     transition-colors"
        >
          {isLoading
            ? "请稍候…"
            : step === "email"
            ? "发送魔法暗语"
            : step === "code"
            ? "验证并登录并开始答题"
            : "已登录"}
        </button>

        {message && (
          <p
            className={`text-sm text-center ${
              message.includes("成功") || message.includes("已保存")
                ? "text-green-700"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
          </form>
        </div>
      </div>
    </div>
  );
}
