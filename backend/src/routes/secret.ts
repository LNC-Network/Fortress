import express from "express";
import {
	createSecret,
	getSecretsByID,
	getSecretsNamesOnly,
} from "@/handlers/secret";

import { verifyJWT } from "@/middleware/jwtVerifier";

const router = express.Router();

router.post("/secrets", verifyJWT, createSecret); // plural for consistency
router.get("/secrets", verifyJWT, getSecretsNamesOnly);
router.get("/secrets/:id", verifyJWT, getSecretsByID);

export default router;
