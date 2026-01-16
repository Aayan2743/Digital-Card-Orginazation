import { useState } from "react";
import { X } from "lucide-react";

export default function AddOrganization({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const saveOrg = () => {
    if (!name || !email) {
      alert("Name and Email are required");
      return;
    }

    onSave({
      id: Date.now(),
      name,
      email,
      phone,
      cards: 0,
      status: "Active",
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Add Organization
            </h3>
            <p className="text-sm text-gray-500">
              Create a new organization profile
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center
                       hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization Name
            </label>
            <input
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5
                         focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="e.g. Career Mentorz"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5
                         focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="org@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5
                         focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-300 py-2.5
                       text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={saveOrg}
            className="flex-1 rounded-xl bg-indigo-600 py-2.5
                       text-white font-semibold hover:bg-indigo-700
                       transition shadow"
          >
            Save Organization
          </button>
        </div>
      </div>
    </>
  );
}
