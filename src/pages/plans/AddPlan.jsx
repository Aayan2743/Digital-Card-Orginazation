import AdminLayout from "../../components/layout/AdminLayout";

export default function AddPlan() {
  return (
    <AdminLayout>
      <div className="bg-white p-4 rounded shadow max-w-xl">
        <h2 className="text-xl font-bold mb-4">Add Plan</h2>

        <input className="w-full border p-2 mb-3" placeholder="Plan Name" />
        <input
          className="w-full border p-2 mb-3"
          placeholder="Users / Cards Limit"
        />
        <input className="w-full border p-2 mb-3" placeholder="Price" />
        <input
          className="w-full border p-2 mb-3"
          placeholder="Duration (days)"
        />
        <input type="file" className="w-full border p-2 mb-3" />

        <button className="bg-slate-900 text-white px-4 py-2 rounded">
          Save Plan
        </button>
      </div>
    </AdminLayout>
  );
}
