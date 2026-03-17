import type { ReactNode } from "react";

type ThemeTableProps = {
  headers: string[];
  rows: ReactNode[][];
  columnClassNames?: string[];
};

export default function ThemeTable({
  headers,
  rows,
  columnClassNames = [],
}: ThemeTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="min-w-[720px] w-full border-collapse text-sm">
        <thead className="bg-white/[0.04] text-left text-white/72">
          <tr>
            {headers.map((header, index) => (
              <th
                key={header}
                className={`border-b border-white/10 px-4 py-3 font-medium ${columnClassNames[index] ?? ""}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="align-top">
              {row.map((cell, cellIndex) => (
                <td
                  key={`row-${rowIndex}-cell-${cellIndex}`}
                  className={`px-4 py-4 text-white/78 ${columnClassNames[cellIndex] ?? ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
