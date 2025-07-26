
interface Props {
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function ThemeToggle({ darkMode, toggleTheme }: Props) {
  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        aria-label="Toggle dark mode"
      >
        {darkMode ? 'Switch to Light Mode' : '🌙 Switch to Dark Mode'}
      </button>
    </div>
  );
}
