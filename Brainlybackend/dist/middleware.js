"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// This middleware function is now confirmed to be robust and correctly typed.
const userMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(403).json({
            message: "Authentication token is required.",
        });
    }
    else {
        const token = authHeader;
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
            if (decoded && typeof decoded === "object" && "id" in decoded) {
                // We cast the request to our custom type here to add the userId.
                req.userId = decoded.id;
                next();
            }
            else {
                res.status(403).json({
                    message: "Invalid token.",
                });
            }
        }
        catch (e) {
            res.status(403).json({
                message: "Authentication failed.",
            });
        }
    }
};
exports.userMiddleware = userMiddleware;
