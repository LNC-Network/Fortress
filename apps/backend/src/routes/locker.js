import { Router } from "express";
import { initializeDatabase } from "../database/dbops";
import { createLocker, getLockerById } from "../utils/locker";
const router = Router();

initializeDatabase();

// Create a new locker
router.post("/locker", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Locker name required" });

  try {
    const newLocker = createLocker(name);
    res.json({ message: "Locker created", locker: newLocker });
  } catch (err) {
    console.error("Failed to create locker:", err);
    res.status(500).json({ error: "Failed to create locker" });
  }
});

router.get("/lockers/:id", (req, res) => {
  const locker = getLockerById(locker, req.params.id);
  if (!locker) return res.status(404).json({ error: "Locker not found" });
  res.json({ locker });
});

export default router;
