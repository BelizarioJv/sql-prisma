const pg = require("pg");

// Connection String: protocolo_bd://usuario:senha@host:porta/nome_do_banco?parametros=
const db = new pg.Client({
  connectionString: "postgres://postress:senha@host:5432/banco",
});

async function createTable() {
  await db.connect();

  //salvando a query em uma variavel ,acessando o banco public e criando a tabela pokemon
  const query = `
    CREATE TABLE IF NOT EXISTS "public"."Pokemon" (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      type VARCHAR(255)
    );
  `;

  //salvando resultado da query e encerrando o banco
  const result = await db.query(query);
  console.log(result);

  await db.end();
}

createTable();
