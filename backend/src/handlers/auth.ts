import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

interface User {
	id: number;
	username: string;
	password: string;
}

export async function register(req: Request, res: Response) {
	const { username, password } = req.body;
	if (!username || !password)
		return res.status(400).json({ message: "Missing fields" });

	// Check if user exists
	const existingUser = db
		.prepare("SELECT * FROM users WHERE username = ?")
		.get(username) as User | undefined;
	if (existingUser)
		return res.status(400).json({ message: "Username already exists" });

	const hashed = await bcrypt.hash(password, 10);
	const stmt = db.prepare(
		"INSERT INTO users(username, password) VALUES (?, ?)",
	);
	stmt.run(username, hashed);

	return res.status(201).json({ message: "User registered successfully" });
}

export async function login(req: Request, res: Response) {
	const { username, password } = req.body;
	if (!username || !password)
		return res.status(400).json({ message: "Missing fields" });

	const user = db
		.prepare("SELECT * FROM users WHERE username = ?")
		.get(username) as User | undefined;

	if (!user) return res.status(400).json({ message: "User not found" });

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) return res.status(401).json({ message: "Invalid credentials" });

	const JWT_SECRET = process.env.JWT_SECRET;
	if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

	const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
		expiresIn: "1h",
		algorithm: "HS512",
	});

	return res.json({ token });
}
