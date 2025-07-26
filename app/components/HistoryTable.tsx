
import React from 'react';

type HistoryItem = {
  score: number;
  timestamp: string;
};

interface Props {
  history: HistoryItem[];
  playerName: string;
}

export default function HistoryTable({ history, playerName }: Props) {
  return (
    <section className="mt-10" aria-labelledby="history-heading" role="region">
      <h2 id="history-heading" className="text-xl font-semibold mb-2">
        📜 Score History for {playerName}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <caption className="sr-only">Score history table for {playerName}</caption>
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-4 py-2 text-left border">#</th>
              <th scope="col" className="px-4 py-2 text-left border">Score</th>
              <th scope="col" className="px-4 py-2 text-left border">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
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
  );
}
