import React from "react";

export const Table: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <table className="min-w-full">{children}</table>
);

export const TableHeader: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <thead className="bg-white">{children}</thead>
);

export const TableBody: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <tbody>{children}</tbody>
);

export const TableRow: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <tr className={`${className}`}>{children}</tr>
);

export const TableHead: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <th className={`py-3 px-4 text-left text-sm font-medium text-slate-700 ${className}`}>{children}</th>
);

export const TableCell: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <td className={`py-3 px-4 align-top text-sm ${className}`}>{children}</td>
);

export default Table;
