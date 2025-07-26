
'use client';

import React from 'react';

interface Props {
  name: string;
  setName: (val: string) => void;
  score: string;
  setScore: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  scoreInputRef: React.RefObject<HTMLInputElement>;
}

export default function FormSection({
  name,
  setName,
  score,
  setScore,
  handleSubmit,
  scoreInputRef,
}: Props) {
  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4" aria-labelledby="score-form-heading">
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
            aria-describedby="scoreHelp"
          />
          <span id="scoreHelp" className="sr-only">
            Enter numeric score only
          </span>
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
  );
}
