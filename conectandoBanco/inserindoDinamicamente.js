const pg = require("pg");

const connectionString = "postgres://postress:senha@host:5432/banco";
const db = new pg.Client({ connectionString });

async function insertPokemon() {
  await db.connect();

  // Forma básica
  const query = `INSERT INTO "public"."Pokemon" (name, type) VALUES ('Sprigatito', 'Grama');`;
  const result1 = await db.query(query);
  console.log(result1);

  // Dados dinâmicos da forma CORRETA
  const pokemon = { name: "Quaxly", type: "Água" };
  const result3 = await db.query(
    `INSERT INTO "Pokemon" (name, type) VALUES ($1, $2);`,
    [pokemon.name, pokemon.type],
  );
  console.log(result3);

  await db.end();
}

insertPokemon();
