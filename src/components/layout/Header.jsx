import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md shadow flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">
        Welcome, <span className="text-indigo-600">{user?.name}</span>
      </h2>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/settings")}
          className="text-slate-600 hover:text-indigo-600 text-sm"
        >
          Settings
        </button>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="text-red-500 text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
