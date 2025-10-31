import React from "react";

export const Card: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <div className="bg-white shadow-sm rounded-md">{children}</div>
);

export const CardHeader: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <div className="px-4 py-3 border-b">{children}</div>
);

export const CardTitle: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

export const CardContent: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <div className="p-4">{children}</div>
);

export default Card;
