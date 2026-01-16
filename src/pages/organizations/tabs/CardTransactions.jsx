export default function CardTransactions({ transactions = [] }) {
  return (
    <div>
      <h4 className="font-semibold mb-2">Transactions</h4>
      {transactions.length === 0 && (
        <p className="text-sm text-gray-500">No transactions</p>
      )}
      {transactions.map((tx) => (
        <div key={tx.id} className="border p-2 mb-2 text-sm">
          {tx.cards} cards • {tx.days} days • ₹{tx.amount}
          <div className="text-xs text-gray-500">{tx.date}</div>
        </div>
      ))}
    </div>
  );
}
