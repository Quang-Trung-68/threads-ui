import { toast } from "sonner";

export const notifySooner = {
  success(message, options = {}) {
    toast.success(message, {
      duration: 3000,
      ...options,
    });
  },

  error(message, options = {}) {
    toast.error(message, {
      duration: 3500,
      ...options,
    });
  },

  info(message, options = {}) {
    toast(message, {
      duration: 2500,
      ...options,
    });
  },
  action(
    message,
    action, // { label, onClick }
    options = {},
  ) {
    toast(message, {
      duration: 2500,
      ...options,
      action: {
        label: action.label,
        onClick: action.onClick,
      },
    });
  },
  promise(promiseFn, options = {}) {
    return toast.promise(promiseFn, {
      loading: options.loading || "Loading...",
      success: options.success || "Success!",
      error: options.error || "Error to fetch!",

      duration: options.duration || 3000,
    });
  },
};
