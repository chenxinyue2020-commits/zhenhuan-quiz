// Missing Letters Game - Browser Version
// --------------------------------------
// A playful alphabet-filling game for kids.

const WORD_BANK = [
  // Easy
  "apple",
  "table",
  "chair",
  "pencil",
  "school",
  "garden",
  "winter",
  "summer",
  "friend",
  "smile",
  "music",
  "happy",
  "bright",
  "planet",
  "ocean",
  "forest",
  "yellow",
  "purple",
  "orange",
  "silver",
  // Medium / harder
  "mountain",
  "computer",
  "language",
  "keyboard",
  "building",
  "airplane",
  "sandwich",
  "chocolate",
  "umbrella",
  "backpack",
  "notebook",
  "sunshine",
  "triangle",
  "favorite",
  "medicine",
  "elephant",
  "dinosaur",
  "hospital",
  "calendar",
  "adventure",
  "wonderful",
  "astronomy",
  "restaurant",
  "imagination",
];

const state = {
  answer: "",
  masked: "",
  missingPositions: [],
  difficulty: "medium",
  triesLeft: 0,
  round: 0,
  score: 0,
};

const difficultyTries = {
  easy: 7,
  medium: 6,
  hard: 5,
};

function normalizeWord(word) {
  return (word || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

function randomChoice(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function missingCountForLength(length, difficulty) {
  let frac;
  if (difficulty === "easy") frac = 0.35;
  else if (difficulty === "hard") frac = 0.65;
  else frac = 0.5;

  let missing = Math.round(length * frac);
  missing = Math.max(1, missing);
  missing = Math.min(length - 1, missing);
  return missing;
}

function makePuzzle(answer, difficulty) {
  const clean = normalizeWord(answer);
  if (clean.length < 4) {
    throw new Error("Word too short");
  }
  const len = clean.length;
  const missingCount = missingCountForLength(len, difficulty);

  const positions = Array.from({ length: len }, (_, i) => i);
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  const missingPositions = positions.slice(0, missingCount).sort((a, b) => a - b);
  const chars = clean.split("");
  for (const pos of missingPositions) {
    chars[pos] = "_";
  }

  return {
    answer: clean,
    masked: chars.join(""),
    missingPositions,
  };
}

function renderMasked(masked, missingPositions, answer) {
  const container = document.getElementById("masked-word");
  container.innerHTML = "";

  if (!masked || !masked.length) {
    container.textContent = "Press “Start new word” to play!";
    return;
  }

  for (let i = 0; i < masked.length; i++) {
    const span = document.createElement("span");
    const ch = masked[i];
    const isMissing = missingPositions.includes(i);
    const answerChar = answer[i];

    if (ch === "_") {
      span.textContent = "_";
      span.classList.add("blank");
    } else {
      span.textContent = ch.toUpperCase();
      if (isMissing) {
        span.classList.add("filled");
      }
    }

    // Little bounce animation when a letter is filled correctly
    if (!isMissing && ch === answerChar && ch !== "_") {
      span.style.animation = "pop-in 0.25s ease-out";
    }

    container.appendChild(span);
  }
}

function setMessage(text, type = "info") {
  const el = document.getElementById("message");
  el.textContent = text;
  el.className = "message";
  if (type === "success") el.classList.add("message--success");
  else if (type === "error") el.classList.add("message--error");
  else el.classList.add("message--info");
}

function updateStatusBar() {
  document.getElementById("round-label").textContent =
    state.round > 0 ? state.round : "–";
  document.getElementById("tries-label").textContent =
    state.triesLeft > 0 ? state.triesLeft : "–";
  document.getElementById("score-label").textContent = state.score;
}

function setControlsEnabled(enabled) {
  document.getElementById("guess-input").disabled = !enabled;
  document.getElementById("guess-btn").disabled = !enabled;
  document.getElementById("hint-btn").disabled = !enabled;
}

function startNewRound() {
  const difficultySelect = document.getElementById("difficulty");
  state.difficulty = difficultySelect.value || "medium";
  state.round += 1;
  state.triesLeft = difficultyTries[state.difficulty] || 5;
  document.getElementById("hint-text").textContent = "";

  let word = randomChoice(WORD_BANK);
  if (state.difficulty === "easy") {
    const easyWords = WORD_BANK.filter((w) => normalizeWord(w).length <= 7);
    if (easyWords.length) {
      word = randomChoice(easyWords);
    }
  }

  const puzzle = makePuzzle(word, state.difficulty);
  state.answer = puzzle.answer;
  state.masked = puzzle.masked;
  state.missingPositions = puzzle.missingPositions;

  renderMasked(state.masked, state.missingPositions, state.answer);
  updateStatusBar();
  setMessage("Type the missing letters in order, or guess the full word.", "info");
  setControlsEnabled(true);

  const input = document.getElementById("guess-input");
  input.value = "";
  input.focus();
}

function applyFill(fill) {
  fill = normalizeWord(fill);
  if (fill.length !== state.missingPositions.length) {
    throw new Error("Fill length mismatch");
  }
  const chars = state.masked.split("");
  state.missingPositions.forEach((pos, idx) => {
    chars[pos] = fill[idx];
  });
  return chars.join("");
}

function handleGuess(event) {
  event.preventDefault();
  if (!state.answer) return;

  let guess = document.getElementById("guess-input").value;
  guess = normalizeWord(guess);
  if (!guess) {
    setMessage("Please type some letters first.", "error");
    return;
  }

  const slots = state.missingPositions.length;

  if (guess.length === state.answer.length && state.masked.includes("_")) {
    if (guess === state.answer) {
      return finishRound(true);
    }
    wrongGuess();
    return;
  }

  if (guess.length !== slots) {
    setMessage(
      `Please enter exactly ${slots} missing letters, or try the full word.`,
      "error"
    );
    return;
  }

  try {
    const filled = applyFill(guess);
    if (filled === state.answer) {
      state.masked = filled;
      renderMasked(state.masked, state.missingPositions, state.answer);
      return finishRound(true);
    }
    wrongGuess();
  } catch (err) {
    setMessage(err.message, "error");
  }
}

function wrongGuess() {
  state.triesLeft -= 1;
  updateStatusBar();

  if (state.triesLeft <= 0) {
    finishRound(false);
  } else {
    setMessage("Not quite. Try again!", "error");
  }
}

function finishRound(won) {
  setControlsEnabled(false);
  const base = 10;
  if (won) {
    const points = base + state.triesLeft;
    state.score += points;
    updateStatusBar();
    setMessage(
      `Great job! The word was "${state.answer.toUpperCase()}". +${points} points!`,
      "success"
    );
    renderMasked(state.answer, [], state.answer);
  } else {
    setMessage(
      `Out of tries. The word was "${state.answer.toUpperCase()}".`,
      "error"
    );
    renderMasked(state.answer, [], state.answer);
  }
}

function giveHint() {
  if (!state.answer || !state.masked.includes("_")) return;
  if (state.triesLeft <= 1) {
    setMessage("You need at least 2 tries left for a hint.", "error");
    return;
  }

  const hiddenIndices = state.missingPositions.filter(
    (pos) => state.masked[pos] === "_"
  );
  if (!hiddenIndices.length) {
    setMessage("No more hidden letters to reveal.", "info");
    return;
  }

  const pos = randomChoice(hiddenIndices);
  const correctLetter = state.answer[pos];

  const chars = state.masked.split("");
  chars[pos] = correctLetter;
  state.masked = chars.join("");
  state.triesLeft -= 1;

  document.getElementById(
    "hint-text"
  ).textContent = `Hint: letter #${pos + 1} is "${correctLetter.toUpperCase()}".`;
  updateStatusBar();
  renderMasked(state.masked, state.missingPositions, state.answer);
  setMessage("A hint has been used. You lost 1 try.", "info");
}

function attachEvents() {
  document
    .getElementById("start-btn")
    .addEventListener("click", startNewRound);
  document
    .getElementById("guess-form")
    .addEventListener("submit", handleGuess);
  document
    .getElementById("hint-btn")
    .addEventListener("click", giveHint);

  document.getElementById("guess-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      // Form submit already handles this
      return;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  attachEvents();
  setControlsEnabled(false);
  setMessage("Choose a difficulty and press “Start new word” to begin.", "info");
  updateStatusBar();
});

