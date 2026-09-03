import { cn } from "@/lib/utils";
import { getUserInitials } from "@/lib/user";

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-base",
  xl: "h-20 w-20 text-lg",
} as const;

interface UserInitialsProps {
  name?: string;
  username?: string;
  size?: keyof typeof sizeClasses;
  className?: string;
}

export function UserInitials({
  name,
  username,
  size = "md",
  className,
}: UserInitialsProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-gradient-to-br from-primary/20 to-primary/5 font-semibold text-primary",
        sizeClasses[size],
        className
      )}
      aria-hidden
    >
      {getUserInitials(name, username)}
    </div>
  );
}
