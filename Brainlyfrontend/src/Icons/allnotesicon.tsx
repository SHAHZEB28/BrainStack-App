import * as React from "react";

// A new icon for the "All Notes" filter in the sidebar.
export function AllNotesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
      <line x1={8} y1={3} x2={8} y2={21} />
      <line x1={16} y1={3} x2={16} y2={21} />
      <line x1={3} y1={8} x2={21} y2={8} />
      <line x1={3} y1={16} x2={21} y2={16} />
    </svg>
  );
}
