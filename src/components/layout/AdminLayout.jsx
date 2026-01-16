import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import Header from "./Header";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar (desktop only) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* CONTENT AREA */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-6 pb-20 lg:pb-6">{children}</main>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
}
