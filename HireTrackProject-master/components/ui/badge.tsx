import React from "react";

export const Badge: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <span className={`inline-block ${className}`}>{children}</span>
);

export default Badge;
