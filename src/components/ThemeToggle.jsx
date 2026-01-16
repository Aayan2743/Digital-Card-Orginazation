export default function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 
                 text-gray-700 dark:text-gray-200 text-sm font-medium 
                 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
