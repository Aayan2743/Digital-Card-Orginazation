// import { useState, useMemo } from "react";
// import { ArrowLeft, Download } from "lucide-react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import AddCardsDrawer from "./AddCardsDrawer";

// import { useNavigate } from "react-router-dom";

// export default function OrganizationView() {
//   const [showDrawer, setShowDrawer] = useState(false);

//   const navigate = useNavigate();

//   /* ---------------- ORG DATA ---------------- */
//   const org = {
//     name: "ABC Corp",
//     email: "abc@corp.com",
//     phone: "9876543210",
//     logo: "https://via.placeholder.com/120",
//     cover: "https://via.placeholder.com/1400x400",
//     totalCards: 15,
//     activeCards: 15,
//     inactiveCards: 0,
//   };

//   /* ---------------- TRANSACTIONS ---------------- */
//   const [transactions, setTransactions] = useState([
//     {
//       id: 1,
//       date: "2025-01-01",
//       cards: 10,
//       days: 30,
//       amount: 490,
//       expiry: "2025-01-31",
//       status: "Active",
//     },
//     {
//       id: 2,
//       date: "2025-01-02",
//       cards: 5,
//       days: 30,
//       amount: 245,
//       expiry: "2025-02-01",
//       status: "Active",
//     },
//     {
//       id: 3,
//       date: "2025-01-03",
//       cards: 8,
//       days: 30,
//       amount: 392,
//       expiry: "2025-02-02",
//       status: "Expired",
//     },
//     {
//       id: 4,
//       date: "2025-01-04",
//       cards: 4,
//       days: 30,
//       amount: 196,
//       expiry: "2025-02-03",
//       status: "Active",
//     },
//     {
//       id: 5,
//       date: "2025-01-05",
//       cards: 6,
//       days: 30,
//       amount: 294,
//       expiry: "2025-02-04",
//       status: "Expired",
//     },
//     {
//       id: 6,
//       date: "2025-01-06",
//       cards: 3,
//       days: 30,
//       amount: 147,
//       expiry: "2025-02-05",
//       status: "Active",
//     },
//   ]);

//   /* ---------------- SEARCH & FILTER ---------------- */
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   /* ---------------- PAGINATION ---------------- */
//   const ITEMS_PER_PAGE = 5;
//   const [currentPage, setCurrentPage] = useState(1);

//   /* ---------------- HELPERS ---------------- */
//   const daysLeft = (expiry) => {
//     const diff = new Date(expiry) - new Date();
//     return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
//   };

//   const addTransaction = (tx) => {
//     setTransactions((prev) => [tx, ...prev]);
//     setCurrentPage(1);
//   };

//   /* ---------------- FILTERED DATA ---------------- */
//   const filteredTransactions = useMemo(() => {
//     return transactions.filter((tx) => {
//       const matchSearch =
//         tx.date.includes(search) ||
//         tx.amount.toString().includes(search) ||
//         tx.status.toLowerCase().includes(search.toLowerCase());

//       const matchStatus = statusFilter === "all" || tx.status === statusFilter;

//       return matchSearch && matchStatus;
//     });
//   }, [transactions, search, statusFilter]);

//   const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

//   const paginatedTransactions = filteredTransactions.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   /* ---------------- EXPORT CSV ---------------- */
//   const exportCSV = () => {
//     const headers = ["Date", "Cards", "Expiry", "Status", "Amount"];
//     const rows = filteredTransactions.map((t) => [
//       t.date,
//       t.cards,
//       t.expiry,
//       t.status,
//       t.amount,
//     ]);

//     let csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((e) => e.join(",")).join("\n");

//     const link = document.createElement("a");
//     link.href = encodeURI(csvContent);
//     link.download = "transactions.csv";
//     link.click();
//   };

//   return (
//     <AdminLayout>
//       {/* BACK */}
//       <button
//         onClick={() => window.history.back()}
//         className="flex items-center gap-2 text-gray-600 mb-4 hover:text-indigo-600"
//       >
//         <ArrowLeft size={18} />
//         Back to Organizations
//       </button>

//       {/* HERO */}
//       <div className="relative mb-20">
//         <img src={org.cover} className="w-full h-56 object-cover rounded-2xl" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
//         <div className="absolute left-6 -bottom-16 bg-white rounded-2xl shadow-xl p-4 flex gap-4">
//           <img src={org.logo} className="w-20 h-20 rounded-xl border" />
//           <div>
//             <h2 className="text-2xl font-bold">{org.name}</h2>
//             <p className="text-sm text-gray-500">{org.email}</p>
//             <p className="text-sm text-gray-500">{org.phone}</p>
//           </div>
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//         <StatCard label="Total Cards" value={org.totalCards} />
//         <StatCard label="Active Cards" value={org.activeCards} green />
//         <StatCard label="Inactive Cards" value={org.inactiveCards} red />
//       </div>

//       {/* ACTION BAR */}
//       <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
//         <div className="flex gap-3">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="border rounded-lg px-3 py-2 text-sm"
//           />

//           <select
//             value={statusFilter}
//             onChange={(e) => {
//               setStatusFilter(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="border rounded-lg px-3 py-2 text-sm"
//           >
//             <option value="all">All Status</option>
//             <option value="Active">Active</option>
//             <option value="Expired">Expired</option>
//           </select>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={exportCSV}
//             className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
//           >
//             <Download size={16} /> Export CSV
//           </button>

//           <button
//             onClick={() => setShowDrawer(true)}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow"
//           >
//             + Add Cards
//           </button>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-2xl shadow overflow-hidden">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="p-4 text-left">Date</th>
//               <th className="p-4 text-center">Cards</th>
//               <th className="p-4 text-center">Expiry</th>
//               <th className="p-4 text-center">Status</th>
//               <th className="p-4 text-center">Amount</th>
//               <th className="p-4 text-center">View</th>
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedTransactions.map((tx) => (
//               <tr key={tx.id} className="border-t">
//                 <td className="p-4">{tx.date}</td>
//                 <td className="p-4 text-center">{tx.cards}</td>
//                 <td className="p-4 text-center">
//                   {tx.expiry}
//                   <span className="ml-2 text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full">
//                     {daysLeft(tx.expiry)} days left
//                   </span>
//                 </td>
//                 <td className="p-4 text-center">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs ${
//                       tx.status === "Active"
//                         ? "bg-green-100 text-green-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {tx.status}
//                   </span>
//                 </td>
//                 <td className="p-4 text-center font-semibold">₹{tx.amount}</td>

//                 <td className="p-4 text-center">
//                   <button
//                     onClick={() => navigate(`/organizations/cards/${tx.id}`)}
//                     className="text-indigo-600 font-medium hover:underline"
//                   >
//                     View Cards
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {paginatedTransactions.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="p-6 text-center text-gray-400">
//                   No transactions found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* PAGINATION */}
//         <div className="flex justify-between items-center px-4 py-3 border-t">
//           <p className="text-sm text-gray-500">
//             Page {currentPage} of {totalPages || 1}
//           </p>

//           <div className="flex gap-2">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((p) => p - 1)}
//               className="border px-3 py-1 rounded-lg text-sm disabled:opacity-50"
//             >
//               Prev
//             </button>

//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`border px-3 py-1 rounded-lg text-sm ${
//                   currentPage === i + 1 ? "bg-indigo-600 text-white" : ""
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((p) => p + 1)}
//               className="border px-3 py-1 rounded-lg text-sm disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {showDrawer && (
//         <AddCardsDrawer
//           onClose={() => setShowDrawer(false)}
//           onSave={addTransaction}
//         />
//       )}
//     </AdminLayout>
//   );
// }

// /* ---------------- STAT CARD ---------------- */
// function StatCard({ label, value, green, red }) {
//   return (
//     <div className="bg-white rounded-2xl shadow p-6">
//       <p className="text-gray-500 text-sm">{label}</p>
//       <h3
//         className={`text-3xl font-bold mt-2 ${
//           green ? "text-green-600" : red ? "text-red-500" : ""
//         }`}
//       >
//         {value}
//       </h3>
//     </div>
//   );
// }

import { useState, useMemo } from "react";
import { ArrowLeft, Download, Settings } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import AddCardsDrawer from "./AddCardsDrawer";
import { useNavigate } from "react-router-dom";

export default function OrganizationView() {
  const [showDrawer, setShowDrawer] = useState(false);
  const navigate = useNavigate();

  /* ---------------- ORG DATA ---------------- */
  const org = {
    id: 12, // IMPORTANT: unique org id
    name: "ABC Corp",
    email: "abc@corp.com",
    phone: "9876543210",
    logo: "https://via.placeholder.com/120",
    cover: "https://via.placeholder.com/1400x400",
    totalCards: 15,
    activeCards: 15,
    inactiveCards: 0,
  };

  /* ---------------- TRANSACTIONS ---------------- */
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2025-01-01",
      cards: 10,
      days: 30,
      amount: 490,
      expiry: "2025-01-31",
      status: "Active",
    },
    {
      id: 2,
      date: "2025-01-02",
      cards: 5,
      days: 30,
      amount: 245,
      expiry: "2025-02-01",
      status: "Active",
    },
    {
      id: 3,
      date: "2025-01-03",
      cards: 8,
      days: 30,
      amount: 392,
      expiry: "2025-02-02",
      status: "Expired",
    },
  ]);

  /* ---------------- SEARCH & FILTER ---------------- */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  /* ---------------- PAGINATION ---------------- */
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- HELPERS ---------------- */
  const daysLeft = (expiry) => {
    const diff = new Date(expiry) - new Date();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  const addTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
    setCurrentPage(1);
  };

  /* ---------------- FILTERED DATA ---------------- */
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        tx.date.includes(search) ||
        tx.amount.toString().includes(search) ||
        tx.status.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === "all" || tx.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [transactions, search, statusFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ---------------- EXPORT CSV ---------------- */
  const exportCSV = () => {
    const headers = ["Date", "Cards", "Expiry", "Status", "Amount"];
    const rows = filteredTransactions.map((t) => [
      t.date,
      t.cards,
      t.expiry,
      t.status,
      t.amount,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "transactions.csv";
    link.click();
  };

  return (
    <AdminLayout>
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 mb-4 hover:text-indigo-600"
      >
        <ArrowLeft size={18} />
        Back to Organizations
      </button>

      {/* HERO */}
      <div className="relative mb-20">
        <img src={org.cover} className="w-full h-56 object-cover rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
        <div className="absolute left-6 -bottom-16 bg-white rounded-2xl shadow-xl p-4 flex gap-4">
          <img src={org.logo} className="w-20 h-20 rounded-xl border" />
          <div>
            <h2 className="text-2xl font-bold">{org.name}</h2>
            <p className="text-sm text-gray-500">{org.email}</p>
            <p className="text-sm text-gray-500">{org.phone}</p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Cards" value={org.totalCards} />
        <StatCard label="Active Cards" value={org.activeCards} green />
        <StatCard label="Inactive Cards" value={org.inactiveCards} red />
      </div>

      {/* ACTION BAR */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <div className="flex gap-3">
          {/* ACCESS SETTINGS BUTTON */}
          <button
            onClick={() =>
              navigate(`/admin/organizations/${org.id}/access-settings`)
            }
            className="flex items-center gap-2 border px-5 py-2 rounded-xl text-sm hover:bg-gray-50"
          >
            <Settings size={16} />
            Access Settings
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
          >
            <Download size={16} /> Export CSV
          </button>

          <button
            onClick={() => setShowDrawer(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow"
          >
            + Add Cards
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-center">Cards</th>
              <th className="p-4 text-center">Expiry</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Amount</th>
              <th className="p-4 text-center">View</th>
            </tr>
          </thead>

          <tbody>
            {paginatedTransactions.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="p-4">{tx.date}</td>
                <td className="p-4 text-center">{tx.cards}</td>
                <td className="p-4 text-center">
                  {tx.expiry}
                  <span className="ml-2 text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full">
                    {daysLeft(tx.expiry)} days left
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      tx.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="p-4 text-center font-semibold">₹{tx.amount}</td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => navigate(`/organizations/cards/${tx.id}`)}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    View Cards
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center px-4 py-3 border-t">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages || 1}
          </p>
        </div>
      </div>

      {showDrawer && (
        <AddCardsDrawer
          onClose={() => setShowDrawer(false)}
          onSave={addTransaction}
        />
      )}
    </AdminLayout>
  );
}

/* ---------------- STAT CARD ---------------- */
function StatCard({ label, value, green, red }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-gray-500 text-sm">{label}</p>
      <h3
        className={`text-3xl font-bold mt-2 ${
          green ? "text-green-600" : red ? "text-red-500" : ""
        }`}
      >
        {value}
      </h3>
    </div>
  );
}
