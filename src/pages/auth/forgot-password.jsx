import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
// import api from "../../services/api";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      await api.post("/orginazation-forgot-password", { email });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      await api.post("/verify-otp", { email, otp });
      setStep(3);
    } catch (err) {
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await api.post("/reset-password", {
        email,
        otp,
        password,
        password_confirmation: confirmPassword,
      });

      navigate("/login");
    } catch (err) {
      setError("Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Forgot Password
        </h1>

        {error && (
          <div className="bg-red-500/20 text-white text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* STEP 1: EMAIL */}
        {step === 1 && (
          <>
            <label className="text-white text-sm mb-1 block">
              Registered Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full mt-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <label className="text-white text-sm mb-1 block">Enter OTP</label>
            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-indigo-500 text-center tracking-widest"
            />

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full mt-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === 3 && (
          <>
            <label className="text-white text-sm mb-1 block">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <label className="text-white text-sm mt-3 mb-1 block">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full mt-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        <p
          className="text-center text-white/80 text-sm mt-6 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}
