export default function DarkCard({ data }) {
  return (
    <div className="card bg-gray-900 text-white p-6">
      <h2 className="text-lg font-semibold">{data.name}</h2>
      <p className="text-sm text-gray-400">{data.role}</p>
    </div>
  );
}
