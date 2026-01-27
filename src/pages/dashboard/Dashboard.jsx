import AdminLayout from "../../components/layout/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAuth } from "../../context/AuthContext";

/* ================= HELPERS ================= */
const toFullUrl = (path) => {
  if (!path) return null;

  // already full URL
  if (path.startsWith("http")) return path;

  const baseUrl = import.meta.env.VITE_API_URL.replace("/api", "");
  return `${baseUrl}/storage/${path}`;
};
/* =========================================== */

const stats = [
  {
    title: "Total Employees",
    value: 42,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Active Employees",
    value: 38,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    title: "Cards Issued",
    value: 42,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Expiring Soon",
    value: 3,
    color: "from-pink-500 to-pink-600",
  },
];

const chartData = [
  { month: "Jan", employees: 5 },
  { month: "Feb", employees: 10 },
  { month: "Mar", employees: 18 },
  { month: "Apr", employees: 25 },
  { month: "May", employees: 35 },
  { month: "Jun", employees: 42 },
];

export default function OrganizationDashboard() {
  const { user, brand } = useAuth();

  console.log("Dashboard Rendered with brand:", user?.email);

  /* ================= DERIVED DATA ================= */
  const orgName =
    brand?.brand_name || user?.organization?.name || "Organization";

  const orgEmail = user?.email || "N/A";
  const orgPhone = user?.phone || "N/A";

  const logo =
    toFullUrl(brand?.logo) || "https://via.placeholder.com/80?text=Logo";

  const cover = toFullUrl(brand?.cover_page);
  /* =============================================== */

  return (
    <AdminLayout>
      {/* ================= Back Button ================= */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-slate-600 mb-4"
      >
        ← Back to Organizations
      </button>

      {/* ================= Cover Section ================= */}
      <div className="relative mb-24">
        {cover ? (
          <div
            className="w-full h-[260px] rounded-2xl bg-center bg-cover"
            style={{ backgroundImage: `url(${cover})` }}
          />
        ) : (
          <div className="w-full h-[260px] rounded-2xl bg-gradient-to-b from-slate-200 to-slate-400" />
        )}

        {/* Floating Organization Card */}
        <div className="absolute -bottom-14 left-6 bg-white rounded-2xl shadow-lg p-4 flex gap-4 items-center w-[320px]">
          <img
            src={logo}
            alt="Organization Logo"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/80?text=Logo";
            }}
            className="w-16 h-16 rounded-xl object-cover border"
          />
          <div>
            <h3 className="text-lg font-bold text-slate-800">{orgName}</h3>
            {orgEmail && <p className="text-sm text-slate-500">{orgEmail}</p>}
            {orgPhone && <p className="text-sm text-slate-500">{orgPhone}</p>}
          </div>
        </div>
      </div>

      {/* ================= Dashboard Header ================= */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Organization Dashboard
          </h2>
          <p className="text-slate-500">
            Manage your employees and digital cards
          </p>
        </div>
      </div>

      {/* ================= KPI Cards ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((item) => (
          <div
            key={item.title}
            className={`bg-gradient-to-r ${item.color} rounded-2xl p-5 text-white shadow-lg`}
          >
            <p className="text-sm opacity-80">{item.title}</p>
            <h3 className="text-3xl font-bold mt-2">{item.value}</h3>
          </div>
        ))}
      </div>

      {/* ================= Chart ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-4">Employee Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="employees"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}
