"""
Missing Letters Word Game
-------------------------
You are shown an English word with some letters missing (underscores).
Fill in the missing letters to complete the word.

Run:
  python game.py
"""

from __future__ import annotations

import random
import sys
from dataclasses import dataclass
from typing import List, Sequence, Tuple


WORD_BANK: Sequence[str] = (
    # Short / easy
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
    # Medium
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
    "football",
    "calendar",
    # Harder
    "adventure",
    "wonderful",
    "chandelier",
    "photograph",
    "astronomy",
    "dictionary",
    "restaurant",
    "architect",
    "information",
    "environment",
    "imagination",
    "responsible",
    "development",
    "temperature",
    "electricity",
)


@dataclass(frozen=True)
class Puzzle:
    answer: str
    masked: str
    missing_positions: Tuple[int, ...]


def _normalize_word(word: str) -> str:
    return "".join(ch for ch in word.strip().lower() if ch.isalpha())


def _choose_word(rng: random.Random, words: Sequence[str]) -> str:
    cleaned = [_normalize_word(w) for w in words]
    cleaned = [w for w in cleaned if len(w) >= 4]
    if not cleaned:
        raise ValueError("No valid words available.")
    return rng.choice(cleaned)


def _missing_count_for_length(length: int, difficulty: str) -> int:
    # Ensure at least 1 missing and at least 1 visible.
    if difficulty == "easy":
        frac = 0.35
    elif difficulty == "medium":
        frac = 0.50
    else:  # hard
        frac = 0.65

    missing = int(round(length * frac))
    missing = max(1, missing)
    missing = min(length - 1, missing)
    return missing


def make_puzzle(answer: str, difficulty: str, rng: random.Random) -> Puzzle:
    answer = _normalize_word(answer)
    if len(answer) < 4:
        raise ValueError("Answer word too short.")

    missing_count = _missing_count_for_length(len(answer), difficulty)
    positions = list(range(len(answer)))
    rng.shuffle(positions)
    missing_positions = tuple(sorted(positions[:missing_count]))

    masked_chars = list(answer)
    for i in missing_positions:
        masked_chars[i] = "_"

    return Puzzle(
        answer=answer,
        masked="".join(masked_chars),
        missing_positions=missing_positions,
    )


def render_masked(masked: str) -> str:
    # Add spaces for readability: c _ m p u t e r
    return " ".join(masked)


def missing_slots(masked: str) -> int:
    return sum(1 for ch in masked if ch == "_")


def apply_fill(puzzle: Puzzle, fill: str) -> str:
    fill = _normalize_word(fill)
    if len(fill) != len(puzzle.missing_positions):
        raise ValueError("Fill length does not match number of missing letters.")

    chars = list(puzzle.masked)
    for pos, letter in zip(puzzle.missing_positions, fill):
        chars[pos] = letter
    return "".join(chars)


def prompt_choice(prompt: str, choices: Sequence[str]) -> str:
    choices_lower = [c.lower() for c in choices]
    while True:
        ans = input(prompt).strip().lower()
        if ans in choices_lower:
            return ans
        print(f"Please type one of: {', '.join(choices)}")


def prompt_int(prompt: str, min_val: int, max_val: int) -> int:
    while True:
        raw = input(prompt).strip()
        try:
            val = int(raw)
        except ValueError:
            print("Please enter a number.")
            continue
        if min_val <= val <= max_val:
            return val
        print(f"Please enter a number between {min_val} and {max_val}.")


def play_round(puzzle: Puzzle, max_tries: int) -> Tuple[bool, int]:
    """
    Returns (won, points).
    Scoring:
      - Win: points = 10 + remaining_tries
      - Loss: points = 0
    """

    tries_left = max_tries
    slots = len(puzzle.missing_positions)

    print("\n--- New word ---")
    print(f"Missing letters: {slots}")
    print(render_masked(puzzle.masked))
    print("Type:")
    print("- the missing letters in order (e.g. 'ae' to fill two blanks), or")
    print("- the full word to guess it, or")
    print("- '?' for a hint, or")
    print("- 'quit' to stop.")

    while tries_left > 0:
        raw = input(f"\nYour guess (tries left {tries_left}): ").strip().lower()
        if not raw:
            print("Please type something.")
            continue

        if raw == "quit":
            print("Quitting this round.")
            return (False, 0)

        if raw == "?":
            # Hint: reveal one missing position (still costs a try).
            missing_now = [i for i, ch in enumerate(puzzle.masked) if ch == "_"]
            if not missing_now:
                print("No missing letters left to reveal.")
                continue
            pos = random.choice(puzzle.missing_positions)
            print(f"Hint: position {pos + 1} (1-based) is '{puzzle.answer[pos]}'.")
            tries_left -= 1
            continue

        guess = _normalize_word(raw)
        if not guess:
            print("Please use letters A-Z only.")
            continue

        # Full word guess
        if len(guess) == len(puzzle.answer) and "_" in puzzle.masked:
            if guess == puzzle.answer:
                print(f"Correct! The word was: {puzzle.answer}")
                points = 10 + tries_left
                return (True, points)
            print("Nope, that's not the word.")
            tries_left -= 1
            continue

        # Missing letters guess
        if len(guess) != slots:
            print(f"Please enter exactly {slots} missing letters, or guess the full word.")
            continue

        try:
            filled = apply_fill(puzzle, guess)
        except ValueError:
            print(f"Please enter exactly {slots} letters.")
            continue

        if filled == puzzle.answer:
            print(f"Correct! {render_masked(filled)}")
            points = 10 + tries_left
            return (True, points)

        print("Not quite.")
        print(render_masked(puzzle.masked))
        tries_left -= 1

    print(f"\nOut of tries. The word was: {puzzle.answer}")
    return (False, 0)


def main() -> int:
    print("Missing Letters Word Game")
    print("=========================")

    difficulty = prompt_choice("Choose difficulty (easy/medium/hard): ", ["easy", "medium", "hard"])
    rounds = prompt_int("How many rounds? (1-20): ", 1, 20)

    max_tries = {"easy": 6, "medium": 5, "hard": 4}[difficulty]
    rng = random.Random()

    score = 0
    wins = 0
    for _ in range(rounds):
        word = _choose_word(rng, WORD_BANK)
        puzzle = make_puzzle(word, difficulty, rng)
        won, points = play_round(puzzle, max_tries=max_tries)
        score += points
        wins += int(won)

        again = prompt_choice("\nPlay next round? (y/n): ", ["y", "n"])
        if again == "n":
            break

    print("\nThanks for playing!")
    print(f"Wins: {wins}")
    print(f"Score: {score}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

