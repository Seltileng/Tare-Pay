import * as React from "react";
import { cn, getInitials, hashColor } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Avatar({ name, src, size = "md", className, ...props }: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);
  const initials = getInitials(name);
  const color = hashColor(name);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full font-semibold overflow-hidden select-none shrink-0 border border-border/40",
        sizeClasses[size],
        color.bg,
        color.text,
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
