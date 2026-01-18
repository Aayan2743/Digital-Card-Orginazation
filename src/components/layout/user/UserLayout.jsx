// import { NavLink, useNavigate } from "react-router-dom";

// import { useAuth } from "../../../context/AuthContext";

// export default function UserLayout({ children }) {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 flex flex-col">
//       {/* ================= HEADER ================= */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
//           {/* BRAND */}
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
//               A
//             </div>
//             <span className="font-semibold text-slate-800">Digital Card</span>
//           </div>

//           {/* NAV */}
//           <nav className="flex items-center gap-6 text-sm">
//             <NavLink
//               to="/user/my-card"
//               className={({ isActive }) =>
//                 `font-medium transition ${
//                   isActive
//                     ? "text-indigo-600"
//                     : "text-slate-600 hover:text-indigo-600"
//                 }`
//               }
//             >
//               👤 My Card
//             </NavLink>

//             <NavLink
//               to="/user/edit-card"
//               className={({ isActive }) =>
//                 `font-medium transition ${
//                   isActive
//                     ? "text-indigo-600"
//                     : "text-slate-600 hover:text-indigo-600"
//                 }`
//               }
//             >
//               ✏️ Edit Card
//             </NavLink>

//             <button
//               onClick={handleLogout}
//               className="text-slate-500 hover:text-red-500 transition"
//             >
//               🚪 Logout
//             </button>
//           </nav>
//         </div>
//       </header>

//       {/* ================= CONTENT ================= */}
//       <main className="flex-1">
//         <div className="max-w-5xl mx-auto px-6 py-8">{children}</div>
//       </main>

//       {/* ================= FOOTER ================= */}
//       <footer className="text-center text-xs text-slate-400 py-4">
//         © {new Date().getFullYear()} Digital Card Platform
//       </footer>
//     </div>
//   );
// }

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function UserLayout({ children }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = [
    { name: "My Card", path: "/user/my-card", icon: "👤" },
    { name: "Edit Card", path: "/user/edit-card", icon: "✏️" },

    { name: "Calendar", path: "/my-calender", icon: "📅" },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* ================= MOBILE OVERLAY ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b
        from-slate-900 to-slate-800 text-white shadow-2xl z-50
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* BRAND */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-wide">
                Digital<span className="text-indigo-400">Card</span>
              </h1>
              <p className="text-xs text-white/60 mt-1">User Panel</p>
            </div>

            {/* CLOSE (MOBILE) */}
            <button
              className="lg:hidden text-white/70"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          {/* MENU */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
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

          {/* USER INFO */}
          <div className="px-6 py-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
                {user?.name?.[0] || "U"}
              </div>
              <div>
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-white/60">User</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full text-sm text-left px-4 py-2 rounded-lg
                         bg-white/10 hover:bg-red-500/20 text-red-300 transition"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* HEADER */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-6">
          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden text-slate-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <h2 className="text-lg font-semibold text-slate-800">
            Welcome, {user?.name || "User"}
          </h2>

          <span className="hidden sm:block text-sm text-slate-500">
            User Dashboard
          </span>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>

        {/* FOOTER */}
        <footer className="text-center text-xs text-slate-400 py-4">
          © {new Date().getFullYear()} Digital Card Platform
        </footer>
      </div>
    </div>
  );
}
