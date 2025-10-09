import express from "express";
import https from "https";

import vaultRouter from "./routes/vault.ts";
import secretRouter from "./routes/secret.ts";
import policyRouter from "./routes/policy.ts";
import authRouter from "./routes/auth.ts";

const app = express();

app.use(express.json());

https.createServer(app).listen(443);

app.use("/api", vaultRouter);
app.use("/api", authRouter);
app.use("/api/vault", secretRouter);
app.use("/api/vault", policyRouter);

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || "localhost";

app.get("/api", (req, res) => {
  res.send({ message: "Welcome to backend!" });
});

const server = app.listen(PORT, () => {
  console.log(`Listening at http://${HOST}:${PORT}/api`);
});
server.on("error", console.error);
