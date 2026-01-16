import { useState } from "react";
import {
  CardTemplatePremium,
  CardTemplateMinimal,
  CardTemplateDark,
} from "./CardTemplates";

const sampleData = {
  name: "Kannan Natarajan",
  role: "Founder & CEO",
  bio: "Passionate UX / Branding Strategist with over 29+ years of experience. Advisor & Mentor for many tech startups to build a Global Brand & Scale the business.",
  phone: "+91 9845347204",
  email: "kannan@goodux.in",
  website: "https://www.goodux.in",
  company: "Good User Xperience Private Limited",
  address: "Bannerghatta Main Road, Bangalore - 560076",
  services: [
    "UX / CX Research & Strategy",
    "UX / UI for Digital Products",
    "UX / UI for Mobile & Web",
    "End-to-End Branding Solutions",
    "Scale & Growth using UX / CX",
    "UX Strategic Business Consulting",
    "Corporate Communication",
  ],
  communities: [
    {
      name: "WhatsApp",
      image: "/community/whatsapp.png",
      url: "https://chat.whatsapp.com/xxxxx",
    },
    {
      name: "Telegram",
      image: "/community/telegram.png",
      url: "https://t.me/xxxxx",
    },
    {
      name: "Discord",
      image: "/community/discord.png",
      url: "https://discord.gg/xxxxx",
    },
  ],
};

export default function CardPreview() {
  const [template, setTemplate] = useState("premium");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* SWITCH BUTTONS */}
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

      {/* CARD VIEW */}
      <div className="flex justify-center">
        {template === "premium" && <CardTemplatePremium data={sampleData} />}
        {template === "minimal" && <CardTemplateMinimal data={sampleData} />}
        {template === "dark" && <CardTemplateDark data={sampleData} />}
      </div>
    </div>
  );
}
