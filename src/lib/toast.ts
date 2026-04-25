import toast, { type ToastType } from "react-hot-toast";

export const handleToast = (text: string, type: ToastType) => {
  switch (type) {
    case "success":
      toast(text, {
        position: "top-center",
        style: { background: "#111827", color: "white" },
      });
      break;
    case "error":
      toast.error(text, {
        position: "top-center",
        style: { background: "#111827", color: "white" },
      });
      break;
    default:
      break;
  }
};
