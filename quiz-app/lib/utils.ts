export interface Answer {
  // 测试中的题目序号（0 ~ 本次测试题数-1）
  questionIndex: number;
  // 在完整题库中的索引，用于还原真正的台词/角色
  questionPoolIndex?: number;
  selectedOption: number;
  isCorrect: boolean;
  timestamp: Date;
}

export interface CharacterStats {
  [characterName: string]: {
    correct: number;
    total: number;
  };
}

export function calculateCharacterStats(
  answers: Answer[],
  questions: any[]
): CharacterStats {
  const stats: CharacterStats = {};

  answers.forEach((answer) => {
    const poolIndex =
      typeof answer.questionPoolIndex === "number"
        ? answer.questionPoolIndex
        : answer.questionIndex;
    const question = questions[poolIndex];
    if (!question) return;

    const character = question.answerCharacter;
    if (!character) return;

    if (!stats[character]) {
      stats[character] = { correct: 0, total: 0 };
    }

    stats[character].total += 1;
    if (answer.isCorrect) {
      stats[character].correct += 1;
    }
  });

  return stats;
}
