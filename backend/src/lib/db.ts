import bcrypt from "bcrypt";
import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const ROOT_PASSWORD = process.env.ROOT_PASSWORD;
const ROOT_USERNAME = process.env.ROOT_USERNAME;

if (!ROOT_PASSWORD || !ROOT_USERNAME) {
	throw new Error("ROOT_USERNAME or ROOT_PASSWORD not set in .env");
}

let db: Database.Database;

async function initDatabase() {
	// Open DB with better-sqlite3 (synchronous)
	db = new Database("mydb.db");

	// Hash password correctly
	const hashedPassword = await bcrypt.hash(ROOT_PASSWORD!, 10);

	// Create table if not exists
	db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

	// Insert root user (ignore if already exists)
	const stmt = db.prepare(
		"INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)",
	);
	stmt.run(ROOT_USERNAME, hashedPassword);

	console.log("Database initialized with root user.");
	return db;
}

export { initDatabase, db };
