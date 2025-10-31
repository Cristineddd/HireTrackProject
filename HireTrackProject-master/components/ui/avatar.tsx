import React from "react";

export const Avatar: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <div className={`rounded-full overflow-hidden ${className}`}>{children}</div>
);

export const AvatarFallback: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <div className={`flex items-center justify-center ${className}`}>{children}</div>
);

export default Avatar;
