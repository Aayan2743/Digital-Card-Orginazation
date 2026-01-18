// import { useState } from "react";
// import {
//   CardTemplatePremium,
//   CardTemplateMinimal,
//   CardTemplateDark,
// } from "./CardTemplates";

// const sampleData = {
//   name: "Kannan Natarajan",
//   role: "Founder & CEO",
//   bio: "Passionate UX / Branding Strategist with over 29+ years of experience. Advisor & Mentor for many tech startups to build a Global Brand & Scale the business.",
//   phone: "+91 9845347204",
//   email: "kannan@goodux.in",
//   website: "https://www.goodux.in",
//   company: "Good User Xperience Private Limited",
//   address: "Bannerghatta Main Road, Bangalore - 560076",
//   services: [
//     "UX / CX Research & Strategy",
//     "UX / UI for Digital Products",
//     "UX / UI for Mobile & Web",
//     "End-to-End Branding Solutions",
//     "Scale & Growth using UX / CX",
//     "UX Strategic Business Consulting",
//     "Corporate Communication",
//   ],
//   communities: [
//     {
//       name: "WhatsApp",
//       image: "/community/whatsapp.png",
//       url: "https://chat.whatsapp.com/xxxxx",
//     },
//     {
//       name: "Telegram",
//       image: "/community/telegram.png",
//       url: "https://t.me/xxxxx",
//     },
//     {
//       name: "Discord",
//       image: "/community/discord.png",
//       url: "https://discord.gg/xxxxx",
//     },
//   ],
// };

// export default function CardPreview() {
//   const [template, setTemplate] = useState("premium");

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* SWITCH BUTTONS */}
//       <div className="flex gap-3 justify-center mb-6">
//         <button onClick={() => setTemplate("premium")} className="btn">
//           Premium
//         </button>
//         <button onClick={() => setTemplate("minimal")} className="btn">
//           Minimal
//         </button>
//         <button onClick={() => setTemplate("dark")} className="btn">
//           Dark
//         </button>
//       </div>

//       {/* CARD VIEW */}
//       <div className="flex justify-center">
//         {template === "premium" && <CardTemplatePremium data={sampleData} />}
//         {template === "minimal" && <CardTemplateMinimal data={sampleData} />}
//         {template === "dark" && <CardTemplateDark data={sampleData} />}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import {
  CardTemplatePremium,
  CardTemplateMinimal,
  CardTemplateDark,
} from "./CardTemplates";
import { X } from "lucide-react";

const sampleData = {
  name: "Kannan Natarajan",
  role: "Founder & CEO",
  bio: "Passionate UX / Branding Strategist with over 29+ years of experience.",
  phone: "+91 9845347204",
  email: "kannan@goodux.in",
  website: "https://www.goodux.in",
  company: "Good User Xperience Private Limited",
  address: "Bannerghatta Main Road, Bangalore - 560076",
  services: ["UX / CX Research & Strategy", "UX / UI for Digital Products"],
};

export default function CardPreview() {
  const [template, setTemplate] = useState("premium");
  const [showMeetingModal, setShowMeetingModal] = useState(false);

  /* UI STATE ONLY */
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  /* Mock available times (UI only) */
  const availableTimes = [
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TEMPLATE SWITCH */}
      <div className="flex gap-3 justify-center mb-6">
        <button onClick={() => setTemplate("premium")} className="btn">
          Premium
        </button>
        <button onClick={() => setTemplate("minimal")} className="btn">
          Minimal
        </button>
        <button onClick={() => setTemplate("dark")} className="btn">
          Dark
        </button>
      </div>

      {/* CARD */}
      <div className="flex flex-col items-center gap-4">
        {template === "premium" && <CardTemplatePremium data={sampleData} />}
        {template === "minimal" && <CardTemplateMinimal data={sampleData} />}
        {template === "dark" && <CardTemplateDark data={sampleData} />}

        {/* ✅ MEETING BUTTON (NEW) */}
        <button
          onClick={() => setShowMeetingModal(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm shadow"
        >
          Book a Meeting
        </button>
      </div>

      {/* ================= MEETING MODAL ================= */}
      {showMeetingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowMeetingModal(false)}
          />

          <div className="relative bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 z-10">
            <button
              onClick={() => setShowMeetingModal(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              <X />
            </button>

            <h3 className="text-lg font-bold mb-4">Request a Meeting</h3>

            {/* DATE */}
            <label className="text-sm font-medium">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            {/* TIME */}
            <label className="text-sm font-medium">Available Time Slots</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border p-2 rounded mb-6"
            >
              <option value="">Select time</option>
              {availableTimes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <button
              onClick={() => {
                setShowMeetingModal(false);
                alert("Meeting request sent (Pending approval)");
              }}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg"
            >
              Request Meeting
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
