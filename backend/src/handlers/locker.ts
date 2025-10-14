import type { Request, Response } from "express";
import { insertLocker, readLockers } from "@/lib/db";

export async function createLocker(req: Request, res: Response) {
	try {
		const { locker_name, locker_code } = req.body;

		if (!locker_name || !locker_code) {
			return res
				.status(400)
				.json({ message: "locker_name and locker_code are required" });
		}

		insertLocker(locker_name, locker_code);

		res.status(201).json({ message: "Locker created successfully" });
	} catch (error) {
		console.error("Error creating locker:", error);
		res.status(500).json({ message: "Unexpected server error" });
	}
}

export function getLockers(_req: Request, res: Response) {
	try {
		const data = readLockers();
		res.status(200).json(data);
	} catch (error) {
		console.error("Error fetching lockers:", error);
		res.status(500).json({ message: "Failed to fetch lockers" });
	}
}
