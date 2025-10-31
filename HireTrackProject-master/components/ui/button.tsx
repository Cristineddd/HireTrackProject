"use client";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "outline" | "default";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", size = "md", className = "", children, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-all";
  const sizes: Record<string,string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2",
  };

  const variants: Record<string,string> = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    outline: "border-2 border-current hover:bg-opacity-10",
  };

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
