export default function SplitCard({ data }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-4">
        <div className="avatar small">Photo</div>
        <div>
          <h2 className="text-lg font-semibold">{data.name}</h2>
          <p className="text-sm text-gray-500">{data.role}</p>
        </div>
      </div>
    </div>
  );
}
