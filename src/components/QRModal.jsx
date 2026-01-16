import QRCode from "react-qr-code";

export default function QRModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl">
        <QRCode value="https://www.careermentorz.com" />
        <button className="btn w-full mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
