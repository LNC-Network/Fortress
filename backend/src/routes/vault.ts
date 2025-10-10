import express from "express";

const router = express.Router();

router.get("/vault", (_req, res) => {
	res.send("Vault endpoint");
});

export default router;
