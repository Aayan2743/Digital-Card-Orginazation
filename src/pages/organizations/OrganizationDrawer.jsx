import { useState } from "react";
import CardManager from "./tabs/CardManager";
import CardTransactions from "./tabs/CardTransactions";

export default function OrganizationDrawer({ org, onClose }) {
  const [transactions, setTransactions] = useState([]);

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-[420px] bg-white z-50 p-4">
        <h3 className="text-lg font-bold mb-4">{org.name} – Cards</h3>

        <CardManager onAdd={(tx) => setTransactions((prev) => [...prev, tx])} />

        <CardTransactions transactions={transactions} />
      </div>
    </>
  );
}
