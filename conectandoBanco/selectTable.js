const pg = require("pg");

const connectionString = "postgres://postress:senha@host:5432/banco";
const db = new pg.Client({ connectionString });

async function selectPokemon() {
  await db.connect();

  const query = `SELECT * FROM "public"."Pokemon";`;
  const result = await db.query(query);
  console.log(result);
  console.log(result.rows);

  await db.end();
}

selectPokemon();
