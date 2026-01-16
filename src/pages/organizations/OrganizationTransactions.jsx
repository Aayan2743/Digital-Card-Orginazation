import AdminLayout from "../../components/layout/AdminLayout";

const transactions = [
  {
    id: 1,
    org: "ABC Corp",
    cards: 20,
    amount: 980,
    date: "2024-02-01",
    proof: "receipt.pdf",
  },
];

export default function OrganizationTransactions() {
  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Transactions</h2>

        <table className="w-full">
          <thead className="bg-slate-100 text-sm">
            <tr>
              <th className="p-3 text-left">Organization</th>
              <th className="p-3">Cards</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Proof</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b">
                <td className="p-3">{tx.org}</td>
                <td className="p-3 text-center">{tx.cards}</td>
                <td className="p-3 text-center">₹{tx.amount}</td>
                <td className="p-3 text-center">{tx.date}</td>
                <td className="p-3 text-center">
                  <a className="text-indigo-600 underline" href="#">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
