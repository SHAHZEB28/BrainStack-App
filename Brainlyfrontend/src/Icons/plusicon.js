import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// A map to translate the abstract size prop to a concrete pixel value.
const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
};
export const PlusIcon = ({ size = "md", ...props }) => (_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: sizeMap[size], height: sizeMap[size], viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round", ...props, children: [_jsx("line", { x1: 12, y1: 5, x2: 12, y2: 19 }), _jsx("line", { x1: 5, y1: 12, x2: 19, y2: 12 })] }));
