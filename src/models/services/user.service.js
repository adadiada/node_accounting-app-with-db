const { Client } = require('pg');

// let users = [];

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '123123',
  database: 'postgres',
});

const connectDB = async () => {
  await client.connect();
};

const getAll = async () => {
  const result = await client.query(`SELECT * FROM  users`);

  return result.rows;
};

const getById = async (id) => {
  const result = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);

  return result.rows[0] || null;
};

const create = async (name) => {
  const id = Date.now();

  await client.query(`INSERT INTO users (id, name) VALUES ($1, $2)`, [
    id,
    name,
  ]);

  return getById(id);
};

const upDate = async ({ id, name }) => {
  await client.query(
    `UPDATE users SET name = $1,
     WHERE id = $2`,
    [name, id],
  );

  return getById(id);
};

const deleteById = async (id) => {
  await client.query(`DELETE FROM  users WHERE id = $1`, [id]);
};

// const resetUser = () => {
//   users = [];
// };

module.exports = {
  getAll,
  getById,
  create,
  upDate,
  deleteById,
  // resetUser,
  connectDB,
};
