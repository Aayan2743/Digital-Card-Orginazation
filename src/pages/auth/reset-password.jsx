import { useState } from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setLoading(true);

    // UI only – API later
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
        {/* Icon */}
        <div className="mx-auto mb-4 h-14 w-14 flex items-center justify-center rounded-full bg-white text-indigo-600 shadow">
          <Lock size={22} />
        </div>

        <h1 className="text-2xl font-bold text-white text-center">
          Reset Password
        </h1>
        <p className="text-white/80 text-sm text-center mt-1 mb-6">
          OTP sent to <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="text-white text-sm mb-1 block">OTP</label>
            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="text-white text-sm mb-1 block">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold transition shadow-lg"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p
          onClick={() => navigate("/login")}
          className="mt-6 text-center text-sm text-white/70 cursor-pointer hover:underline"
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}
