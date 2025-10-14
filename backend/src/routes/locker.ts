import express from "express";
import { createLocker, getLockers } from "@/handlers/locker";
import { verifyJWT } from "@/middleware/jwtVerifier";

const router = express.Router();

router.post("/vault", verifyJWT, createLocker);
router.get("/vault", verifyJWT, getLockers);

export default router;
