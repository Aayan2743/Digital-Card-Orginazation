"use client";
import { useState } from "react";
import { Camera, User, Mail, Phone } from "lucide-react";
import UserLayout from "./layout/user/UserLayout";

export default function ScanContactUI() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // API call here
    // setForm({ name, email, phone });
  };

  return (
    <UserLayout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Scan Contact
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Scan a business card to auto-fill details
          </p>

          {/* Camera Button */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-xl p-6 cursor-pointer hover:bg-indigo-50 transition">
            <Camera className="w-10 h-10 text-indigo-500 mb-2" />
            <span className="text-indigo-600 font-semibold">
              Scan Business Card
            </span>
            <span className="text-xs text-gray-500">Camera will open</span>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleImage}
            />
          </label>

          {/* Form */}
          <div className="space-y-4 mt-6">
            <Input
              icon={<User />}
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Input
              icon={<Mail />}
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <Input
              icon={<Phone />}
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          {/* Save Button */}
          <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition">
            Save Contact
          </button>
        </div>
      </div>
    </UserLayout>
  );
}

/* Reusable Input */
function Input({ icon, ...props }) {
  return (
    <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
      <span className="text-gray-400 mr-3">{icon}</span>
      <input
        className="w-full bg-transparent outline-none text-sm"
        {...props}
      />
    </div>
  );
}
