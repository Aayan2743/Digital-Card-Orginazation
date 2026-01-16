import { useState } from "react";
import CardTemplate from "./CardTemplate";
import CardEditor from "../../components/CardEditor";
import QRModal from "../../components/QRModal";
import TemplateSelector from "../../components/TemplateSelector";
import ThemeToggle from "../../components/ThemeToggle";
// import CardEditor from "./components/CardEditor";
// import QRModal from "./components/QRModal";
// import TemplateSelector from "./components/TemplateSelector";
// import ThemeToggle from "./components/ThemeToggle";

export default function CardsView1() {
  const [template, setTemplate] = useState("wave");
  const [dark, setDark] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const [profile, setProfile] = useState({
    name: "Sujitha",
    role: "Manager – Business",
    phone: "+91 9686618261",
    email: "sujitha30.official@gmail.com",
    website: "www.careermentorz.com",
    skills: [
      "Mentee Management",
      "Community Administration",
      "MBA (Data Science) – Pursuing",
    ],
  });

  return (
    <div className={dark ? "dark" : ""}>
      <div className="p-4 bg-gray-100 dark:bg-gray-950 min-h-screen">
        {/* TOP CONTROLS */}
        <div className="flex flex-wrap gap-2 mb-4">
          <TemplateSelector value={template} onChange={setTemplate} />
          <ThemeToggle dark={dark} setDark={setDark} />
          <button className="btn" onClick={() => setEdit(!edit)}>
            {edit ? "Preview" : "Edit"}
          </button>
          <button className="btn" onClick={() => setShowQR(true)}>
            QR
          </button>
        </div>

        {/* CONTENT */}
        {edit ? (
          <CardEditor profile={profile} setProfile={setProfile} />
        ) : (
          <CardTemplate template={template} data={profile} />
        )}

        <QRModal open={showQR} onClose={() => setShowQR(false)} />
      </div>
    </div>
  );
}
