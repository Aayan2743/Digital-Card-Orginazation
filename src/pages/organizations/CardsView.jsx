
import { useState, useMemo } from "react";

import {
  ArrowLeft,
  Search,
  QrCode,
  ToggleLeft,
  ToggleRight,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { CardTemplatePremium } from "./CardTemplates"; // ✅ adjust path if needed

export default function CardsView() {
  const navigate = useNavigate();

  /* ---------------- ORGANIZATION DATA ---------------- */
  const organization = {
    name: "ABC Corporation",
    email: "contact@abccorp.com",
    phone: "+91 98765 43210",
    logo: "/logo.png",
    cover: "/cover.jpg",
  };

  /* ---------------- CARD DATA ---------------- */
  const [cards, setCards] = useState([
    {
      id: 1,
      card_no: "CARD-0001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      status: "Active",
      expiry: "2026-02-14",
    },
    {
      id: 2,
      card_no: "CARD-0002",
      name: "Amit Verma",
      email: "amit@gmail.com",
      status: "Inactive",
      expiry: "2026-02-14",
    },
    {
      id: 3,
      card_no: "CARD-0003",
      name: "Sneha Patel",
      email: "sneha@gmail.com",
      status: "Expired",
      expiry: "2025-01-31",
    },
  ]);

  /* ---------------- UI STATE ---------------- */
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);

  const ITEMS_PER_PAGE = 5;

  /* ---------------- FILTERING ---------------- */
  const filteredCards = useMemo(() => {
    return cards.filter((c) => {
      const matchSearch =
        c.card_no.toLowerCase().includes(search.toLowerCase()) ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "all" || c.status === status;

      return matchSearch && matchStatus;
    });
  }, [cards, search, status]);

  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  const paginatedCards = filteredCards.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  /* ---------------- TOGGLE STATUS ---------------- */
  const toggleStatus = (id) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === id && c.status !== "Expired"
          ? {
              ...c,
              status: c.status === "Active" ? "Inactive" : "Active",
            }
          : c
      )
    );
  };

  /* ---------------- MAP TABLE CARD → CARD TEMPLATE DATA ---------------- */
  const buildCardData = (card) => ({
    name: card.name,
    role: "Employee",
    phone: organization.phone,
    email: card.email,
    website: "https://example.com",

    company: organization.name,
    address: "Bangalore, India",

    services: ["Digital Business Card", "Networking", "Lead Management"],

    communities: [
      {
        name: "WhatsApp",
        image: "/community/whatsapp.png",
        url: "https://chat.whatsapp.com/xxxx",
      },
      {
        name: "Telegram",
        image: "/community/telegram.png",
        url: "https://t.me/xxxx",
      },
      {
        name: "Discord",
        image: "/community/discord.png",
        url: "https://discord.gg/xxxx",
      },
    ],
  });

  return (
    <AdminLayout>
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 mb-4 hover:text-indigo-600"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* ORG HEADER */}
      <div className="relative mb-24">
        <img
          src={organization.cover}
          className="w-full h-56 object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
        <div className="absolute left-6 -bottom-16 bg-white rounded-2xl shadow-xl p-5 flex gap-4">
          <img
            src={organization.logo}
            className="w-20 h-20 rounded-xl border"
          />
          <div>
            <h2 className="text-2xl font-bold">{organization.name}</h2>
            <p className="text-sm text-gray-500">{organization.email}</p>
            <p className="text-sm text-gray-500">{organization.phone}</p>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search card, name, email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="outline-none text-sm w-64"
          />
        </div>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="border rounded-xl px-4 py-2 text-sm bg-white shadow-sm"
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Card No</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Expiry</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedCards.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{c.card_no}</td>
                <td className="p-4">{c.name}</td>
                <td className="p-4">{c.email}</td>
                <td className="p-4 text-center">{c.expiry}</td>

                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : c.status === "Inactive"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      disabled={c.status === "Expired"}
                      onClick={() => toggleStatus(c.id)}
                      className="text-indigo-600 disabled:opacity-40"
                    >
                      {c.status === "Active" ? (
                        <ToggleRight size={20} />
                      ) : (
                        <ToggleLeft size={20} />
                      )}
                    </button>

                    <button
                      onClick={() => setSelectedCard(c)}
                      className="text-gray-600 hover:text-indigo-600"
                      title="View Card"
                    >
                      <QrCode size={18} />
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/organizations/cards/${c.id}/view`)
                      }
                      className="text-gray-600 hover:text-indigo-600"
                      title="Show Card"
                    >
                      <QrCode size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CARD PREVIEW MODAL */}
      {/* {selectedCard && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative max-w-md w-full">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute -top-4 -right-4 bg-white w-9 h-9 rounded-full shadow
                         flex items-center justify-center hover:bg-gray-100 z-50"
            >
              <X size={18} />
            </button>

            <CardTemplatePremium data={buildCardData(selectedCard)} />
          </div>
        </div>
      )} */}

      {selectedCard && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl w-[360px] p-6 relative">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold">Card Preview</h3>

              {/* FAKE QR */}
              <div className="w-40 h-40 mx-auto bg-gray-100 flex items-center justify-center rounded-xl">
                <QrCode size={80} className="text-gray-500" />
              </div>

              <div>
                <p className="font-medium">{selectedCard.card_no}</p>
                <p className="text-sm text-gray-500">{selectedCard.name}</p>
                <p className="text-sm text-gray-500">{selectedCard.email}</p>
              </div>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs ${
                  selectedCard.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : selectedCard.status === "Inactive"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {selectedCard.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
