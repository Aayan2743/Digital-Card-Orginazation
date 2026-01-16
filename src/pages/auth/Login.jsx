import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // admin | user

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP AUTH (replace with API later)
    if (email && password) {
      login({
        id: 1,
        name: role === "admin" ? "Organization Admin" : "Staff User",
        role,
      });

      // ROLE BASED REDIRECT
      if (role === "admin") {
        navigate("/");
      } else {
        navigate("/user/my-card");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
        {/* Logo / Title */}
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

        {/* ROLE SWITCH */}
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
          {/* Email */}
          <div>
            <label className="text-white text-sm mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Password */}
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

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm text-white/80">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-indigo-500" />
              Remember me
            </label>
            <span className="hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-white/70 mt-6">
          © {new Date().getFullYear()} Digital Card Platform
        </p>
      </div>
    </div>
  );
}
