import { useEffect } from "react";

export function useAutoResizeTextarea(ref, value, isOpen = false) {
  useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      setTimeout(() => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      }, 0);
    }
  }, [ref, value, isOpen]);
}
