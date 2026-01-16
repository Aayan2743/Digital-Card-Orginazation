import { useState, useMemo } from "react";
import { Search, ArrowLeft, FileText, Download, X } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useNavigate } from "react-router-dom";

export default function PaymentTransactions() {
  const navigate = useNavigate();

  /* ---------------- ORGANIZATION INFO ---------------- */
  const org = {
    name: "ABC Corporation",
    logo: "https://via.placeholder.com/100x100",
    email: "support@abccorp.com",
    phone: "+91 98765 43210",
  };

  /* ---------------- PAYMENT DATA ---------------- */
  const [payments] = useState([
    {
      id: 1,
      order_id: "ORD-1001",
      cards: 25,
      amount: 10878,
      method: "UPI",
      status: "Success",
      date: "2026-01-15",
      txn_id: "TXN998877",
    },
    {
      id: 2,
      order_id: "ORD-1002",
      cards: 5,
      amount: 490,
      method: "Card",
      status: "Success",
      date: "2026-01-15",
      txn_id: "TXN112233",
    },
    {
      id: 3,
      order_id: "ORD-1003",
      cards: 3,
      amount: 245,
      method: "NetBanking",
      status: "Pending",
      date: "2026-01-14",
      txn_id: "TXN445566",
    },
  ]);

  /* ---------------- UI STATE ---------------- */
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [method, setMethod] = useState("all");
  const [page, setPage] = useState(1);
  const [receipt, setReceipt] = useState(null);

  const ITEMS_PER_PAGE = 5;

  /* ---------------- FILTERING ---------------- */
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchSearch = p.order_id
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus = status === "all" || p.status === status;
      const matchMethod = method === "all" || p.method === method;

      return matchSearch && matchStatus && matchMethod;
    });
  }, [payments, search, status, method]);

  const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);
  const paginatedPayments = filteredPayments.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  /* ---------------- EXPORT CSV ---------------- */
  const exportCSV = () => {
    const headers = [
      "Order ID",
      "Cards",
      "Amount",
      "Method",
      "Status",
      "Date",
      "Transaction ID",
    ];

    const rows = filteredPayments.map((p) => [
      p.order_id,
      p.cards,
      p.amount,
      p.method,
      p.status,
      p.date,
      p.txn_id,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "organization_payments.csv";
    link.click();
  };

  /* ---------------- EXPORT EXCEL ---------------- */
  const exportExcel = () => {
    let table = `<table><tr>
      <th>Order ID</th>
      <th>Cards</th>
      <th>Amount</th>
      <th>Method</th>
      <th>Status</th>
      <th>Date</th>
      <th>Transaction ID</th>
    </tr>`;

    filteredPayments.forEach((p) => {
      table += `<tr>
        <td>${p.order_id}</td>
        <td>${p.cards}</td>
        <td>${p.amount}</td>
        <td>${p.method}</td>
        <td>${p.status}</td>
        <td>${p.date}</td>
        <td>${p.txn_id}</td>
      </tr>`;
    });

    table += "</table>";

    const uri =
      "data:application/vnd.ms-excel;charset=utf-8," +
      encodeURIComponent(table);

    const link = document.createElement("a");
    link.href = uri;
    link.download = "organization_payments.xls";
    link.click();
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h2 className="text-xl font-semibold">Payment History</h2>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search Order ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="outline-none text-sm w-64"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="border rounded-xl px-4 py-2 text-sm bg-white shadow-sm"
          >
            <option value="all">All Status</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

          <select
            value={method}
            onChange={(e) => {
              setMethod(e.target.value);
              setPage(1);
            }}
            className="border rounded-xl px-4 py-2 text-sm bg-white shadow-sm"
          >
            <option value="all">All Methods</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="NetBanking">NetBanking</option>
          </select>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm hover:bg-gray-50"
          >
            <Download size={16} /> CSV
          </button>

          <button
            onClick={exportExcel}
            className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm hover:bg-gray-50"
          >
            <Download size={16} /> Excel
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-center">Cards</th>
              <th className="p-4 text-center">Amount</th>
              <th className="p-4 text-center">Method</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Date</th>
              <th className="p-4 text-center">Receipt</th>
            </tr>
          </thead>

          <tbody>
            {paginatedPayments.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{p.order_id}</td>
                <td className="p-4 text-center">{p.cards}</td>
                <td className="p-4 text-center font-semibold">₹{p.amount}</td>
                <td className="p-4 text-center">{p.method}</td>
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      p.status === "Success"
                        ? "bg-green-100 text-green-600"
                        : p.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-4 text-center">{p.date}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => setReceipt(p)}
                    className="text-indigo-600 hover:underline"
                  >
                    <FileText size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RECEIPT MODAL */}
      {receipt && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl w-[420px] overflow-hidden">
            <div className="bg-indigo-600 p-5 text-white relative">
              <button
                onClick={() => setReceipt(null)}
                className="absolute right-4 top-4"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={org.logo}
                  className="w-14 h-14 rounded-xl bg-white p-1"
                />
                <div>
                  <h3 className="text-lg font-semibold">{org.name}</h3>
                  <p className="text-sm opacity-90">Payment Receipt</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID</span>
                <span className="font-medium">{receipt.order_id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-medium">{receipt.txn_id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method</span>
                <span className="font-medium">{receipt.method}</span>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-gray-600">Total Paid</span>
                <span className="text-2xl font-bold text-indigo-600">
                  ₹{receipt.amount}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 text-xs text-gray-500 text-center">
              {org.email} · {org.phone}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
