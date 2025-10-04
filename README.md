# Fortress

A simple Vault-like secret manager built with **Node.js**, **Express**, and **SQLite**, with a **CLI tool** to interact with secrets from the terminal.

---

## 🏗️ Project Structure

```
Fortress/
├─ apps/
│  ├─ backend/       # Express + SQLite backend
│  └─ cli/           # Node CLI to interact with backend
│  └─ web/           # nextjs web app
├─ packages/         # Shared packages (optional)
├─ pnpm-workspace.yaml
└─ turbo.json        # Turborepo configuration
```
---

## ⚡ Features

- Store, retrieve, update, and delete secrets via API.
- CLI tool to interact with backend from terminal.
- Lightweight SQLite storage.
- Ready for future enhancements: encryption, authentication, and remote caching.

---

## 🛠️ Setup

### 1. Install dependencies

```bash
pnpm install
````

### 2. Backend setup

```bash
cd apps/backend
pnpm ts-node server.ts
```

* Server runs on `http://localhost:3001`
* Endpoints:

  * `GET /secrets` → List all secrets
  * `GET /secrets/:key` → Get secret by key
  * `POST /secrets` → Add/update secret `{ key, value }`
  * `DELETE /secrets/:key` → Delete a secret

### 3. CLI setup

```bash
cd apps/cli
pnpm ts-node src/index.ts <command>
```

* Commands:

  * `get <key>` → Retrieve a secret
  * `set <key> <value>` → Add or update a secret
  * `delete <key>` → Remove a secret

---

## 🧰 Packages Used

### Backend

* `express` – HTTP server
* `better-sqlite3` – SQLite database
* `dotenv` – Environment variable management
* `typescript` – Type safety (optional)

### CLI

* `commander` – CLI command parsing
* `axios` – HTTP requests to backend
* `chalk` – Colored terminal output
* `inquirer` – Interactive prompts
* `conf` – Local config storage

---

## 🚀 Run everything with Turborepo

From repo root:

```bash
pnpm run dev
```

* Runs **frontend, backend, and CLI** scripts if configured.
* Use `--filter <workspace>` to run a specific app:

```bash
pnpm --filter backend dev
pnpm --filter cli dev
```

---

## 📌 Next Steps / TODO

* Encrypt secrets at rest using AES or similar.
* Add authentication for API access (JWT or API keys).
* Connect CLI authentication with backend.
* Optionally add frontend dashboard to manage secrets.

---

