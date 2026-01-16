export default function WaveCard({ data = {} }) {
  const {
    name,
    role,
    skills = [],
    phone,
    email,
    website,
    company,
    address,
    companyPhone,
    companyEmail,
    services = [],
  } = data;

  return (
    <div className="card">
      {/* COVER */}
      <div className="relative h-36 bg-[#3b2412]">
        <div className="absolute -bottom-10 left-6">
          <div className="w-20 h-20 rounded-full bg-white p-[3px] shadow-lg">
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-medium">
              Photo
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 px-6 pb-6">
        <h2 className="text-[18px] font-semibold text-gray-900">{name}</h2>
        <p className="text-[13px] text-gray-500">{role}</p>

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="mt-4 space-y-1 text-[13px] text-gray-700">
            {skills.map((skill, i) => (
              <p key={i}># {skill}</p>
            ))}
          </div>
        )}

        {/* CONTACT */}
        <div className="mt-6 space-y-3 text-[13px] text-gray-700">
          {phone && <p>📞 {phone}</p>}
          {email && <p>✉️ {email}</p>}
          {website && <p className="text-blue-600">{website}</p>}
        </div>

        {/* COMPANY */}
        {company && (
          <>
            <hr className="my-6" />
            <p className="text-[11px] uppercase text-gray-400 mb-1">Company</p>
            <p className="text-[13px] font-medium">{company}</p>
            <p className="text-[13px] text-gray-600">{address}</p>

            <div className="flex justify-between text-[13px] text-gray-600 mt-3">
              <span>{companyPhone}</span>
              <span>{companyEmail}</span>
            </div>
          </>
        )}

        {/* SERVICES */}
        {services.length > 0 && (
          <>
            <hr className="my-6" />
            <p className="text-[11px] uppercase text-gray-400 mb-2">Services</p>
            <ul className="list-disc list-inside text-[13px] text-gray-700 space-y-1">
              {services.map((service, i) => (
                <li key={i}>{service}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
