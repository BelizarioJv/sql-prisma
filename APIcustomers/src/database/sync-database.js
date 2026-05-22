import { query } from "./index.js";

async function syncDatabase() {
  await query(`
    CREATE TABLE IF NOT EXISTS customer (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    );
  `);
  console.log('Created "customers" table.');
  process.exit(1);
}

syncDatabase();
