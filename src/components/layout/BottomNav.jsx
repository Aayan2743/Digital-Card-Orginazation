import { NavLink } from "react-router-dom";
import { Users } from "lucide-react";

export default function BottomNav() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t shadow z-50">
      <div className="flex justify-around py-2 text-xs">
        <NavLink to="/" className="flex flex-col items-center">
          🏠
          <span>Home</span>
        </NavLink>

        <NavLink to="/staff-cards" className="flex flex-col items-center">
          👥
          <span>Staff</span>
        </NavLink>

        <NavLink to="/transactions" className="flex flex-col items-center">
          💳
          <span>Transactions</span>
        </NavLink>

        <NavLink to="/settings" className="flex flex-col items-center">
          ⚙️
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
}
