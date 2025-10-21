import * as React from "react";
import { cn } from "@/lib/utils";

const TangibleCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { color?: 'blue' | 'pink' | 'yellow' | 'green' | 'purple' | 'coral' | 'white' }
>(({ className, color = 'white', ...props }, ref) => {
  const colorClasses = {
    blue: 'bg-accent-blue',
    pink: 'bg-accent-pink',
    yellow: 'bg-accent-yellow',
    green: 'bg-accent-green',
    purple: 'bg-accent-purple',
    coral: 'bg-accent-coral',
    white: 'bg-white',
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[10px] border-[1.5px] border-border p-6 transition-all",
        colorClasses[color],
        className
      )}
      {...props}
    />
  );
});
TangibleCard.displayName = "TangibleCard";

const TangibleCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
TangibleCardHeader.displayName = "TangibleCardHeader";

const TangibleCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
TangibleCardTitle.displayName = "TangibleCardTitle";

const TangibleCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
TangibleCardDescription.displayName = "TangibleCardDescription";

const TangibleCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));
TangibleCardContent.displayName = "TangibleCardContent";

const TangibleCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-0", className)}
    {...props}
  />
));
TangibleCardFooter.displayName = "TangibleCardFooter";

export { TangibleCard, TangibleCardHeader, TangibleCardFooter, TangibleCardTitle, TangibleCardDescription, TangibleCardContent };
