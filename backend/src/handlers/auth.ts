import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

type user = {
	username: string;
	password: string;
};
const users: user[] = [];

export async function register(req: Request, res: Response) {
	const { username, password } = req.body;
	if (!username || !password)
		return res.status(400).json({ message: "Missing fields" });

	const hashed = await bcrypt.hash(password, 10);
	users.push({ username, password: hashed });
	return res.json({ message: "User registered" });
}

export async function login(req: Request, res: Response) {
	const { username, password } = req.body;
	const user = users.find((u) => u.username === username);
	if (!user) return res.status(400).json({ message: "User not found" });

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) return res.status(400).json({ message: "Invalid credentials" });

	const token = jwt.sign({ username }, process.env.JWT_SECRET || "secret", {
		expiresIn: "1h",
	});
	return res.json({ token });
}
