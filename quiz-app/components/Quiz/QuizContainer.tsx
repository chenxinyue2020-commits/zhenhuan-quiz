"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { id } from "@instantdb/react";
import { db } from "@/lib/db";
import { questions as allQuestions, PAGE_SIZE, TOTAL_PAGES } from "@/lib/quiz-data";
import QuestionBlock from "./QuestionBlock";
import ProgressBar from "./ProgressBar";
import { Answer, CharacterStats, calculateCharacterStats } from "@/lib/utils";

interface QuizContainerProps {
  sessionId?: string;
}

export default function QuizContainer({ sessionId }: QuizContainerProps) {
  const user = db.useUser();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());
  const [cumulativeScore, setCumulativeScore] = useState(0);
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);
  const [hasGradedCurrent, setHasGradedCurrent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  // 每次测试选出的题目顺序（存的是题库中的索引）
  const [questionOrder, setQuestionOrder] = useState<number[] | null>(null);
  const router = useRouter();

  // Query for existing session
  const { data } = db.useQuery({
    testSessions: {
      $: {
        where: sessionId
          ? { id: sessionId, userId: user?.id }
          : { userId: user?.id, status: "in_progress" },
      },
    },
  });

  // Query for existing user stats (used when completing the test)
  const { data: statsData } = db.useQuery({
    userStats: {
      $: {
        where: { userId: user?.id ?? "__none__" },
      },
    },
  });

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const loadSession = async () => {
      setIsLoading(true);
      try {
        const session = sessionId
          ? data?.testSessions?.find((s: any) => s.id === sessionId)
          : data?.testSessions?.[0];

        if (session && session.status === "in_progress") {
          setCurrentPage(session.currentPage);
          setCumulativeScore(session.cumulativeScore);
          setTotalQuestionsAnswered(session.totalQuestionsAnswered);
          setCurrentSessionId(session.id);

          // 恢复题目顺序；如果老数据没有，就按顺序取前 30 道
          const existingOrder: number[] =
            (session.questionOrder as number[] | undefined) ||
            Array.from(
              { length: Math.min(30, allQuestions.length) },
              (_, i) => i
            );
          setQuestionOrder(existingOrder);

          // Restore answers
          const restoredAnswers = new Map<number, number>();
          if (session.answers && Array.isArray(session.answers)) {
            session.answers.forEach((answer: Answer) => {
              restoredAnswers.set(answer.questionIndex, answer.selectedOption);
            });
          }
          setAnswers(restoredAnswers);
        } else {
          // Create new session
          await createNewSession();
        }
      } catch (error) {
        console.error("Error loading session:", error);
        await createNewSession();
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, [user, sessionId]);

  const createNewSession = async () => {
    if (!user) return;

    const now = Date.now();
    const totalPool = allQuestions.length;
    const testLength = Math.min(30, totalPool);
    const indices = Array.from({ length: totalPool }, (_, i) => i);
    // 简单洗牌
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const selectedOrder = indices.slice(0, testLength);
    setQuestionOrder(selectedOrder);

    const newSession = {
      userId: user.id,
      status: "in_progress" as const,
      currentPage: 0,
      cumulativeScore: 0,
      totalQuestionsAnswered: 0,
      answers: [],
      characterStats: {},
      questionOrder: selectedOrder,
      startedAt: now,
      lastUpdatedAt: now,
    };

    const result = await db.transact([
      db.tx.testSessions[id()].update(newSession),
    ]);

    if (result?.testSessions?.[0]?.id) {
      setCurrentSessionId(result.testSessions[0].id);
    }
  };

  const saveProgress = async (newAnswers: Map<number, number>) => {
    if (!user || !currentSessionId) return;
    const order = questionOrder ||
      Array.from({ length: Math.min(30, allQuestions.length) }, (_, i) => i);

    const answersArray: Answer[] = [];
    let score = 0;
    let answered = 0;

    newAnswers.forEach((selectedOption, questionIndex) => {
      const poolIndex = order[questionIndex];
      const question = allQuestions[poolIndex];
      if (!question) return;

      const isCorrect = selectedOption === question.answerIndex;
      if (isCorrect) score++;

      answersArray.push({
        questionIndex,
        questionPoolIndex: poolIndex,
        selectedOption,
        isCorrect,
        timestamp: new Date(),
      });
      answered++;
    });

    const characterStats = calculateCharacterStats(answersArray, allQuestions);
    const now = Date.now();

    await db.transact([
      db.tx.testSessions[currentSessionId].update({
        currentPage,
        cumulativeScore: score,
        totalQuestionsAnswered: answered,
        answers: answersArray,
        characterStats,
        lastUpdatedAt: now,
      }),
    ]);
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (hasGradedCurrent) return;

    const newAnswers = new Map(answers);
    newAnswers.set(questionIndex, optionIndex);
    setAnswers(newAnswers);

    // Auto-save progress
    saveProgress(newAnswers);
  };

  const handleSubmitPage = () => {
    const order = questionOrder ||
      Array.from({ length: Math.min(30, allQuestions.length) }, (_, i) => i);

    if (hasGradedCurrent) {
      // Move to next page or complete
      if (currentPage < TOTAL_PAGES - 1) {
        setCurrentPage(currentPage + 1);
        setHasGradedCurrent(false);
      } else {
        completeTest();
      }
    } else {
      // Grade current page
      const start = currentPage * PAGE_SIZE;
      const end = Math.min(start + PAGE_SIZE, order.length);
      let pageScore = 0;
      let pageAnswered = 0;

      for (let i = start; i < end; i++) {
        const answer = answers.get(i);
        if (answer !== undefined) {
          pageAnswered++;
          const poolIndex = order[i];
          const question = allQuestions[poolIndex];
          if (question && answer === question.answerIndex) {
            pageScore++;
          }
        }
      }

      const newCumulativeScore = cumulativeScore + pageScore;
      const newTotalAnswered = totalQuestionsAnswered + pageAnswered;

      setCumulativeScore(newCumulativeScore);
      setTotalQuestionsAnswered(newTotalAnswered);
      setHasGradedCurrent(true);

      // Update session
      if (currentSessionId) {
        const allAnswers: Answer[] = [];
        answers.forEach((selectedOption, qIndex) => {
          const poolIndex = order[qIndex];
          const question = allQuestions[poolIndex];
          if (question) {
            allAnswers.push({
              questionIndex: qIndex,
              questionPoolIndex: poolIndex,
              selectedOption,
              isCorrect: selectedOption === question.answerIndex,
              timestamp: new Date(),
            });
          }
        });

        const characterStats = calculateCharacterStats(allAnswers, allQuestions);
        const now = Date.now();

        db.transact([
          db.tx.testSessions[currentSessionId].update({
            cumulativeScore: newCumulativeScore,
            totalQuestionsAnswered: newTotalAnswered,
            answers: allAnswers,
            characterStats,
            lastUpdatedAt: now,
          }),
        ]);
      }
    }
  };

  const completeTest = () => {
    // 无论后端是否统计成功，先保证页面一定跳转到排行榜
    router.push("/leaderboard");

    // 在后台异步保存最终成绩和昵称，不阻塞跳转
    if (!currentSessionId || !user) return;

    (async () => {
      try {
        // 1. 读取本地昵称（始终以最新输入为准）
        let displayName: string | undefined;
        if (typeof window !== "undefined") {
          try {
            const stored = window.localStorage.getItem("quiz_nickname");
            if (stored) {
              displayName = stored;
            }
          } catch {
            // ignore storage errors
          }
        }

        // 2. 优先使用数据库里的 session 成绩（更可靠）
        const sessionFromDb = data?.testSessions?.find(
          (s: any) => s.id === currentSessionId
        ) as any | undefined;

        let finalScore = 0;
        let totalAnswered = 0;
        let characterStats: CharacterStats = {};

        if (sessionFromDb) {
          finalScore = sessionFromDb.cumulativeScore ?? 0;
          totalAnswered = sessionFromDb.totalQuestionsAnswered ?? 0;

          if (sessionFromDb.characterStats) {
            characterStats = sessionFromDb.characterStats as CharacterStats;
          } else if (Array.isArray(sessionFromDb.answers)) {
            characterStats = calculateCharacterStats(
              sessionFromDb.answers as Answer[],
              allQuestions
            );
          }
        } else {
          // 回退到当前内存中的 answers 计算，避免完全丢数据
          const allAnswers: Answer[] = [];
          const order = questionOrder ||
            Array.from(
              { length: Math.min(30, allQuestions.length) },
              (_, i) => i
            );
          answers.forEach((selectedOption, qIndex) => {
            const poolIndex = order[qIndex];
            const question = allQuestions[poolIndex];
            if (question) {
              allAnswers.push({
                questionIndex: qIndex,
                questionPoolIndex: poolIndex,
                selectedOption,
                isCorrect: selectedOption === question.answerIndex,
                timestamp: new Date(),
              });
            }
          });

          characterStats = calculateCharacterStats(allAnswers, allQuestions);
          finalScore = allAnswers.filter((a) => a.isCorrect).length;
          totalAnswered = allAnswers.length;
        }

        const correctnessRatio =
          totalAnswered > 0 ? finalScore / totalAnswered : 0;
        const now = Date.now();

        // 3. 仅把 session 标记为 completed，不再重算分数，避免覆盖正确成绩
        await db.transact([
          db.tx.testSessions[currentSessionId].update({
            status: "completed",
            completedAt: now,
            lastUpdatedAt: now,
          }),
        ]);

        // 4. 更新 / 创建 userStats
        const existingStats = statsData?.userStats?.[0];

        if (existingStats) {
          const newTotalTests = existingStats.totalTestsCompleted + 1;
          const newTotalQuestions =
            existingStats.totalQuestionsAnswered + totalAnswered;
          const newTotalCorrect =
            existingStats.totalCorrectAnswers + finalScore;
          const newRatio =
            newTotalQuestions > 0 ? newTotalCorrect / newTotalQuestions : 0;
          const newBestScore = Math.max(
            existingStats.bestScore,
            finalScore
          );

          const mergedCharacterAccuracy = {
            ...existingStats.characterAccuracy,
          };
          Object.keys(characterStats).forEach((char) => {
            if (!mergedCharacterAccuracy[char]) {
              mergedCharacterAccuracy[char] = { correct: 0, total: 0 };
            }
            mergedCharacterAccuracy[char].correct +=
              characterStats[char].correct;
            mergedCharacterAccuracy[char].total +=
              characterStats[char].total;
          });

          await db.transact([
            db.tx.userStats[existingStats.id].update({
              // 始终优先使用最新昵称（如果有的话）
              displayName: displayName ?? existingStats.displayName,
              totalTestsCompleted: newTotalTests,
              totalQuestionsAnswered: newTotalQuestions,
              totalCorrectAnswers: newTotalCorrect,
              overallCorrectnessRatio: newRatio,
              bestScore: newBestScore,
              lastTestDate: now,
              characterAccuracy: mergedCharacterAccuracy,
            }),
          ]);
        } else {
          await db.transact([
            db.tx.userStats[id()].update({
              userId: user.id,
              displayName,
              totalTestsCompleted: 1,
              totalQuestionsAnswered: totalAnswered,
              totalCorrectAnswers: finalScore,
              overallCorrectnessRatio: correctnessRatio,
              bestScore: finalScore,
              lastTestDate: now,
              characterAccuracy: characterStats,
            }),
          ]);
        }
      } catch (error) {
        console.error("完成测试时出错：", error);
      }
    })();
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">加载中...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">请先登录</p>
      </div>
    );
  }

  const order =
    questionOrder ||
    Array.from({ length: Math.min(30, allQuestions.length) }, (_, i) => i);
  const start = currentPage * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, order.length);
  const currentQuestions = order.slice(start, end).map((poolIndex) => ({
    poolIndex,
    question: allQuestions[poolIndex],
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProgressBar
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        cumulativeScore={cumulativeScore}
        totalQuestionsAnswered={totalQuestionsAnswered}
      />

      <div id="quiz" className="mb-6">
        {currentQuestions.map(({ question, poolIndex }, index) => {
          const globalIndex = start + index;
          const selectedOption = answers.get(globalIndex) ?? null;
          const isCorrect =
            selectedOption !== null
              ? selectedOption === question.answerIndex
              : null;

          return (
            <QuestionBlock
              key={globalIndex}
              question={question}
              questionIndex={globalIndex}
              selectedOption={selectedOption}
              onSelect={(optionIndex) =>
                handleAnswerSelect(globalIndex, optionIndex)
              }
              showFeedback={hasGradedCurrent}
              isCorrect={hasGradedCurrent ? isCorrect : null}
            />
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmitPage}
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-medium text-lg"
        >
          {hasGradedCurrent
            ? currentPage < TOTAL_PAGES - 1
              ? "进入下一轮"
              : "完成测试"
            : "提交本轮答案"}
        </button>
      </div>

      {hasGradedCurrent && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700">
            本轮得分：{cumulativeScore} / {totalQuestionsAnswered}
          </p>
          {currentPage === TOTAL_PAGES - 1 && (
            <p className="text-gray-700 mt-2">
              测试完成！总得分：{cumulativeScore} / {totalQuestionsAnswered}
            </p>
          )}
        </div>
      )}

      {/* 完成测试后会直接跳转到排行榜，因此这里不再显示额外提示 */}
    </div>
  );
}
