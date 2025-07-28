'use client';

import { useState, useEffect, useRef } from 'react';

type Player = {
  rank: number;
  player: string;
  score: number;
};

type HistoryItem = {
  score: number;
  timestamp: string;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log("🔗 Backend URL from env:", BACKEND_URL);

export default function Home() {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyPlayer, setHistoryPlayer] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const scoreInputRef = useRef<HTMLInputElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);

  const fetchLeaderboard = async () => {
    const res = await fetch(`${BACKEND_URL}/leaderboard`);
    const data = await res.json();
    setLeaderboard(data);
  };

  const fetchHistory = async (playerName: string) => {
    const res = await fetch(`${BACKEND_URL}/history/${playerName}`);
    const data = await res.json();
    setHistory(data);
  };

  const submitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !score) return;

    await fetch(`${BACKEND_URL}/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: name, score: Number(score) }),
    });

    setAnnouncement(`Added ${name} with score ${score}`);
    setTimeout(() => {
      announcementRef.current?.focus();
    }, 100);

    fetchLeaderboard();
    fetchHistory(name);
    setHistoryPlayer(name);
    setName('');
    setScore('');
  };

  const resetLeaderboard = async () => {
    await fetch(`${BACKEND_URL}/reset`, {
      method: 'DELETE',
    });
    fetchLeaderboard();
    setAnnouncement('Leaderboard reset');
    setTimeout(() => {
      announcementRef.current?.focus();
    }, 100);
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');
      if (!isTyping && e.key.toLowerCase() === 's') {
        e.preventDefault();
        scoreInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    setAnnouncement(darkMode ? 'Switched to light mode' : 'Switched to dark mode');
  };

  return (
    <>
      <a
        href="#main-content"
        className="absolute left-[-999px] top-2 focus:left-4 focus:top-2 bg-yellow-300 text-black px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>

      <main
        id="main-content"
        className={`prose dark:prose-invert max-w-2xl mx-auto p-6 min-h-screen rounded-lg transition-colors duration-300 ${
          darkMode
            ? 'bg-gradient-to-br from-gray-800 to-black text-white'
            : 'bg-gradient-to-br from-white to-blue-50 text-black'
        }`}
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? 'Switch to Light Mode' : '🌙 Switch to Dark Mode'}
          </button>
        </div>

        <div
          aria-live="assertive"
          aria-atomic="true"
          className="sr-only"
          role="status"
          id="submission-announcement"
          tabIndex={0}
          ref={announcementRef}
        >
          {announcement}
        </div>

        <h1 className="text-3xl font-bold mb-6">Real-Time Game Leaderboard</h1>

        <form onSubmit={submitScore} className="mb-6 space-y-4" aria-labelledby="score-form-heading">
          <fieldset className="space-y-4">
            <legend id="score-form-heading" className="text-xl font-semibold mb-2">
              Enter Player Score
            </legend>

            <div>
              <label htmlFor="playerName" className="block mb-1 font-medium">
                Player Name
              </label>
              <input
                id="playerName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-400 text-black"
                required
              />
            </div>

            <div>
              <label htmlFor="playerScore" className="block mb-1 font-medium">
                Score
              </label>
              <input
                id="playerScore"
                type="number"
                ref={scoreInputRef}
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-400 text-black"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              aria-describedby="submission-announcement"
            >
              Submit Score
            </button>
          </fieldset>
        </form>

        <button
          onClick={resetLeaderboard}
          className="ml-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          aria-label="Reset all scores and clear leaderboard"
        >
          Reset Scores
        </button>

        <section role="region" aria-labelledby="leaderboard-heading" className="mt-10">
          <h2 id="leaderboard-heading" className="text-2xl font-semibold mb-2">
            Top 10 Players
          </h2>

          <ul className="space-y-2">
            {leaderboard.map((p) => (
              <li
                key={p.rank}
                className="p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900"
              >
                <strong className="text-lg">🏅 {p.rank}. {p.player}</strong>
                <div className="text-sm mt-1">
                  Score: <span className="font-bold">{p.score}</span> pts
                </div>
              </li>
            ))}
          </ul>
        </section>

        {history.length > 0 && historyPlayer && (
          <section className="mt-10" aria-labelledby="history-heading" role="region">
            <h2 id="history-heading" className="text-xl font-semibold mb-2">
              📜 Score History for {historyPlayer}
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 border">#</th>
                    <th className="px-4 py-2 border">Score</th>
                    <th className="px-4 py-2 border">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {[...history]
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((item, index) => (
                      <tr key={index} className="even:bg-gray-50 dark:even:bg-gray-700">
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{item.score}</td>
                        <td className="px-4 py-2 border font-mono">
                          {new Date(item.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2025 Game Leaderboard · Built with ❤️ by Tikaram
        </footer>
      </main>
    </>
  );
}
