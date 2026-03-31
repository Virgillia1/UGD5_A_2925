"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect, useEffectEvent, useRef, useState } from "react";
import { clearAuthCookie, saveFlashToast } from "@/lib/auth";
import { LOGIN_ROUTE } from "@/lib/constants";
import { PowerIcon } from "./icons";
import { useToast } from "./toast-provider";

const holes = Array.from({ length: 9 });

function TapMouseGame() {
  const { showToast } = useToast();
  const [moleIndex, setMoleIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const scoreRef = useRef(score);
  const highScoreRef = useRef(highScore);
  const savedTimeTicksRef = useRef(0);
  const handleTimeUp = useEffectEvent(() => {
    showToast({
      title: "Waktu habis!",
      variant: "info",
      duration: 1500,
    });

    if (scoreRef.current > highScoreRef.current) {
      window.localStorage.setItem("whack_highscore", scoreRef.current.toString());
      setHighScore(scoreRef.current);
      showToast({
        title: "New High Score!",
        variant: "successDark",
        duration: 1500,
      });
    }
  });

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    highScoreRef.current = highScore;
  }, [highScore]);

  useEffect(() => {
    const initializeHighScore = window.setTimeout(() => {
      const savedHighScore = window.localStorage.getItem("whack_highscore");

      if (savedHighScore) {
        setHighScore(Number(savedHighScore));
      }
    }, 0);

    return () => window.clearTimeout(initializeHighScore);
  }, []);

  useEffect(() => {
    if (!gameActive) {
      return;
    }

    const moleTimer = window.setInterval(() => {
      const randomIndex = Math.floor(Math.random() * holes.length);
      setMoleIndex(randomIndex);
    }, 700);

    return () => window.clearInterval(moleTimer);
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive || time <= 0) {
      return;
    }

    const countdown = window.setInterval(() => {
      setTime((previous) => {
        if (savedTimeTicksRef.current > 0) {
          savedTimeTicksRef.current -= 1;
          return previous;
        }

        return Math.max(previous - 1, 0);
      });
    }, 1000);

    return () => window.clearInterval(countdown);
  }, [gameActive, time]);

  useEffect(() => {
    if (!gameActive || time > 0) {
      return;
    }

    const finishTimer = window.setTimeout(() => {
      setGameActive(false);
      setMoleIndex(null);
      handleTimeUp();
    }, 0);

    return () => window.clearTimeout(finishTimer);
  }, [gameActive, time]);

  function hitMole(index: number) {
    if (index === moleIndex && gameActive) {
      setScore((previous) => previous + 1);
      setMoleIndex(null);
      savedTimeTicksRef.current += 1;
    }
  }

  function startGame() {
    setScore(0);
    setTime(30);
    setMoleIndex(null);
    setGameActive(true);
    savedTimeTicksRef.current = 0;
    showToast({
      title: "Waktu dimulai!",
      description: "Kamu punya 30 detik!",
      variant: "info",
      duration: 1500,
    });
  }

  return (
    <div className="game-container">
      <div className="game-panel">
        <h1 className="game-title">Tap the Mouse</h1>

        <div className="game-stats">
          <div className="score">Score: {score}</div>
          <div className="timer">Time: {time}</div>
        </div>

        <div className="highscore">High Score: {highScore}</div>

        {!gameActive ? (
          <button type="button" className="start-btn" onClick={startGame}>
            Start Game
          </button>
        ) : null}
      </div>

      <div className="game-grid">
        {holes.map((_, index) => (
          <div
            key={index}
            onClick={() => hitMole(index)}
            className="hole"
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                hitMole(index);
              }
            }}
          >
            {moleIndex === index ? <div className="mole">🐹</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeDashboard() {
  const router = useRouter();

  function handleLogout() {
    clearAuthCookie();
    saveFlashToast({
      title: "Logout berhasil",
      description: "Anda kembali ke halaman login.",
      variant: "info",
    });

    startTransition(() => {
      router.push(LOGIN_ROUTE);
    });
  }

  return (
    <main className="mouse-home min-h-screen px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mouse-home-title">Selamat Datang!</h1>
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleLogout}
            className="mouse-home-logout"
            aria-label="Logout ke halaman login"
            title="Logout"
          >
            <PowerIcon className="h-9 w-9" />
          </button>
        </div>

        <div className="mt-8 sm:mt-12">
          <TapMouseGame />
        </div>
      </div>
    </main>
  );
}
