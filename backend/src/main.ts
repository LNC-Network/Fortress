import https from "node:https";
import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import { initDatabase } from "./lib/db";
import authRouter from "./routes/auth";
import vaultRouter from "./routes/locker";
import policyRouter from "./routes/policy";
import secretRouter from "./routes/secret";

initDatabase();

const app = express();

app.use(express.json());

https.createServer(app).listen(443);

app.use("/api", vaultRouter);
app.use("/api", authRouter);
app.use("/api/vault", secretRouter);
app.use("/api/vault", policyRouter);

dotenv.config();

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || "localhost";

app.get("/api", (_req: Request, res: Response) => {
	res.send({ message: "Welcome to backend!" });
});

const server = app.listen(PORT, () => {
	console.log(`Listening at http://${HOST}:${PORT}/api`);
});
server.on("error", console.error);
