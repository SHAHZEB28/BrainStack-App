import * as React from "react";
import { SVGProps } from "react";

export const VideosIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
  </svg>
);
