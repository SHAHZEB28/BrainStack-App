import * as React from "react";
import { SVGProps } from "react";

// The props interface now includes an optional 'size' property.
interface PlusiconProps extends SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
}

// A map to translate the abstract size prop to a concrete pixel value.
const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

export const PlusIcon = ({ size = "md", ...props }: PlusiconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sizeMap[size]}
    height={sizeMap[size]}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1={12} y1={5} x2={12} y2={19} />
    <line x1={5} y1={12} x2={19} y2={12} />
  </svg>
);
