import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("h-8 w-8 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
