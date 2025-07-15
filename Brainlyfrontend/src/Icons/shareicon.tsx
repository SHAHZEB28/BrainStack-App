import * as React from "react";
import { SVGProps } from "react";

// The props interface now includes an optional 'size' property.
interface ShareiconProps extends SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
}

// A map to translate the abstract size prop to a concrete pixel value.
const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

export const ShareIcon = ({ size = "md", ...props }: ShareiconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sizeMap[size]}
    height={sizeMap[size]}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1={12} y1={2} x2={12} y2={15} />
  </svg>
);
