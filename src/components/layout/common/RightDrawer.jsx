export default function RightDrawer({ open, onClose, title, children }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full bg-white shadow-2xl
        w-full sm:w-[420px] md:w-[460px]
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-slate-50">
          <h3 className="text-base font-semibold text-slate-800">{title}</h3>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full
            hover:bg-slate-200 text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto h-[calc(100%-64px)]">
          {children}
        </div>
      </div>
    </>
  );
}
