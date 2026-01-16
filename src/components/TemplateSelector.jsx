export default function TemplateSelector({ value, onChange }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange("wave")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition
          ${
            value === "wave"
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-gray-800 border text-gray-700 dark:text-gray-200"
          }`}
      >
        Wave
      </button>

      <button
        onClick={() => onChange("split")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition
          ${
            value === "split"
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-gray-800 border text-gray-700 dark:text-gray-200"
          }`}
      >
        Split
      </button>

      <button
        onClick={() => onChange("dark")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition
          ${
            value === "dark"
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-gray-800 border text-gray-700 dark:text-gray-200"
          }`}
      >
        Dark
      </button>
    </div>
  );
}
