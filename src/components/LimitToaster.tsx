import { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

const MAX_TOAST_COUNT = 3;

export default function LimitToaster() {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((__, i) => i >= MAX_TOAST_COUNT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return <Toaster />;
}
