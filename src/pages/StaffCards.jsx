import { useState } from "react";
import CardTabs from "../components/CardTabs";
import StaffCard from "../components/StaffCard";
import CardPlaceholder from "../components/CardPlaceholder";
import AdminLayout from "../components/layout/AdminLayout";

export default function StaffCards() {
  const [activeTab, setActiveTab] = useState("assigned");

  const cards = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    assigned: i < 42,
    employee:
      i < 42
        ? {
            name: `Staff ${i + 1}`,
            role: "Product Designer",
            location: "Los Angeles, CA",
            avatar: `https://i.pravatar.cc/150?img=${i + 5}`,
          }
        : null,
  }));

  const assigned = cards.filter((c) => c.assigned);
  const unassigned = cards.filter((c) => !c.assigned);

  return (
    <AdminLayout>
      <div className="p-6">
        <CardTabs
          active={activeTab}
          setActive={setActiveTab}
          counts={{
            assigned: assigned.length,
            unassigned: unassigned.length,
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activeTab === "assigned" &&
            assigned.map((card) => (
              <StaffCard key={card.id} employee={card.employee} />
            ))}

          {activeTab === "unassigned" &&
            unassigned.map((card) => (
              <CardPlaceholder
                key={card.id}
                onAssign={() => alert("Open Assign Drawer")}
              />
            ))}
        </div>
      </div>
    </AdminLayout>
  );
}
