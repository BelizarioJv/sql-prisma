import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgres://postgres:010500@localhost:5432/aulaPool",
});

export async function query(queryString, params, callback) {
  return pool.query(queryString, params, callback);
}

export async function getClient() {
  return pool.connect();
}
