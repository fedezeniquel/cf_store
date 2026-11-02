import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "wine" | "gold" | "slate" | "forest";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "wine",
  className = "",
}) => {
  const variantStyles = {
    wine: "bg-cf-wine text-white",
    gold: "bg-gold text-dark",
    slate: "bg-action-slate text-white",
    forest: "bg-cf-forest text-white",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-heading font-bold uppercase tracking-wider ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

