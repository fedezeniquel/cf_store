import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-heading font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variantStyles = {
      // Primary: cf-wine (#A62447) con texto blanco Bold
      primary:
        "bg-cf-wine text-white font-bold hover:bg-[#8B1E3B] focus:ring-cf-wine active:scale-[0.98]",
      // Secondary: action-slate (#71749F) con texto blanco Bold >= 16px
      secondary:
        "bg-action-slate text-white font-bold text-base hover:bg-[#5E6185] focus:ring-action-slate active:scale-[0.98]",
      // Outline: borde silver con texto dark
      outline:
        "border border-silver bg-transparent text-dark hover:bg-zinc-100 focus:ring-dark",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs rounded",
      md: "px-4 py-2.5 text-sm rounded-md",
      lg: "px-6 py-3 text-base rounded-md",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

