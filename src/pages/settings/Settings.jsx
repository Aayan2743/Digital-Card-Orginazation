import { useEffect, useState, useRef } from "react";
import { Camera, ImageIcon } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import api from "../../api/axios";
import { successAlert, errorAlert } from "../../utils/alert";
import { useLoader } from "../../context/LoaderContext";
import { useAuth } from "../../context/AuthContext";

export default function Settings() {
  const hasFetched = useRef(false);

  const { updateBrand } = useAuth();
  /* ================= STATE ================= */
  const [brandName, setBrandName] = useState("");
  const [cover, setCover] = useState(null);
  const [logo, setLogo] = useState(null);

  const [coverFile, setCoverFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const { showLoader, hideLoader } = useLoader();

  const [permissions, setPermissions] = useState({
    templateChange: true,
    coverChange: true,
    customCommunityLogo: false,
  });

  const [loading, setLoading] = useState(false);

  /* ================= FETCH SETTINGS ================= */

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      showLoader();

      const { data } = await api.get("/settings-orginization");

      if (data?.data) {
        setBrandName(data.data.brand_name || "");
        setCover(data.data.cover_page || null);
        setLogo(data.data.logo || null);

        setPermissions({
          templateChange: !!data.data.template_change,
          coverChange: !!data.data.cover_change,
          customCommunityLogo: !!data.data.custom_community_logo,
        });
      }
    } catch (error) {
      errorAlert(
        "Failed",
        error.response?.data?.message || "Unable to load settings",
      );
    } finally {
      hideLoader();
    }
  };

  /* ================= SAVE SETTINGS ================= */

  const handleSave = async () => {
    // logo required only if no existing logo
    if (!logo && !logoFile) {
      errorAlert("Validation Error", "Logo is required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("brand_name", brandName);

      // ✅ ONLY append if File exists
      if (logoFile instanceof File) {
        formData.append("logo", logoFile);
      }

      if (coverFile instanceof File) {
        formData.append("cover_image", coverFile);
      }

      formData.append("template_change", permissions.templateChange ? 1 : 0);
      formData.append("cover_change", permissions.coverChange ? 1 : 0);
      formData.append(
        "custom_community_logo",
        permissions.customCommunityLogo ? 1 : 0,
      );

      const { data } = await api.post(
        "/organizations/brand-settings",
        formData,
      );

      setBrandName(data.data.brand_name);
      setCover(data.data.cover_page);
      setLogo(data.data.logo);

      updateBrand(data.data);

      successAlert("Success", "Brand settings updated successfully");

      hasFetched.current = false;
      fetchSettings();
    } catch (error) {
      console.error("UPLOAD ERROR:", error);

      errorAlert(
        "Save Failed",
        error.response?.data?.message ||
          error.message ||
          "Unable to save settings",
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePermission = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AdminLayout>
      {/* ================= HEADER ================= */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-800">Brand Settings</h1>
        <p className="text-slate-500 mt-1">
          Customize brand visuals & control staff permissions
        </p>
      </div>

      <div className="space-y-16">
        {/* ================= BRAND NAME ================= */}
        <GlassCard
          title="Brand Identity"
          subtitle="How your organization appears publicly"
        >
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="OneDesk Technologies"
            className="w-full max-w-md px-4 py-3 rounded-xl border
                       border-slate-300 bg-white/80
                       focus:ring-2 focus:ring-indigo-500
                       focus:outline-none"
          />
        </GlassCard>

        {/* ================= COVER IMAGE ================= */}
        <GlassCard
          title="Cover Image"
          subtitle="Large banner shown on all digital cards"
        >
          <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-200">
            {cover ? (
              <img
                src={cover}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <ImageIcon size={36} className="mb-2 opacity-50" />
                No cover image uploaded
              </div>
            )}

            <label className="absolute bottom-4 right-4 cursor-pointer">
              <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-xl shadow">
                <Camera size={16} />
                Change Cover
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setCover(URL.createObjectURL(file));
                  setCoverFile(file);
                }}
              />
            </label>
          </div>
        </GlassCard>

        {/* ================= LOGO ================= */}
        <GlassCard
          title="Organization Logo"
          subtitle="Shown on employee cards and profiles"
        >
          <div className="relative w-32 h-32 rounded-full bg-white shadow border overflow-hidden">
            {logo ? (
              <img
                src={logo}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="flex items-center justify-center h-full text-xs text-slate-400">
                No Logo
              </span>
            )}

            <label className="absolute bottom-0 right-0 cursor-pointer">
              <div className="bg-indigo-600 text-white p-2 rounded-full shadow">
                <Camera size={14} />
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  // optional: validate on frontend
                  if (!file.type.startsWith("image/")) {
                    errorAlert("Invalid file", "Please select an image file");
                    return;
                  }

                  setLogo(URL.createObjectURL(file)); // preview
                  setLogoFile(file); // actual upload file
                }}
              />
            </label>
          </div>
        </GlassCard>

        {/* ================= SAVE ================= */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-10 py-3 rounded-xl bg-indigo-600 text-white font-semibold
                       hover:bg-indigo-700 disabled:opacity-60 transition"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ================= UI HELPERS ================= */

function GlassCard({ title, subtitle, children }) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-8">
      <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 mb-6">{subtitle}</p>
      {children}
    </div>
  );
}
