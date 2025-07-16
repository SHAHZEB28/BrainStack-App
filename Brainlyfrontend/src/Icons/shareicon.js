import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// A map to translate the abstract size prop to a concrete pixel value.
const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
};
export const ShareIcon = ({ size = "md", ...props }) => (_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: sizeMap[size], height: sizeMap[size], viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", ...props, children: [_jsx("path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" }), _jsx("polyline", { points: "16 6 12 2 8 6" }), _jsx("line", { x1: 12, y1: 2, x2: 12, y2: 15 })] }));
