import CardTabs from "../components/CardTabs";
import StaffCard from "../components/StaffCard";
import CardPlaceholder from "../components/CardPlaceholder";
import AdminLayout from "../components/layout/AdminLayout";
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function StaffCards() {
  const [activeTab, setActiveTab] = useState("assigned");

  // const cards = Array.from({ length: 100 }).map((_, i) => ({
  //   id: i,
  //   assigned: i < 42,
  //   employee:
  //     i < 42
  //       ? {
  //           name: `Staff ${i + 1}`,
  //           role: "Product Designer",
  //           location: "Los Angeles, CA",
  //           avatar: `https://i.pravatar.cc/150?img=${i + 5}`,
  //         }
  //       : null,
  // }));

  const [assigned, setAssigned] = useState([]);
  // const [unassignedCount, setUnassignedCount] = useState(0);
  const [remainingSlots, setRemainingSlots] = useState(0);
  // const assigned = cards.filter((c) => c.assigned);
  // const unassigned = cards.filter((c) => !c.assigned);

  useEffect(() => {
    api.get("/staff-cards").then((res) => {
      const data = res.data.data;
      setAssigned(data.assigned_cards);
      setRemainingSlots(data.remaining_slots);
    });
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <CardTabs
          active={activeTab}
          setActive={setActiveTab}
          counts={{
            assigned: assigned.length,
            unassigned: remainingSlots,
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activeTab === "assigned" &&
            assigned.map((card) => (
              <StaffCard key={card.id} employee={card.employee} />
            ))}

          {activeTab === "unassigned" &&
            Array.from({ length: remainingSlots }).map((_, index) => (
              <CardPlaceholder
                key={index}
                isAdd
                onAssign={() => navigate("/staff-cards/create")}
              />
            ))}
        </div>
      </div>
    </AdminLayout>
  );
}
