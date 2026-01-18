import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { format, startOfWeek, addDays, addMonths, subMonths } from "date-fns";
import AdminLayout from "./layout/AdminLayout";

export default function MeetingCalendar() {
  /* ===================== STATE ===================== */
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 8));
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2, 1));
  const [view, setView] = useState("Week");
  const [activeMeeting, setActiveMeeting] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newMeeting, setNewMeeting] = useState({
    title: "",
    date: format(selectedDate, "yyyy-MM-dd"),
    time: "1PM",
    desc: "",
  });

  /* ===================== AUDIT LOG ===================== */
  const [activityLog, setActivityLog] = useState([]);

  /* ===================== SCREEN SIZE ===================== */
  useEffect(() => {
    const resize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ===================== RESPONSIVE DAYS ===================== */
  const visibleDays = screenWidth < 640 ? 1 : screenWidth < 1024 ? 3 : 6;

  /* ===================== WEEK LOGIC ===================== */
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const days = Array.from({ length: visibleDays }).map((_, i) =>
    addDays(weekStart, i),
  );

  const times = ["1PM", "2PM", "3PM", "4PM", "5PM"];
  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");

  /* ===================== MEETINGS (STATE) ===================== */
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      date: "2025-03-04",
      time: "1PM",
      title: "Meeting with Angel Sipron",
      desc: "Discuss project updates",
      status: "pending", // pending | confirmed
    },
    {
      id: 2,
      date: "2025-03-05",
      time: "3PM",
      title: "Pick my child from school",
      desc: "Personal reminder",
      status: "confirmed",
    },
  ]);

  /* ===================== SINGLE SOURCE OF TRUTH ===================== */
  const meetingsByDate = meetings.reduce((acc, m) => {
    if (!acc[m.date]) acc[m.date] = [];
    acc[m.date].push(m);
    return acc;
  }, {});

  const saveAppointment = () => {
    if (!newMeeting.title) return;

    setMeetings((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newMeeting,
        status: "pending",
      },
    ]);

    setActivityLog((prev) => [
      ...prev,
      {
        action: "CREATED",
        date: new Date().toISOString(),
        title: newMeeting.title,
      },
    ]);

    setShowCreateModal(false);
  };

  /* ===================== GRID BEHAVIOR ===================== */
  const isLargeScreen = screenWidth >= 1536;

  const gridStyle = isLargeScreen
    ? { gridTemplateColumns: `80px repeat(${days.length}, 1fr)` }
    : {
        gridTemplateColumns: `80px repeat(${days.length}, 220px)`,
        minWidth: `${80 + days.length * 220}px`,
      };

  /* ===================== HELPERS ===================== */
  const confirmMeeting = () => {
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === activeMeeting.id ? { ...m, status: "confirmed" } : m,
      ),
    );

    setActivityLog((prev) => [
      ...prev,
      {
        meetingId: activeMeeting.id,
        action: "CONFIRMED",
        date: new Date().toISOString(),
      },
    ]);

    setActiveMeeting((prev) => ({ ...prev, status: "confirmed" }));
  };

  const deleteMeeting = () => {
    setMeetings((prev) => prev.filter((m) => m.id !== activeMeeting.id));

    setActivityLog((prev) => [
      ...prev,
      {
        meetingId: activeMeeting.id,
        action: "DELETED",
        date: new Date().toISOString(),
      },
    ]);

    setActiveMeeting(null);
  };

  const getMeetingStyle = (status) =>
    status === "confirmed"
      ? "bg-green-100 border-green-500"
      : "bg-yellow-100 border-yellow-500";

  const goPrev = () => {
    setSelectedDate((prev) =>
      view === "Week" ? addDays(prev, -visibleDays) : addDays(prev, -1),
    );
  };

  const goNext = () => {
    setSelectedDate((prev) =>
      view === "Week" ? addDays(prev, visibleDays) : addDays(prev, 1),
    );
  };

  /* ===================== RENDER ===================== */
  return (
    <AdminLayout>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* ===================== SIDEBAR ===================== */}
        <aside
          className={`fixed md:static z-40 top-0 left-0 h-full w-72 bg-white border-r p-4
          transform transition-transform duration-300
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
        >
          <button
            onClick={() => setShowSidebar(false)}
            className="md:hidden mb-3 text-sm text-gray-500"
          >
            Close
          </button>

          <div className="border rounded-lg p-3 mb-6">
            <p className="font-semibold">All Calendar</p>
            <p className="text-xs text-gray-500">Personal, Teams</p>
          </div>

          {/* MINI CALENDAR */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">
                {format(currentMonth, "MMMM yyyy")}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 text-xs text-center gap-1">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <span key={d}>{d}</span>
              ))}

              {Array.from({ length: 31 }).map((_, i) => {
                const d = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  i + 1,
                );

                const isSelected = format(d, "yyyy-MM-dd") === selectedDateStr;

                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDate(d)}
                    className={`p-2 rounded-full cursor-pointer
                      ${
                        isSelected
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ===================== MAIN ===================== */}
        <main className="flex-1 flex flex-col">
          {/* HEADER */}
          <div className="flex justify-between items-center px-4 md:px-6 py-4 border-b bg-white">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(true)}
                className="md:hidden text-xl"
              >
                ☰
              </button>
              <h2 className="text-xl font-bold">Calendar </h2>
            </div>

            <button
              onClick={() => {
                setNewMeeting({
                  title: "",
                  date: format(selectedDate, "yyyy-MM-dd"),
                  time: "1PM",
                  desc: "",
                });
                setShowCreateModal(true);
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              + New Appointment
            </button>
          </div>

          {/* VIEW SWITCH */}
          <div className="flex justify-between px-4 md:px-6 py-3 border-b bg-white">
            <h3 className="font-semibold">
              {format(selectedDate, "MMMM yyyy")}
            </h3>

            <div className="flex gap-2">
              {["Day", "Week", "Month"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1 rounded-md text-sm
                    ${
                      view === v
                        ? "bg-indigo-600 text-white"
                        : "border hover:bg-gray-100"
                    }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* ================= MOBILE / TABLET NAV ================= */}
          {screenWidth < 1024 && (
            <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
              <button
                onClick={goPrev}
                className="flex items-center gap-1 text-sm text-gray-600"
              >
                <ChevronLeft size={16} />
                Prev
              </button>

              <span className="text-sm font-medium">
                {view === "Week"
                  ? `${format(days[0], "MMM d")} - ${format(
                      days[days.length - 1],
                      "MMM d",
                    )}`
                  : format(selectedDate, "MMM d, yyyy")}
              </span>

              <button
                onClick={goNext}
                className="flex items-center gap-1 text-sm text-gray-600"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* ===================== WEEK VIEW ===================== */}
          {view === "Week" && (
            <div className="flex-1 overflow-hidden bg-white flex justify-center">
              <div className="w-full max-w-[1600px] overflow-auto">
                <div className="grid border rounded-lg" style={gridStyle}>
                  <div />
                  {days.map((d) => (
                    <div
                      key={d}
                      className="text-center py-2 border-b font-medium"
                    >
                      {format(d, "MMM d")}
                    </div>
                  ))}

                  {times.map((time) => (
                    <React.Fragment key={time}>
                      <div className="border-r text-xs text-right pr-2 py-10 text-gray-500">
                        {time}
                      </div>

                      {days.map((day) => {
                        const dayMeetings =
                          meetingsByDate[format(day, "yyyy-MM-dd")] || [];
                        const meeting = dayMeetings.find(
                          (m) => m.time === time,
                        );

                        return (
                          <div
                            key={day + time}
                            className="border h-24 relative"
                          >
                            {meeting && (
                              <div
                                onClick={() => setActiveMeeting(meeting)}
                                className={`absolute inset-2 p-2 rounded-lg border-l-4 cursor-pointer ${getMeetingStyle(meeting.status)}`}
                              >
                                <p className="font-semibold text-sm">
                                  {meeting.time}
                                </p>
                                <p className="text-xs">{meeting.title}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================== DAY VIEW ===================== */}
          {view === "Day" && (
            <div className="p-4 space-y-4">
              {(meetingsByDate[selectedDateStr] || []).length === 0 && (
                <p className="text-gray-400">No meetings scheduled</p>
              )}

              {(meetingsByDate[selectedDateStr] || []).map((m) => (
                <div
                  key={m.id}
                  onClick={() => setActiveMeeting(m)}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer ${getMeetingStyle(m.status)}`}
                >
                  <p className="font-semibold">
                    {m.time} — {m.title}
                  </p>
                  <p className="text-sm">{m.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* ===================== MONTH VIEW ===================== */}
          {view === "Month" && (
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {Array.from({ length: 31 }).map((_, i) => {
                  const d = new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    i + 1,
                  );
                  const ds = format(d, "yyyy-MM-dd");
                  const dayMeetings = meetingsByDate[ds] || [];

                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedDate(d)}
                      className="min-h-[90px] p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <div className="text-xs font-semibold">{i + 1}</div>

                      {dayMeetings.map((m) => (
                        <div
                          key={m.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMeeting(m);
                          }}
                          className={`mt-1 text-xs px-2 py-1 rounded ${getMeetingStyle(m.status)}`}
                        >
                          {m.time} {m.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>

        {/* ===================== CENTER MODAL ===================== */}
        {activeMeeting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setActiveMeeting(null)}
            />

            <div className="relative bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 z-10">
              <button
                onClick={() => setActiveMeeting(null)}
                className="absolute top-3 right-3 text-gray-500"
              >
                <X />
              </button>

              <span
                className={`inline-block text-xs px-2 py-1 rounded mb-3
                  ${
                    activeMeeting.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {activeMeeting.status.toUpperCase()}
              </span>

              <h3 className="text-lg font-bold mb-2">{activeMeeting.title}</h3>

              <p className="text-sm text-gray-500 mb-4">
                {activeMeeting.date} • {activeMeeting.time}
              </p>

              <p className="text-sm mb-4">{activeMeeting.desc}</p>

              {activeMeeting.status === "pending" && (
                <button
                  onClick={confirmMeeting}
                  className="w-full bg-green-600 text-white py-2 rounded mb-2"
                >
                  Confirm Meeting
                </button>
              )}

              <button
                onClick={deleteMeeting}
                className="w-full bg-red-600 text-white py-2 rounded"
              >
                Delete Meeting
              </button>
            </div>
          </div>
        )}

        {/* New Appointment */}

        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowCreateModal(false)}
            />

            <div className="relative bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 z-10">
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-3 right-3 text-gray-500"
              >
                <X />
              </button>

              <h3 className="text-lg font-bold mb-4">New Appointment</h3>

              <input
                type="text"
                placeholder="Title"
                value={newMeeting.title}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, title: e.target.value })
                }
                className="w-full border p-2 rounded mb-3"
              />

              <input
                type="date"
                value={newMeeting.date}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, date: e.target.value })
                }
                className="w-full border p-2 rounded mb-3"
              />

              <select
                value={newMeeting.time}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, time: e.target.value })
                }
                className="w-full border p-2 rounded mb-3"
              >
                {times.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <textarea
                placeholder="Description"
                value={newMeeting.desc}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, desc: e.target.value })
                }
                className="w-full border p-2 rounded mb-4"
              />

              <button
                onClick={saveAppointment}
                className="w-full bg-indigo-600 text-white py-2 rounded"
              >
                Save Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
