import * as React from "react";
import { cn } from "@/lib/utils";

export interface TangibleInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const TangibleInput = React.forwardRef<HTMLInputElement, TangibleInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-[10px] border-[1.5px] border-border bg-white px-3 py-2 text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TangibleInput.displayName = "TangibleInput";

export { TangibleInput };
