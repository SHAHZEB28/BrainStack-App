import { NextFunction, Request, Response } from "express";
import { JWT_PASSWORD } from "./config";
import jwt from "jsonwebtoken";

// This custom interface is still needed to let us access the userId property.
export interface AuthenticatedRequest extends Request {
  userId?: string;
}

// This middleware function is now confirmed to be robust and correctly typed.
export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(403).json({
      message: "Authentication token is required.",
    });
  } else {
    const token = authHeader;
    try {
      const decoded = jwt.verify(token, JWT_PASSWORD);
      if (decoded && typeof decoded === "object" && "id" in decoded) {
        // We cast the request to our custom type here to add the userId.
        (req as AuthenticatedRequest).userId = decoded.id;
        next();
      } else {
        res.status(403).json({
          message: "Invalid token.",
        });
      }
    } catch (e) {
      res.status(403).json({
        message: "Authentication failed.",
      });
    }
  }
};
