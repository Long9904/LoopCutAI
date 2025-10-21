import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tangibleButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-[1.5px] border-border hover:bg-primary-hover",
        secondary:
          "bg-accent-blue text-foreground border-[1.5px] border-border hover:bg-accent-blue/80",
        outline:
          "bg-white border-[1.5px] border-border text-foreground hover:bg-muted",
        destructive:
          "bg-destructive text-destructive-foreground border-[1.5px] border-border hover:bg-destructive/90",
        ghost: "hover:bg-accent-blue hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-[8px] px-3",
        lg: "h-11 rounded-[12px] px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface TangibleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tangibleButtonVariants> {
  asChild?: boolean;
}

const TangibleButton = React.forwardRef<HTMLButtonElement, TangibleButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(tangibleButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
TangibleButton.displayName = "TangibleButton";

export { TangibleButton, tangibleButtonVariants };
