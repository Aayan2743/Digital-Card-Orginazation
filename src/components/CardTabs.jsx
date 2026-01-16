export default function CardTabs({ active, setActive, counts }) {
  return (
    <div className="flex gap-2 mb-6">
      {["assigned", "unassigned"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            active === tab
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {tab === "assigned"
            ? `Assigned Cards (${counts.assigned})`
            : `Unassigned Cards (${counts.unassigned})`}
        </button>
      ))}
    </div>
  );
}
