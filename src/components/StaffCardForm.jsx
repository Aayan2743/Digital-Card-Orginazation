import { useState } from "react";
import AdminLayout from "./layout/AdminLayout";
import api from "../api/axios";

import { successAlert, errorAlert } from "../utils/alert";

export default function StaffCardForm() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    phone: "",
    email: "",
    website: "",
    company_name: "",
    company_email: "",
    services: [],
    profile_image: null,
    cover_image: null,

    brochures: [], // { file, name }
    community_images: [], // { file, name }

    socials: {},
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [serviceInput, setServiceInput] = useState("");

  /* ================= HANDLERS ================= */

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    if (type === "profile") {
      setProfilePreview(url);
      setForm({ ...form, profile_image: file });
    }

    if (type === "cover") {
      setCoverPreview(url);
      setForm({ ...form, cover_image: file });
    }
  };

  const handleBrochures = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      name: "",
    }));

    setForm({
      ...form,
      brochures: [...form.brochures, ...files],
    });
  };

  const handleCommunityImages = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      name: "",
    }));

    setForm({
      ...form,
      community_images: [...form.community_images, ...files],
    });
  };

  const handleServicesChange = (e) => {
    setServiceInput(e.target.value);
    setForm({
      ...form,
      services: e.target.value
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter(Boolean),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardData = {
      name: form.name,
      designation: form.designation,
      phone: form.phone,
      email: form.email,
      website: form.website,

      company: {
        name: form.company_name,
        email: form.company_email,
      },

      services: form.services,

      community_images: form.community_images.map((img) => ({
        name: img.name,
      })),

      brochures: form.brochures.map((b) => ({
        name: b.name,
      })),
    };

    const formData = new FormData();

    // CARD NUMBER
    formData.append("card_number", "CARD-" + Date.now());

    // FILES
    if (form.profile_image) {
      formData.append("profile_image", form.profile_image);
    }

    if (form.cover_image) {
      formData.append("cover_image", form.cover_image);
    }

    // COMMUNITY IMAGES FILES
    form.community_images.forEach((img, i) => {
      formData.append(`community_images[${i}][file]`, img.file);
      formData.append(`community_images[${i}][name]`, img.name);
    });

    // BROCHURE FILES
    form.brochures.forEach((b, i) => {
      formData.append(`brochures[${i}][file]`, b.file);
      formData.append(`brochures[${i}][name]`, b.name);
    });

    // JSON DATA
    formData.append("card_data", JSON.stringify(cardData));

    // const res = await api.post("/add-cards", formData);

    // alert(res.data);

    try {
      const res = await api.post("/add-cards", formData);

      successAlert("Success", "Staff card created successfully!");
    } catch (error) {
      const message =
        error.response?.data?.errors ||
        error.response?.data?.message ||
        "Something went wrong";

      errorAlert("Error", message);
    }

    // if (res.status === 200) {
    //   successAlert("Success", "Staff card created successfully!");
    //   // setForm({
    //   //   name: "",
    //   //   designation: "",
    //   //   phone: "",
    //   //   email: "",
    //   //   website: "",
    //   //   company_name: "",
    //   //   company_email: "",
    //   //   services: [],
    //   //   brochures: [],
    //   //   community_images: [],
    //   // });
    // }

    if (res.data.success) {
      successAlert("Success", "Staff card created successfully!");
    } else {
      errorAlert(
        "Error",
        res.data.errors || "Failed to create staff card. Try again.",
      );
    }

    console.log("Response:", res.data);

    console.table([...formData.entries()]);
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* ================= FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* HEADER */}
          <div className="px-8 py-6 border-b bg-gradient-to-r from-indigo-50 to-white">
            <h2 className="text-2xl font-semibold text-gray-800">
              Create Staff Card
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill staff details and instantly preview the digital card
            </p>
          </div>

          {/* BODY */}
          <div className="p-8 space-y-10">
            {/* IMAGES */}
            <FormSection title="Images" subtitle="Profile & cover visuals">
              <div className="md:col-span-2">
                <div className="relative w-full h-44 rounded-2xl border-2 border-dashed overflow-hidden bg-yellow-50">
                  {/* COVER IMAGE */}
                  <label className="absolute inset-0 cursor-pointer">
                    {coverPreview ? (
                      <img
                        src={coverPreview}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-sm text-gray-500">
                        Upload cover image
                      </div>
                    )}

                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, "cover")}
                    />
                  </label>

                  {/* PROFILE IMAGE OVERLAP */}
                  <label className="absolute -bottom-8 left-6 cursor-pointer">
                    <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center">
                      {profilePreview ? (
                        <img
                          src={profilePreview}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">Profile</span>
                      )}
                    </div>

                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, "profile")}
                    />
                  </label>
                </div>
              </div>
            </FormSection>

            {/* COMPANY */}
            <FormSection title="Company Details">
              <Input
                name="company_name"
                label="Company Name"
                value={form.company_name}
                onChange={handleChange}
              />
              <Input
                name="company_email"
                label="Company Email"
                value={form.company_email}
                onChange={handleChange}
              />
            </FormSection>

            {/* BROCHURES */}
            <FormSection title="Company Brochures">
              <UploadBox
                label="Upload brochures (PDF)"
                accept="application/pdf"
                multiple
                onChange={handleBrochures}
                icon="📄"
              />

              {form.brochures.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {form.brochures.map((b, i) => (
                    <div
                      key={i}
                      className="border rounded-2xl p-3 text-xs text-center hover:shadow-sm transition"
                    >
                      <div className="w-14 h-14 mx-auto rounded-xl bg-red-100 flex items-center justify-center text-xl">
                        📄
                      </div>
                      <input
                        type="text"
                        placeholder="Brochure name"
                        value={b.name}
                        onChange={(e) => {
                          const updated = [...form.brochures];
                          updated[i].name = e.target.value;
                          setForm({ ...form, brochures: updated });
                        }}
                        className="mt-2 w-full border rounded-lg px-2 py-1 text-xs"
                      />
                    </div>
                  ))}
                </div>
              )}
            </FormSection>

            {/* COMMUNITY */}
            <FormSection title="Community Images">
              <UploadBox
                label="Upload community images"
                accept="image/*"
                multiple
                onChange={handleCommunityImages}
                icon="🖼️"
              />

              {form.community_images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {form.community_images.map((img, i) => (
                    <div
                      key={i}
                      className="border rounded-2xl p-3 text-xs text-center"
                    >
                      <img
                        src={URL.createObjectURL(img.file)}
                        className="w-14 h-14 rounded-xl object-cover mx-auto"
                      />
                      <input
                        type="text"
                        placeholder="Image name"
                        value={img.name}
                        onChange={(e) => {
                          const updated = [...form.community_images];
                          updated[i].name = e.target.value;
                          setForm({ ...form, community_images: updated });
                        }}
                        className="mt-2 w-full border rounded-lg px-2 py-1 text-xs"
                      />
                    </div>
                  ))}
                </div>
              )}
            </FormSection>

            {/* BASIC */}
            <FormSection title="Basic Info">
              <Input
                name="name"
                label="Full Name"
                value={form.name}
                onChange={handleChange}
              />
              <Input
                name="designation"
                label="Designation"
                value={form.designation}
                onChange={handleChange}
              />
            </FormSection>

            {/* CONTACT */}
            <FormSection title="Contact">
              <Input
                name="phone"
                label="Phone"
                value={form.phone}
                onChange={handleChange}
              />
              <Input
                name="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
              />
              <Input
                name="website"
                label="Website"
                value={form.website}
                onChange={handleChange}
              />
            </FormSection>

            {/* SERVICES */}
            <FormSection title="Services">
              <Textarea
                label="Comma or new line separated"
                value={serviceInput}
                onChange={handleServicesChange}
              />
            </FormSection>
          </div>

          {/* FOOTER */}
          <div className="sticky bottom-0 bg-white border-t px-8 py-4">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition">
              Save & Assign Card
            </button>
          </div>
        </form>

        {/* ================= MOBILE PREVIEW (FULL RESTORED) ================= */}
        <div className="flex justify-center">
          <div className="w-[360px] bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* COVER + PROFILE (NEW STYLE) */}
            <div className="relative h-36 bg-yellow-100">
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              )}

              {/* PROFILE IMAGE OVERLAP */}
              <div className="absolute -bottom-10 left-6">
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-gray-400">
                      Profile
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-12 px-5 pb-4 space-y-4">
              <div>
                <h3 className="font-bold">{form.name}</h3>
                <p className="text-xs text-gray-500">{form.designation}</p>
              </div>

              <ContactRow icon="📞" value={form.phone} />
              <ContactRow icon="✉️" value={form.email} />
              <ContactRow icon="🌐" value={form.website} />

              {form.community_images.length > 0 && (
                <>
                  <Divider />
                  <SectionTitle title="COMMUNITY" />
                  <div className="flex gap-4">
                    {form.community_images.map((img, i) => (
                      <div key={i} className="text-xs text-center">
                        <CommunityIcon />
                        <div className="truncate w-14">{img.name || "App"}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {(form.company_name || form.company_email) && (
                <>
                  <Divider />
                  <SectionTitle title="COMPANY" />
                  <p className="text-sm">{form.company_name}</p>
                  <p className="text-xs text-gray-500">{form.company_email}</p>
                </>
              )}

              {form.services.length > 0 && (
                <>
                  <Divider />
                  <SectionTitle title="SERVICES" />
                  <ul className="list-disc list-inside text-sm">
                    {form.services.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </>
              )}

              {form.brochures.length > 0 && (
                <>
                  <Divider />
                  <SectionTitle title="BROCHURES" />
                  {form.brochures.map((b, i) => (
                    <div key={i} className="text-sm text-indigo-600">
                      📄 {b.name || `Brochure ${i + 1}`}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ================= HELPERS ================= */

function FormSection({ title, subtitle, children }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

function UploadBox({ label, icon, ...props }) {
  return (
    <label className="md:col-span-2 cursor-pointer">
      <div className="border-2 border-dashed rounded-2xl p-6 flex items-center gap-4 hover:border-indigo-500 hover:bg-indigo-50 transition">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-xl">
          {icon}
        </div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
      <input type="file" className="hidden" {...props} />
    </label>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-3">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-xs">{label}</label>
      <input
        {...props}
        className="border rounded-xl px-4 py-2 text-sm w-full"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="md:col-span-2">
      <label className="text-xs">{label}</label>
      <textarea
        {...props}
        rows="3"
        className="border rounded-xl px-4 py-2 text-sm w-full"
      />
    </div>
  );
}

function ContactRow({ icon, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 text-sm">
      <span>{icon}</span>
      <span className="truncate">{value}</span>
    </div>
  );
}

function ImageUpload({ label, preview, onChange, aspect = "square" }) {
  return (
    <label className="cursor-pointer">
      <div
        className={`border-2 border-dashed rounded-xl flex items-center justify-center ${
          aspect === "cover" ? "h-40" : "h-32"
        }`}
      >
        {preview ? (
          <img src={preview} className="w-full h-full object-cover" />
        ) : (
          label
        )}
      </div>
      <input type="file" className="hidden" onChange={onChange} />
    </label>
  );
}

function Divider() {
  return <div className="h-px bg-gray-200 my-3" />;
}

function SectionTitle({ title }) {
  return <div className="text-xs font-semibold text-gray-400">{title}</div>;
}

function CommunityIcon() {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
      💬
    </div>
  );
}
