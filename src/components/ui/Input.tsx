import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-heading font-medium text-dark mb-1"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full px-3 py-2 text-sm bg-base-white border border-silver rounded-md text-dark placeholder:text-standard focus:outline-none focus:border-cf-forest focus:ring-1 focus:ring-cf-forest disabled:opacity-50 ${
            error ? "border-cf-wine focus:border-cf-wine focus:ring-cf-wine" : ""
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-cf-wine">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

