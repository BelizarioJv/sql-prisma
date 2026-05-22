const pg = require("pg");

const pool = new pg.Pool({
  connectionString: "postgresql://postgres:010500@localhost:5432/aulaPool",
});

async function createTable() {
  try {
    const result = await pool.query(`
      CREATE TABLE IF NOT EXISTS events(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        event_date DATE NOT NULL,
        total_tickets INT NOT NULL,
        sold_tickets INT DEFAULT 0
      );
    `);
    console.log("tabela criada com sucesso");
  } catch (error) {
    console.log("Erro ao criar a tabela");
  } finally {
    console.log("fechando conexao da criaçao da tabela....");
  }
}

async function newEvent(nameEvent, event_date, totalTickets) {
  try {
    const result = await pool.query(
      `INSERT INTO events (name, date , total_tickets , sold_tickets) VALUES ($1, $2 , $3 , $4);`,
      [nameEvent, dateEvent, totalTickets],
    );
    console.log("Valores insiridos na tabela com sucesso");
  } catch (error) {
    console.log("Erro ao adicionar o evento");
  } finally {
    console.log("fechando conexao da criaçao do evento");
  }
}

async function getAllevents() {
  try {
    const { rows } = await pool.query(
      `SELECT id,name ,event_date AS "eventDate",total_tickets AS "totalTickets",sold_tickets AS "ticketsSold" FROM events `,
    );

    return rows;
  } catch (error) {
    console.log("Erro ao vuscar dados da tabela eventos");
  } finally {
    console.log("fechando conexao de busca de dados da tabela");
  }
}

async function getEventByName(eventName) {
  try {
    const { rows } = await pool.query(
      `SELECT id,name ,event_date AS "eventDate",total_tickets AS "totalTickets",sold_tickets AS "ticketsSold" FROM events WHERE name = $1`,
      [eventName],
    );

    return rows;
  } catch (error) {
    console.log("Erro ao vuscar dados da tabela eventos");
  } finally {
    console.log("fechando conexao de busca de dados da tabela");
  }
}

async function getEventsByDate(eventDate) {
  try {
    const { rows } = await pool.query(
      `SELECT id,name ,event_date AS "eventDate",total_tickets AS "totalTickets",sold_tickets AS "ticketsSold" FROM events WHERE event_date= $1`,
      [eventDate],
    );

    return rows;
  } catch (error) {
    console.log("Erro ao vuscar dados da tabela eventos");
  } finally {
    console.log("fechando conexao de busca de dados da tabela");
  }
}

async function getDataByDate(eventId) {
  try {
    const { rows } = await pool.query(
      `SELECT id,name ,event_date AS "eventDate",total_tickets AS "totalTickets",sold_ticketsAS "ticketsSold" FROM events WHERE id = $1`,
      [eventId],
    );

    const event = rows[0];
    const dateNow = new Date();
    const eventDate = new Date(event.eventDate);

    if (event > dateNow && event.ticketsSold < event.totalTickets) {
      const result = await pool.query(
        `UPDATE events SET sold_tickets = sold_tickets + 1 WHERE id = $1`,
        [eventId],
      );
    } else {
      console.log(
        "Nao foi possivel compra tickets pois ou o evento ja foi encerrado ou os tickets acabaram",
      );
    }
    return rows;
  } catch (error) {
    console.log(` Erro ao vuscar dados da tabela eventos ${error}`);
  } finally {
    console.log("fechando conexao de busca de dados da tabela");
  }
}
