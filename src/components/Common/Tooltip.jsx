import { forwardRef } from "react";
import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipTrigger,
} from "@/components/Common/ui/tooltip";

export const Tooltip = forwardRef(
  (
    {
      label,
      children,
      side = "bottom",
      align = "start",
      delay = 800,
      className = "",
      ...props
    },
    ref,
  ) => {
    // Determine controlled vs uncontrolled based on props.open presence
    const isControlled = props.open !== undefined;
    
    return (
      <TooltipRoot 
        delayDuration={delay} 
        open={isControlled ? props.open : undefined}
      >
        <TooltipTrigger asChild ref={ref} {...props}>
          {children}
        </TooltipTrigger>

        {label && (
          <TooltipContent
            side={side}
            align={align}
            sideOffset={4}
            className={[
              "rounded-none px-2 py-1 text-sm",
              "bg-gray-900 text-white",
              "border border-gray-700",
              className,
            ].join(" ")}
          >
            {label}
          </TooltipContent>
        )}
      </TooltipRoot>
    );
  },
);

Tooltip.displayName = "Tooltip";
