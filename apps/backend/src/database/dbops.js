import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, "database.sqlite"));

// Initialize database connection
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("PRAGMA foreign_keys = ON");
      db.run(
        `CREATE TABLE IF NOT EXISTS lockers (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL
            )`,
        (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        }
      );
    });
  });
}

// Insert a single row
function insert(table, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const sql = `INSERT INTO ${table} (${keys.join(",")}) VALUES (${keys.map(() => "?").join(",")})`;

  return new Promise((resolve, reject) => {
    db.run(sql, values, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
}

// Close database connection
function closeDatabase() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export { db, initializeDatabase, insert, closeDatabase };
