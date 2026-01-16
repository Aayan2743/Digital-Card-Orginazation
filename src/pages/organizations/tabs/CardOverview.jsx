export default function CardOverview({ org }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-50 rounded-xl p-4">
        <div className="flex justify-between">
          <span>Total Cards</span>
          <b>{org.totalCards}</b>
        </div>
        <div className="flex justify-between">
          <span>Active Cards</span>
          <b className="text-green-600">{org.activeCards}</b>
        </div>
        <div className="flex justify-between">
          <span>Expired Cards</span>
          <b className="text-red-600">{org.expiredCards}</b>
        </div>
      </div>

      <div className="text-sm text-slate-500">
        Card rate is fixed from settings.
      </div>
    </div>
  );
}
