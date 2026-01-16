import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AddOrganization from "./AddOrganization";
import { useNavigate } from "react-router-dom";
// import AddOrganizationDrawer from "./AddOrganizationDrawer";

export default function OrganizationList() {
  const [showDrawer, setShowDrawer] = useState(false);
  const navigate = useNavigate();

  // ✅ SAMPLE DATA (DEFAULT)
  const [organizations, setOrganizations] = useState([
    {
      id: 1,
      name: "ABC Corp",
      created_at: "2025-01-10",
      email: "abc@corp.com",
      phone: "9876543210",
      totalCards: 50,
      activeCards: 30,
      inactiveCards: 20,
    },
    {
      id: 2,
      name: "XYZ Solutions",
      created_at: "2025-01-12",
      email: "xyz@solutions.com",
      phone: "9123456789",
      totalCards: 20,
      activeCards: 10,
      inactiveCards: 10,
    },
  ]);

  const addOrganization = (org) => {
    setOrganizations((prev) => [...prev, org]);
    setShowDrawer(false);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Organizations</h2>

        <button
          onClick={() => setShowDrawer(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + Add Organization
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center">Total Cards</th>
              <th className="p-3 text-center">Active Cards</th>
              <th className="p-3 text-center">Inactive Cards</th>
              <th className="p-3 text-right">View</th>
            </tr>
          </thead>

          <tbody>
            {organizations.map((org, index) => (
              <tr key={org.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{org.name}</td>
                <td className="p-3">{org.created_at}</td>
                <td className="p-3">{org.email}</td>
                <td className="p-3">{org.phone}</td>
                <td className="p-3 text-center">{org.totalCards}</td>
                <td className="p-3 text-center text-green-600">
                  {org.activeCards}
                </td>
                <td className="p-3 text-center text-red-500">
                  {org.inactiveCards}
                </td>
                <td className="p-3 text-right">
                  {/* <button className="text-indigo-600 font-medium">View</button> */}

                  <button
                    onClick={() => navigate(`/organizations/${org.id}`)}
                    className="text-indigo-600 font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIGHT DRAWER */}
      {showDrawer && (
        <AddOrganization
          onClose={() => setShowDrawer(false)}
          onSave={addOrganization}
        />
      )}
    </AdminLayout>
  );
}
