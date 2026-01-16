// export default function CardPlaceholder({ onAssign }) {
//   return (
//     <div
//       onClick={onAssign}
//       className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition"
//     >
//       <div className="w-12 h-12 rounded-full bg-gray-200 mb-2" />
//       <p className="text-sm font-medium text-gray-600">Unassigned Card</p>
//       <p className="text-xs text-gray-400">Click to assign</p>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";

export default function CardPlaceholder() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/add-staff-cards")}
      className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition"
    >
      <div className="w-12 h-12 rounded-full bg-gray-200 mb-2" />
      <p className="text-sm font-medium text-gray-600">Assign New Card</p>
    </div>
  );
}
