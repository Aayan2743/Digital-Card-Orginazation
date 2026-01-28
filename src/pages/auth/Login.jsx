import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import { errorAlert, successAlert } from "../../utils/alert";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // admin | user
  const [loading, setLoading] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);

  // ✅ IMPORTANT: redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      errorAlert("Validation Error", "Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/organazation-login", {
        username: email, // email OR phone
        password,
        role: role === "admin" ? "employeer" : "employee",
      });

      // ✅ SAVE AUTH PROPERLY
      login({
        token: data.token,
        user: data.user,
      });

      // ✅ OPTIONAL success alert (can remove if you want silent login)
      successAlert("Welcome", `Hello ${data.user.name}`);

      // ✅ ROLE BASED REDIRECT
      if (data.user.role === "employeer") {
        navigate("/", { replace: true });
      } else {
        navigate("/user/my-card", { replace: true });
      }
    } catch (error) {
      errorAlert(
        "Login Failed",
        error.response?.data?.message || "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
        {/* Title */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 h-14 w-14 flex items-center justify-center rounded-full bg-white text-indigo-600 text-2xl font-bold shadow">
            A
          </div>
          <h1 className="text-3xl font-bold text-white">
            {role === "admin" ? "Organization Login" : "User Login"}
          </h1>
          <p className="text-white/80 text-sm mt-1">
            {role === "admin"
              ? "Manage staff and branding"
              : "View and update your digital card"}
          </p>
        </div>

        {/* Role Switch */}
        <div className="flex bg-white/20 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition
              ${
                role === "admin"
                  ? "bg-white text-indigo-600 shadow"
                  : "text-white/80 hover:text-white"
              }`}
          >
            Organization
          </button>

          <button
            type="button"
            onClick={() => setRole("user")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition
              ${
                role === "user"
                  ? "bg-white text-indigo-600 shadow"
                  : "text-white/80 hover:text-white"
              }`}
          >
            User
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm mb-1 block">
              Email or Phone
            </label>
            <input
              type="text"
              placeholder="email or phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="text-white text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold transition shadow-lg"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <span
          onClick={() => navigate("/forget-password")}
          className="hover:underline cursor-pointer"
        >
          Forgot password?
        </span>

        <p className="text-center text-xs text-white/70 mt-6">
          © {new Date().getFullYear()} OneDesk
        </p>
      </div>
    </div>
  );
}
