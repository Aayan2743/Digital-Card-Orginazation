/* ===============================
   TEMPLATE 1 — PREMIUM (BEST)
   =============================== */
import {
  Phone,
  Mail,
  Globe,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  QrCode,
  FileDown,
} from "lucide-react";

export function CardTemplatePremium({ data = {} }) {
  const {
    name,
    role,
    phone,
    email,
    website,
    company,
    address,
    services = [],
    communities = [],
  } = data;

  return (
    <div className="card">
      {/* COVER */}
      <div className="relative h-36 bg-[#3a250f]">
        <div className="absolute -bottom-10 left-6">
          <div className="w-20 h-20 rounded-full bg-white p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-gray-300" />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="pt-12 px-6 pb-6">
        {/* NAME */}
        <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
        <p className="text-sm text-gray-500">{role}</p>

        {/* CONTACT */}
        <div className="mt-6 space-y-3">
          <div className="contact-row">
            <span className="contact-icon bg-green-500/10 text-green-600">
              <Phone size={16} />
            </span>
            <span className="contact-text">{phone}</span>
          </div>

          <div className="contact-row">
            <span className="contact-icon bg-blue-500/10 text-blue-600">
              <Mail size={16} />
            </span>
            <span className="contact-text">{email}</span>
          </div>

          <div className="contact-row">
            <span className="contact-icon bg-indigo-500/10 text-indigo-600">
              <Globe size={16} />
            </span>
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              {website}
            </a>
          </div>
        </div>

        {/* SOCIAL ICONS (IMAGE MATCH) */}
        <div className="flex gap-3 mt-5">
          <a className="social-modern bg-green-500/90">
            <Phone size={16} />
          </a>
          <a className="social-modern bg-[#0A66C2]">
            <Linkedin size={16} />
          </a>
          <a className="social-modern bg-[#1877F2]">
            <Facebook size={16} />
          </a>
          <a className="social-modern bg-gradient-to-tr from-[#E1306C] to-[#F77737]">
            <Instagram size={16} />
          </a>
          <a className="social-modern bg-[#FF0000]">
            <Youtube size={16} />
          </a>
        </div>
        <hr className="my-6" />
        {/* ACTION ROW */}
        <div className="flex items-center justify-between mt-7">
          {/* LEFT ACTIONS */}
          <div className="flex gap-3">
            <button className="action-icon bg-blue-600/90">
              <QrCode size={16} />
            </button>
            <button className="action-icon bg-red-600/90">
              <FileDown size={16} />
            </button>
          </div>

          {/* PRIMARY CTA */}
          <button className="action-primary">Add to Contacts</button>
        </div>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">
            Community
          </p>

          <div className="flex gap-5">
            {communities.map((c, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 rounded-full bg-white shadow-md 
                        flex items-center justify-center
                        hover:scale-105 transition"
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>

                <p className="mt-2 text-xs font-medium text-gray-700">
                  {c.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* COMPANY */}
        <hr className="my-6" />
        <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
          Company
        </p>
        <p className="text-sm font-medium text-gray-800">{company}</p>
        <p className="text-sm text-gray-600">{address}</p>

        {/* SERVICES */}
        <hr className="my-6" />
        <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
          Services
        </p>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {services.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-8 text-xs text-gray-400">
          <span>© Career Mentorz</span>
          <span>Powered by GOGO</span>
        </div>
      </div>
    </div>
  );
}

/* ===============================
   TEMPLATE 2 — MINIMAL / EXEC
   =============================== */

export function CardTemplateMinimal({ data = {} }) {
  const { name, role, phone, email, website, services = [] } = data;

  return (
    <div className="card p-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 
                        flex items-center justify-center text-xs text-gray-500 shadow-sm"
        >
          Photo
        </div>

        {/* Name & Role */}
        <div>
          <h2 className="text-[17px] font-semibold text-gray-900 leading-tight">
            {name}
          </h2>
          <p className="text-[13px] text-gray-500 mt-0.5">{role}</p>
        </div>
      </div>

      {/* CONTACT INFO */}
      <div className="mt-6 space-y-3">
        {phone && (
          <div className="contact-row">
            <span className="contact-icon bg-green-500/10 text-green-600">
              <Phone size={16} />
            </span>
            <span className="contact-text">{phone}</span>
          </div>
        )}

        {email && (
          <div className="contact-row">
            <span className="contact-icon bg-blue-500/10 text-blue-600">
              <Mail size={16} />
            </span>
            <span className="contact-text">{email}</span>
          </div>
        )}

        {website && (
          <div className="contact-row">
            <span className="contact-icon bg-indigo-500/10 text-indigo-600">
              <Globe size={16} />
            </span>
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              {website}
            </a>
          </div>
        )}
      </div>

      {/* DIVIDER */}
      <div className="h-px bg-gray-200 my-6" />

      {/* EXPERTISE */}
      {services.length > 0 && (
        <>
          <p className="section-title mb-3">Expertise</p>

          <div className="flex flex-wrap gap-2">
            {services.map((s, i) => (
              <span key={i} className="chip">
                {s}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ===============================
   TEMPLATE 3 — DARK / LUXURY
   =============================== */
export function CardTemplateDark({ data = {} }) {
  const { name, role, bio, phone, email, website } = data;

  return (
    <div className="max-w-md mx-auto bg-gray-900 text-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="p-6 text-center">
        <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4" />

        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-400">{role}</p>

        {bio && (
          <p className="text-sm text-gray-300 mt-4 leading-relaxed">{bio}</p>
        )}

        <div className="mt-6 space-y-2 text-sm text-gray-300">
          <p>{phone}</p>
          <p>{email}</p>
          <p className="text-blue-400">{website}</p>
        </div>

        <button className="mt-6 w-full py-3 rounded-xl bg-green-600 text-sm font-medium">
          Add to Contacts
        </button>
      </div>
    </div>
  );
}
