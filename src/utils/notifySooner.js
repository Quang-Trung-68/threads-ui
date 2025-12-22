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

  promise(promiseFn, options = {}) {
    return toast.promise(promiseFn, {
      loading: options.loading || "Loading...",
      success: options.success || "Success!",
      error: options.error || "Error to fetch!",

      duration: options.duration || 3000,
    });
  },
};
