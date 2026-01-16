import { useState } from "react";
import AdminLayout from "./layout/AdminLayout";

export default function StaffCardForm({ onSubmit }) {
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
    brochure_pdf: null,
    community_images: [],
    socials: {},
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [serviceInput, setServiceInput] = useState("");

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (key, value) => {
    setForm({ ...form, socials: { ...form.socials, [key]: value } });
  };

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

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) setForm({ ...form, brochure_pdf: file });
  };

  const handleCommunityImages = (e) => {
    setForm({ ...form, community_images: Array.from(e.target.files) });
  };

  const handleServicesChange = (e) => {
    setServiceInput(e.target.value);
    const arr = e.target.value
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    setForm({ ...form, services: arr });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* ================= FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          <h2 className="text-xl font-bold">Create Staff Card</h2>

          <Section title="Images">
            <ImageUpload
              label="Profile Image"
              preview={profilePreview}
              onChange={(e) => handleImageChange(e, "profile")}
            />
            <ImageUpload
              label="Cover Image"
              preview={coverPreview}
              aspect="cover"
              onChange={(e) => handleImageChange(e, "cover")}
            />
          </Section>

          <Section title="Company Details">
            <Input
              name="company_name"
              label="Company Name"
              onChange={handleChange}
            />
            <Input
              name="company_email"
              label="Company Email"
              onChange={handleChange}
            />
          </Section>

          <Section title="Company Brochure (PDF)">
            <label className="md:col-span-2 cursor-pointer">
              <div className="border-2 border-dashed rounded-2xl p-6 flex items-center gap-4 hover:border-indigo-500 hover:bg-indigo-50 transition">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-xl">
                  📄
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {form.brochure_pdf
                      ? form.brochure_pdf.name
                      : "Upload PDF brochure"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Click to upload · PDF only · Max 5MB
                  </p>
                </div>

                {form.brochure_pdf && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Added
                  </span>
                )}
              </div>

              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handlePdfChange}
              />
            </label>
          </Section>

          <Section title="Community Images">
            <label className="md:col-span-2 cursor-pointer">
              <div className="border-2 border-dashed rounded-2xl p-6 hover:border-indigo-500 hover:bg-indigo-50 transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-xl">
                    🖼
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Upload community images
                    </p>
                    <p className="text-xs text-gray-500">
                      JPG / PNG · Multiple images allowed
                    </p>
                  </div>

                  {form.community_images.length > 0 && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {form.community_images.length} selected
                    </span>
                  )}
                </div>

                {/* PREVIEW STRIP */}
                {form.community_images.length > 0 && (
                  <div className="flex gap-3 mt-4">
                    {form.community_images.slice(0, 4).map((img, i) => (
                      <div
                        key={i}
                        className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden"
                      >
                        <img
                          src={URL.createObjectURL(img)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}

                    {form.community_images.length > 4 && (
                      <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-xs">
                        +{form.community_images.length - 4}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleCommunityImages}
              />
            </label>
          </Section>

          <Section title="Basic Info">
            <Input name="name" label="Full Name" onChange={handleChange} />
            <Input
              name="designation"
              label="Designation"
              onChange={handleChange}
            />
          </Section>

          <Section title="Contact">
            <Input name="phone" label="Phone" onChange={handleChange} />
            <Input
              name="email"
              label="Personal Email"
              onChange={handleChange}
            />
            <Input name="website" label="Website" onChange={handleChange} />
          </Section>

          <Section title="Social Links">
            <Input
              label="LinkedIn"
              onChange={(e) => handleSocialChange("linkedin", e.target.value)}
            />
            <Input
              label="Instagram"
              onChange={(e) => handleSocialChange("instagram", e.target.value)}
            />
            <Input
              label="Facebook"
              onChange={(e) => handleSocialChange("facebook", e.target.value)}
            />
            <Input
              label="YouTube"
              onChange={(e) => handleSocialChange("youtube", e.target.value)}
            />
          </Section>

          <Section title="Services">
            <Textarea
              label="Comma or new line separated"
              value={serviceInput}
              onChange={handleServicesChange}
            />
          </Section>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
            Save & Assign Card
          </button>
        </form>

        {/* ================= MOBILE CARD PREVIEW ================= */}
        <div className="flex justify-center">
          <div className="w-[360px] bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* COVER */}
            <div className="relative h-28 bg-gray-800">
              {coverPreview && (
                <img
                  src={coverPreview}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute -bottom-10 left-5">
                <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs">
                      Profile
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="pt-12 px-5 pb-4 space-y-4">
              <div>
                <h3 className="font-bold">{form.name || "Full Name"}</h3>
                <p className="text-xs text-gray-500">{form.designation}</p>
              </div>

              {/* CONTACT */}
              <ContactRow icon="📞" value={form.phone} />
              <ContactRow icon="✉️" value={form.email} />
              <ContactRow icon="🌐" value={form.website} />

              {/* SOCIAL ICONS */}
              <div className="flex gap-3 pt-2">
                {form.socials.linkedin && <Icon label="in" />}
                {form.socials.instagram && <Icon label="📸" />}
                {form.socials.facebook && <Icon label="f" />}
                {form.socials.youtube && <Icon label="▶️" />}
              </div>

              {/* ACTION */}
              <button className="w-full bg-green-500 text-white py-2 rounded-lg text-sm">
                Add to Contacts
              </button>

              {/* COMMUNITY */}
              {form.community_images.length > 0 && (
                <>
                  <Divider />
                  <SectionTitle title="COMMUNITY" />
                  <div className="flex gap-4">
                    {form.community_images.map((_, i) => (
                      <CommunityIcon key={i} />
                    ))}
                  </div>
                </>
              )}

              {/* COMPANY */}
              {(form.company_name || form.company_email) && (
                <>
                  <Divider />
                  <SectionTitle title="COMPANY" />
                  <p className="text-sm">{form.company_name}</p>
                  <p className="text-xs text-gray-500">{form.company_email}</p>
                </>
              )}

              {/* SERVICES */}
              {form.services.length > 0 && (
                <>
                  <Divider />
                  <SectionTitle title="SERVICES" />
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {form.services.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* BROCHURE */}
              {form.brochure_pdf && (
                <a
                  href={URL.createObjectURL(form.brochure_pdf)}
                  download
                  className="text-sm text-indigo-600"
                >
                  📄 Download Brochure
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ================= SMALL UI ================= */

function ContactRow({ icon, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 text-sm">
      <span>{icon}</span>
      <span className="truncate">{value}</span>
    </div>
  );
}

function Icon({ label }) {
  return (
    <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
      {label}
    </div>
  );
}

function SectionTitle({ title }) {
  return <div className="text-xs font-semibold text-gray-400">{title}</div>;
}

function Divider() {
  return <div className="h-px bg-gray-200 my-3" />;
}

function CommunityIcon() {
  return (
    <div className="flex flex-col items-center text-xs text-gray-500">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        💬
      </div>
      App
    </div>
  );
}

/* ================= FORM HELPERS ================= */

function Section({ title, children }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-3">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Input({ label, name, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs">{label}</label>
      <input
        name={name}
        onChange={onChange}
        className="border rounded-xl px-4 py-2 text-sm"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1 md:col-span-2">
      <label className="text-xs">{label}</label>
      <textarea
        rows="3"
        value={value}
        onChange={onChange}
        className="border rounded-xl px-4 py-2 text-sm"
      />
    </div>
  );
}

function ImageUpload({ label, preview, onChange, aspect = "square" }) {
  return (
    <label className="cursor-pointer">
      <div
        className={`w-full ${
          aspect === "cover" ? "h-40" : "h-32"
        } border-2 border-dashed rounded-xl flex items-center justify-center`}
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

function FileUpload({ accept, multiple, onChange }) {
  return (
    <input
      type="file"
      accept={accept}
      multiple={multiple}
      onChange={onChange}
    />
  );
}
