import Swal from "sweetalert2";

export const successAlert = (title, text = "") => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#4f46e5", // indigo
  });
};

export const errorAlert = (title, text = "") => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#dc2626", // red
  });
};

export const warningAlert = (title, text = "") => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    confirmButtonColor: "#f59e0b", // amber
  });
};

export const infoAlert = (title, text = "") => {
  return Swal.fire({
    icon: "info",
    title,
    text,
    confirmButtonColor: "#2563eb", // blue
  });
};

export const confirmAlert = ({
  title = "Are you sure?",
  text = "This action cannot be undone",
  confirmText = "Yes, continue",
  cancelText = "Cancel",
}) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
  });
};
