import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menu = [
  { name: "Dashboard", path: "/", icon: "🏠" },
  { name: "My Staff", path: "/staff-cards", icon: "👥" },
  { name: "Transactions", path: "/transactions", icon: "💳" },
  { name: "Settings", path: "/settings", icon: "⚙️" },
  { name: "Calendar", path: "/my-calender", icon: "📅" },
];

export default function Sidebar() {
  const { user, loading, brand } = useAuth();

  if (loading) return null; // ⛔ wait until auth boot finishes

  // const brandName = user?.organization_name || user?.name || "Organization";
  const brandName = brand?.brand_name || "Organization";

  // console.log("Sidebar Rendered with brandName:", brand.brand_name);

  const brandInitial = brandName.charAt(0).toUpperCase();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl z-40">
      <div className="h-full flex flex-col">
        {/* ================= BRAND ================= */}
        <div className="px-6 py-6 border-b border-white/10 flex items-center gap-3">
          {/* LOGO */}
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-lg shadow">
            {brandInitial}
          </div>

          {/* BRAND NAME */}
          <div className="overflow-hidden">
            <h1 className="text-lg font-extrabold leading-tight truncate">
              {brandName}
            </h1>
            <p className="text-xs text-white/50">Organization</p>
          </div>
        </div>

        {/* ================= MENU ================= */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"
                    : "hover:bg-white/10"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* ================= FOOTER ================= */}
        <div className="px-6 py-4 border-t border-white/10 text-xs text-white/60">
          © {new Date().getFullYear()} OneDesk
        </div>
      </div>
    </aside>
  );
}
