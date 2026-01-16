import { useState } from "react";
import {
  ArrowLeft,
  Layers,
  Image,
  Palette,
  ShieldCheck,
  Crown,
} from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useNavigate } from "react-router-dom";

export default function OrganizationAccessSettings() {
  const navigate = useNavigate();

  /* ---------------- ORGANIZATION ---------------- */
  const org = {
    name: "ABC Corporation",
    email: "admin@abccorp.com",
    phone: "9876543210",
    logo: "https://via.placeholder.com/120",
    cover: "https://via.placeholder.com/1400x400",
  };

  /* ---------------- ACCESS STATE ---------------- */
  const [plan, setPlan] = useState("Pro");

  const [features, setFeatures] = useState({
    templates: true,
    communityLogos: false,
    customBranding: true,
    userTemplateCustomization: false,
  });

  const toggleFeature = (key) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveSettings = () => {
    const payload = {
      organization: org.name,
      plan,
      features,
    };

    console.log("SAVE TO API:", payload);
    alert("Organization access settings saved");
  };

  return (
    <AdminLayout>
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 mb-4 hover:text-indigo-600"
      >
        <ArrowLeft size={18} />
        Back to Organization
      </button>

      {/* HERO / ORG HEADER */}
      <div className="relative mb-24">
        <img src={org.cover} className="w-full h-56 object-cover rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />

        <div className="absolute left-6 -bottom-16 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4">
          <img
            src={org.logo}
            className="w-20 h-20 rounded-xl border object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{org.name}</h2>
            <p className="text-sm text-gray-500">{org.email}</p>
            <p className="text-sm text-gray-500">{org.phone}</p>
          </div>
        </div>
      </div>

      {/* PAGE TITLE */}
      <h3 className="text-xl font-semibold mb-6">Access & Feature Settings</h3>

      {/* FEATURE ACCESS */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-2xl font-semibold text-gray-900">
              Feature Access
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Enable or disable modules for this organization
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <FeatureCardPremium
            icon={<Layers size={22} />}
            title="Templates Module"
            desc="Access to card & page templates"
            enabled={features.templates}
            onToggle={() => toggleFeature("templates")}
          />

          <FeatureCardPremium
            icon={<Image size={22} />}
            title="Community Logos"
            desc="Use shared logos from community"
            enabled={features.communityLogos}
            onToggle={() => toggleFeature("communityLogos")}
          />

          <FeatureCardPremium
            icon={<Palette size={22} />}
            title="Custom Branding"
            desc="Upload logo, colors & brand assets"
            enabled={features.customBranding}
            onToggle={() => toggleFeature("customBranding")}
          />
        </div>
      </section>

      {/* USER PERMISSIONS */}
      <section className="mb-16">
        <div className="mb-6">
          <h4 className="text-2xl font-semibold text-gray-900">
            User Permissions
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            Control what organization users are allowed to do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCardPremium
            icon={<ShieldCheck size={22} />}
            title="Template Customization"
            desc="Allow users to customize templates"
            enabled={features.userTemplateCustomization}
            onToggle={() => toggleFeature("userTemplateCustomization")}
            important
          />
        </div>
      </section>

      {/* SAVE */}
      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg"
        >
          Save Settings
        </button>
      </div>
    </AdminLayout>
  );
}

/* ---------------- FEATURE TOGGLE ---------------- */
function FeatureToggle({ icon, title, desc, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-indigo-600">{icon}</div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>

      <button
        onClick={onToggle}
        className={`w-12 h-6 rounded-full flex items-center px-1 transition ${
          enabled ? "bg-indigo-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`w-4 h-4 bg-white rounded-full transition transform ${
            enabled ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}

function FeatureCardPremium({
  icon,
  title,
  desc,
  enabled,
  onToggle,
  important = false,
}) {
  return (
    <div
      className={`rounded-2xl border bg-white p-6 transition-all duration-300
      ${enabled ? "border-indigo-200 shadow-lg" : "border-gray-200 shadow-sm"}
      hover:shadow-xl`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* LEFT CONTENT */}
        <div className="flex gap-4">
          {/* ICON */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center
            ${
              enabled
                ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {icon}
          </div>

          {/* TEXT */}
          <div>
            <div className="flex items-center gap-2">
              <h5 className="text-base font-semibold text-gray-900">{title}</h5>

              {/* STATUS BADGE — MOVED HERE */}
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full
                ${
                  enabled
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {enabled ? "Enabled" : "Disabled"}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-1 max-w-xs">{desc}</p>

            {important && (
              <span className="inline-block mt-3 text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                Permission Control
              </span>
            )}
          </div>
        </div>

        {/* TOGGLE — NOW CLEAN & ALONE */}
        <button
          onClick={onToggle}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300
          focus:outline-none
          ${enabled ? "bg-indigo-600" : "bg-gray-300"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow
            transition-transform duration-300
            ${enabled ? "translate-x-6" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
