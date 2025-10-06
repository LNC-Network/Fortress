import { insert } from "../database/dbops.js";

export function createLocker(name) {
  try {
    // Generate unique ID
    const id = Date.now().toString();

    // Insert into database
    insert("lockers", { id, name });

    // Return the created locker
    return { id, name };
  } catch (err) {
    console.error("Failed to create locker:", err);
    throw err;
  }
}

export function getLockerById(lockers, id) {
  return lockers.find((l) => l.id === id);
}
