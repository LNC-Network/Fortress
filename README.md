Fortress — Open Source Secrets Manager

Fortress is an open-source alternative to HashiCorp Vault, built to provide secure, self-hosted secret management for developers and organizations.
It’s designed to be simple, extensible, and developer-first, offering APIs, UI, and integrations that make managing secrets easy and secure.


---

🌟 Overview

Fortress helps you store, manage, and access sensitive credentials like API keys, tokens, passwords, and environment variables — all through a modern, open architecture.

It ensures end-to-end encryption, fine-grained access control, and audit logging for full security and visibility.
Whether you’re a solo developer or managing infrastructure for an enterprise — Fortress adapts to your scale.


---

🔐 Core Features

Feature	Description

Secure Secret Storage	AES-256 encryption, per-secret versioning, and automatic key rotation.
Access Control (RBAC)	Role-based permission model for users, teams, and services.
Audit Logging	Detailed logs of every secret access, update, or deletion.
RESTful & WebSocket APIs	Simple integration with backend services, CI/CD, or external tools.
Multi-Environment Support	Manage secrets for dev, staging, and production separately.
User Management	Invite, assign roles, and manage permissions from the dashboard.
Web Dashboard	Clean, modern interface to view and organize secrets.
Pluggable Storage	Default PostgreSQL / SQLite, with support for external drivers.
Open API Schema	OpenAPI (Swagger) spec for easy SDK or client generation.



---

🧩 Tech Stack

Layer	Technology

Frontend	Next.js, TailwindCSS, TypeScript
Backend	Node.js, Express, TypeScript, Nx Monorepo
Database	PostgreSQL / SQLite
Auth	JWT + Refresh Tokens
Encryption	Node Crypto / OpenSSL
Deployment	Docker, Docker Compose
Testing	Jest, Supertest
Lint & Format	ESLint, Prettier



---

🏗️ Architecture

Fortress/
├── apps/
│   ├── web/          → Next.js dashboard
│   └── backend/      → Express API service
├── libs/
│   ├── crypto/       → Encryption helpers
│   ├── db/           → Database models and services
│   ├── auth/         → JWT & user management
│   └── common/       → Shared types and utilities
├── docs/             → Project documentation
├── scripts/          → Dev/Deploy scripts
├── nx.json
├── package.json
└── README.md


---

⚙️ Installation

Prerequisites

Node.js ≥ 18

npm or pnpm

PostgreSQL or SQLite

OpenSSL (for key generation)



---

1️⃣ Clone the Repository
```bash
git clone https://github.com/LNC-Network/fortress.git
cd fortress
```
2️⃣ Install Dependencies
```bash
npm install
```


---

🔒 Security

AES-256 encryption for secret values

Secure JWT authentication

Environment-based isolation

Role-based access control

Optional audit logging

Hash verification for data integrity


If you discover a security issue, do not open a public issue.
Instead, please email: security@lnc.network


---

🧠 Roadmap

[ ] CLI for secret management

[ ] Multi-tenant support

[ ] Plugin system for custom storage

[ ] Kubernetes Secret Sync

[ ] Integration with GitHub Actions

[ ] Encrypted Secret Sharing

[ ] Zero-trust access control



---

🤝 Contributing

We welcome open-source contributions!

Steps:

1. Fork the repo


2. Create a new branch

git checkout -b feature/my-feature


3. Commit and push


4. Open a Pull Request




---

🧭 Community

Join the LNC Network developer community!

💬 Discussions: GitHub Discussions

📧 Contact: jit.nathdeb@gmail.com

🛠️ Issues: GitHub Issues



---

📄 License

no licence till date.


---

💬 Acknowledgments

Special thanks to:

The LNC Network team for maintaining and building Fortress.

The open-source community for inspiring transparent security infrastructure.

HashiCorp Vault, for pioneering modern secret management.

