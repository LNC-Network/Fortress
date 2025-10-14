import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new Error("JWT_SECRET is not defined in environment variables");
}

export interface AuthRequest extends Request {
	user?: string | jwt.JwtPayload;
}

export const verifyJWT = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "No token provided" });
		}

		const token = authHeader.split(" ")[1];

		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;

		next();
	} catch (err) {
		console.error("JWT verification failed:", err);
		return res.status(403).json({ message: "Invalid or expired token" });
	}
};
