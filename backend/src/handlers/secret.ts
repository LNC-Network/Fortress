import type { Request, Response } from "express";
import { readSecretByID, readSecretNameOnly, writeSecret } from "@/lib/db";

export function createSecret(req: Request, res: Response) {
	try {
		const { key, value, description } = req.body;

		if (!key || !value) {
			return res.status(400).json({ message: "Key and value are required" });
		}

		writeSecret(key, value, description || ""); // ensure description is string

		return res.status(201).json({ message: "Secret added successfully" });
	} catch (error) {
		console.error("Error adding secret:", error);
		return res.status(500).json({ message: "Unexpected server error" });
	}
}

export function getSecretsNamesOnly(_req: Request, res: Response) {
	try {
		const data = readSecretNameOnly();
		return res.status(200).json(data);
	} catch (error) {
		console.error("Error fetching secrets:", error);
		return res.status(500).json({ message: "Failed to fetch secrets" });
	}
}

export function getSecretsByID(req: Request, res: Response) {
	try {
		const { id } = req.params;
		if (!id) return res.status(400).json({ message: "ID is required" });

		const data = readSecretByID(Number(id));
		if (!data) return res.status(404).json({ message: "Secret not found" });

		return res.status(200).json(data);
	} catch (error) {
		console.error("Error fetching secret by ID:", error);
		return res.status(500).json({ message: "Failed to fetch secret" });
	}
}
