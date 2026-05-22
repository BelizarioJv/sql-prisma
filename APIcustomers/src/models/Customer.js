import { query } from "../database/index.js";

export class Customer {
  constructor(customerRow) {
    this.id = customerRow.id;
    this.name = customerRow.name;
    this.email = customerRow.email;
  }

  //Consultando todos os clientes da tabela clientes
  static async findAll() {
    const result = await query(`SELECT * FROM customer;`);
    return result.rows.map((row) => new Customer(row));
  }

  //Inserindo um cliente novo na tabela clientes
  static async create({ name, email }) {
    const result = await query(
      `INSERT INTO customer (name,email)
      VALUES ($1, $2)
      RETURNING *`,
      [name, email],
    );
    return new Customer(result.rows[0]);
  }

  //Achando o cliente pelo id
  static async findById(id) {
    const result = await query(`SELECT * FROM customer WHERE id = $1`, [id]);
    if (!result.rows[0]) return null;
    return new Customer(result.rows[0]);
  }

  //Atualizando dados do cliente na tabela
  static async update(id, attributes) {
    const { rows } = await query(`SELECT * FROM customer WHERE id = $1`, [id]);
    if (!rows[0]) return null;

    const customer = new Customer(rows[0]);

    Object.assign(customer, attributes);
    customer.updatedAt = new Date();

    await query(
      `UPDATE customer SET
        name = $1,
        email = $2
      WHERE id = $3;`,
      [customer.name, customer.email, customer.id],
    );

    return customer;
  }

  //Deletando um cliente da tabela
  static async delete(id) {
    await query(`DELETE FROM customer WHERE id = $1`, [id]);
    return { message: "customer deleted successfully." };
  }
}
