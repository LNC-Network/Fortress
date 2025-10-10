import express from "express";

const router = express.Router();

router.get("/secret", (_req, res) => {
	res.send("Secret endpoint");
});

export default router;
