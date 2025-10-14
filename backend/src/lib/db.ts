import bcrypt from "bcrypt";
import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const ROOT_PASSWORD = process.env.ROOT_PASSWORD;
const ROOT_USERNAME = process.env.ROOT_USERNAME;

if (!ROOT_PASSWORD || !ROOT_USERNAME) {
	throw new Error(
		"ROOT_PASSWORD or ROOT_USERNAME not configured in environment",
	);
}

let db: Database.Database;

async function initDatabase() {
	// Open DB with better-sqlite3 (synchronous)
	db = new Database("mydb.db");

	// Hash password correctly
	const hashedPassword = await bcrypt.hash(ROOT_PASSWORD as string, 10);

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

function insertLocker(locker_name: string, locker_code: string) {
	const db = new Database("mydb.db");

	// Create table if not exists
	db.exec(`
		CREATE TABLE IF NOT EXISTS locker (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			locker_name TEXT NOT NULL,
			locker_code TEXT NOT NULL,
			date_created DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`);

	// Insert data
	const stmt = db.prepare(`
		INSERT INTO locker (locker_name, locker_code)
		VALUES (?, ?)
	`);
	stmt.run(locker_name, locker_code);

	db.close();
	console.log("Locker created successfully!");
}

function readLockers() {
	const db = new Database("mydb.db");

	const stmt = db.prepare("SELECT * FROM locker");
	const data = stmt.all(); // returns all rows as array of objects

	db.close();
	return data;
}

function writeSecret(key: string, value: string, description: string) {
	const db = new Database("mydb.db");

	// Create table if not exists
	db.exec(`
		CREATE TABLE IF NOT EXISTS secrets (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			key TEXT NOT NULL,
			value TEXT NOT NULL,
			description TEXT NOT NULL,
			date_created DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`);

	// Insert data (3 placeholders)
	const stmt = db.prepare(`
		INSERT INTO secrets (key, value, description)
		VALUES (?, ?, ?)
	`);
	stmt.run(key, value, description);

	db.close();
	console.log("Secret created successfully!");
}

function readSecretNameOnly() {
	const db = new Database("mydb.db");

	const stmt = db.prepare(
		"SELECT id, key, description, date_created FROM secrets",
	);
	const data = stmt.all();

	db.close();
	return data;
}

function readSecretByID(id: number) {
	const db = new Database("mydb.db");

	const stmt = db.prepare("SELECT * FROM secrets WHERE id = ?");
	const data = stmt.get(id); // get() returns single row

	db.close();
	return data;
}

export {
	initDatabase,
	insertLocker,
	readLockers,
	writeSecret,
	readSecretNameOnly,
	readSecretByID,
	db,
};
