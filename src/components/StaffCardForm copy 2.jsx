import { useState } from "react";
import AdminLayout from "./layout/AdminLayout";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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
              value={form.company_name}
              onChange={handleChange}
            />
            <Input
              name="company_email"
              label="Company Email"
              value={form.company_email}
              onChange={handleChange}
            />
          </Section>

          <Section title="Company Brochures (PDF)">
            <label className="md:col-span-2 cursor-pointer">
              <div className="border-2 border-dashed rounded-2xl p-6">
                Upload brochures (PDF)
              </div>
              <input
                type="file"
                multiple
                accept="application/pdf"
                className="hidden"
                onChange={handleBrochures}
              />
            </label>

            {form.brochures.length > 0 && (
              <div className="flex gap-4 mt-4 flex-wrap">
                {form.brochures.map((b, i) => (
                  <div key={i} className="w-24 text-xs text-center">
                    <div className="w-16 h-16 mx-auto rounded-lg bg-red-100 flex items-center justify-center">
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
                      className="border rounded w-full mt-1 px-2 py-1"
                    />
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section title="Community Images">
            <label className="md:col-span-2 cursor-pointer">
              <div className="border-2 border-dashed rounded-2xl p-6">
                Upload community images
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleCommunityImages}
              />
            </label>

            {form.community_images.length > 0 && (
              <div className="flex gap-4 mt-4 flex-wrap">
                {form.community_images.map((img, i) => (
                  <div key={i} className="w-24 text-xs text-center">
                    <img
                      src={URL.createObjectURL(img.file)}
                      className="w-16 h-16 rounded-lg object-cover mx-auto"
                    />
                    <input
                      type="text"
                      placeholder="Image name"
                      value={img.name}
                      onChange={(e) => {
                        const updated = [...form.community_images];
                        updated[i].name = e.target.value;
                        setForm({
                          ...form,
                          community_images: updated,
                        });
                      }}
                      className="border rounded w-full mt-1 px-2 py-1"
                    />
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section title="Basic Info">
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
          </Section>

          <Section title="Contact">
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

        {/* ================= MOBILE PREVIEW (FULL RESTORED) ================= */}
        <div className="flex justify-center">
          <div className="w-[360px] bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative h-28 bg-gray-800">
              {coverPreview && (
                <img
                  src={coverPreview}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute -bottom-10 left-5">
                <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                  {profilePreview && (
                    <img
                      src={profilePreview}
                      className="w-full h-full object-cover"
                    />
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
