export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Icon */}
        <div className="h-12 w-12 rounded-full border-4 border-white/30 border-t-white animate-spin" />

        {/* Optional text */}
        <p className="text-white text-sm tracking-wide">Loading...</p>
      </div>
    </div>
  );
}
