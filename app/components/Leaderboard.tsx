
import React from 'react';

type Player = {
  rank: number;
  player: string;
  score: number;
};

export default function Leaderboard({ players }: { players: Player[] }) {
  return (
    <section role="region" aria-labelledby="leaderboard-heading" className="mt-10">
      <h2 id="leaderboard-heading" className="text-2xl font-semibold mb-2">
        🏆 Top 10 Players
      </h2>

      <div aria-live="polite" className="sr-only">
        {players.length > 0 && `Top player: ${players[0].player} with ${players[0].score} points`}
      </div>

      <ul className="space-y-2">
        {players.map((p) => (
          <li
            key={p.rank}
            className="p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900"
            aria-label={`Rank ${p.rank}: ${p.player} with ${p.score} points`}
          >
            <strong className="text-lg">🏅 {p.rank}. {p.player}</strong>
            <div className="text-sm mt-1">
              Score: <span className="font-bold">{p.score}</span> pts
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
