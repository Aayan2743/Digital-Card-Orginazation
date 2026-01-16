// export default function DigitalCard() {
//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
//       <div className="w-full max-w-[420px] bg-white rounded-[24px] shadow-xl overflow-hidden">
//         {/* Header */}
//         <div className="relative h-[140px] bg-gradient-to-r from-amber-700 to-orange-500">
//           <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
//             <div className="w-[90px] h-[90px] rounded-full border-4 border-white bg-gray-200 shadow-lg flex items-center justify-center text-gray-500">
//               Photo
//             </div>
//           </div>
//         </div>

import DarkCard from "../../components/templates/DarkCard";
import SplitCard from "../../components/templates/SplitCard";
import WaveCard from "../../components/templates/WaveCard";

//         {/* Content */}
//         <div className="pt-14 px-6 pb-6 text-center">
//           {/* Name */}
//           <h2 className="text-xl font-semibold text-gray-900">Sujitha</h2>
//           <p className="text-sm text-gray-500">Manager – Business</p>

//           {/* Skills */}
//           <div className="mt-4 space-y-1 text-sm text-gray-700">
//             <p># Mentee Management</p>
//             <p># Community Administration</p>
//             <p># MBA (Data Science) – Pursuing</p>
//           </div>

//           {/* Contact */}
//           <div className="mt-6 space-y-3 text-sm text-gray-700 text-left">
//             <div className="flex gap-3">
//               <span>📞</span>
//               <span>+91 9686618261</span>
//             </div>
//             <div className="flex gap-3">
//               <span>✉️</span>
//               <span>sujitha30.official@gmail.com</span>
//             </div>
//             <div className="flex gap-3">
//               <span>🌐</span>
//               <span>www.careermentorz.com</span>
//             </div>
//           </div>

//           {/* Social */}
//           <div className="flex justify-center gap-4 mt-6 text-xl">
//             <span>🔵</span>
//             <span>🔗</span>
//             <span>📸</span>
//             <span>▶️</span>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 mt-6">
//             <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-medium">
//               Add Contact
//             </button>
//             <button className="flex-1 border border-gray-300 py-3 rounded-xl">
//               Save Card
//             </button>
//           </div>

//           {/* Company */}
//           <div className="mt-8 text-left">
//             <p className="text-xs text-gray-400 uppercase">Company</p>
//             <p className="font-medium text-sm text-gray-800 mt-1">
//               Career Mentorz (Unit of MustardCollective Pvt Ltd)
//             </p>
//             <p className="text-sm text-gray-600">
//               Clayworks Miniforest, JP Nagar 3rd Phase, Bangalore
//             </p>
//           </div>

//           {/* Services */}
//           <div className="mt-6 text-left">
//             <p className="text-xs text-gray-400 uppercase">Services</p>
//             <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
//               <li>Career Solution</li>
//               <li>Community Mentorship</li>
//               <li>Internships</li>
//               <li>Talent Management</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import WaveCard from "./components/templates/WaveCard";
// import SplitCard from "./components/templates/SplitCard";
// import DarkCard from "./components/templates/DarkCard";

export default function CardTemplate({ template, data }) {
  switch (template) {
    case "split":
      return <SplitCard data={data} />;
    case "dark":
      return <DarkCard data={data} />;
    default:
      return <WaveCard data={data} />;
  }
}
