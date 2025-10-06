import express from "express";
import userRoutes from "./routes/locker.js";
import { closeDatabase } from "./database/dbops.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/vault", userRoutes);

app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});

if (process.env.NODE_ENV !== "test") {
  process.on("SIGINT", async () => {
    await closeDatabase();
    process.exit(0);
  });
}
