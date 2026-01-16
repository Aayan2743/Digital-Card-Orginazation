import { useState } from "react";
import { Camera, ImageIcon, Lock, Unlock } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";

export default function Settings() {
  /* ================= STATE ================= */
  const [cover, setCover] = useState(null);
  const [logo, setLogo] = useState(null);

  const [locks, setLocks] = useState({
    templateChange: false,
    coverChange: false,
    customCommunityLogo: false,
  });

  const toggleLock = (key) => {
    setLocks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AdminLayout>
      {/* PAGE HEADER */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-800">
          Brand Appearance & Access
        </h2>
        <p className="text-slate-500">
          Control branding visuals and what users are allowed to customize
        </p>
      </div>

      <div className="space-y-14">
        {/* ================= COVER IMAGE ================= */}
        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <div className="px-6 py-5 border-b">
            <h3 className="text-lg font-semibold">Cover Image</h3>
            <p className="text-sm text-slate-500">
              Large banner shown on all digital cards
            </p>
          </div>

          <div className="relative h-60 bg-slate-200">
            {cover ? (
              <img src={cover} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-sm">
                <ImageIcon size={30} className="mb-2 opacity-60" />
                No cover image uploaded
              </div>
            )}

            <label className="absolute right-6 bottom-6 cursor-pointer">
              <div
                className="flex items-center gap-2 bg-white/90 backdrop-blur
                           px-5 py-2.5 rounded-xl shadow-md
                           text-sm font-medium hover:bg-white"
              >
                <Camera size={16} />
                Change Cover
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setCover(URL.createObjectURL(e.target.files[0]))
                }
              />
            </label>
          </div>

          <div className="px-6 py-4 text-xs text-slate-500">
            Recommended size: <strong>1200 × 300</strong> · JPG or PNG
          </div>
        </div>

        {/* ================= ORGANIZATION LOGO ================= */}
        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <div className="px-6 py-5 border-b">
            <h3 className="text-lg font-semibold">Organization Logo</h3>
            <p className="text-sm text-slate-500">
              Displayed as avatar on cards and profiles
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 px-6 py-10">
            <div className="relative">
              <div
                className="w-36 h-36 rounded-full border-4 border-white
                           shadow-xl bg-slate-100 overflow-hidden
                           flex items-center justify-center"
              >
                {logo ? (
                  <img src={logo} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-xs text-slate-400">No Logo</span>
                )}
              </div>

              <label className="absolute -bottom-2 right-3 cursor-pointer">
                <div className="bg-indigo-600 text-white p-2 rounded-full shadow hover:bg-indigo-700">
                  <Camera size={14} />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setLogo(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </label>
            </div>

            <div className="flex-1">
              <h4 className="font-medium mb-1">
                Upload your organization logo
              </h4>
              <p className="text-sm text-slate-500 mb-5">
                Used across employee cards and branding areas
              </p>

              <label
                className="inline-flex items-center gap-2 cursor-pointer
                           px-6 py-3 rounded-xl bg-slate-900
                           text-white text-sm font-medium hover:bg-slate-800"
              >
                Upload Logo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setLogo(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </label>

              <p className="text-xs text-slate-500 mt-3">
                Recommended: <strong>200 × 200</strong> PNG or SVG
              </p>
            </div>
          </div>
        </div>

        {/* ================= ACCESS CONTROLLER ================= */}
        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <div className="px-6 py-5 border-b">
            <h3 className="text-lg font-semibold">Access Controller</h3>
            <p className="text-sm text-slate-500">
              Control what staff members are allowed to customize
            </p>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 text-left">Permission</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              <PermissionRow
                label="Change Templates"
                locked={locks.templateChange}
                onToggle={() => toggleLock("templateChange")}
              />

              <PermissionRow
                label="Change Cover Images"
                locked={locks.coverChange}
                onToggle={() => toggleLock("coverChange")}
              />

              <PermissionRow
                label="Add Custom Community Logos"
                locked={locks.customCommunityLogo}
                onToggle={() => toggleLock("customCommunityLogo")}
              />
            </tbody>
          </table>
        </div>

        {/* SAVE */}
        <button
          className="bg-indigo-600 text-white px-10 py-3
                     rounded-xl font-semibold shadow
                     hover:bg-indigo-700 transition"
        >
          Save Brand Settings
        </button>
      </div>
    </AdminLayout>
  );
}

/* ================= SMALL COMPONENT ================= */

function PermissionRow({ label, locked, onToggle }) {
  return (
    <tr className="border-t">
      <td className="p-4">{label}</td>
      <td className="p-4 text-center">
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
            ${
              locked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
            }`}
        >
          {locked ? <Lock size={12} /> : <Unlock size={12} />}
          {locked ? "Locked" : "Allowed"}
        </span>
      </td>
      <td className="p-4 text-right">
        <button
          onClick={onToggle}
          className={`px-4 py-1.5 rounded-xl text-xs font-medium
            ${
              locked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
            }`}
        >
          {locked ? "Unlock" : "Lock"}
        </button>
      </td>
    </tr>
  );
}
