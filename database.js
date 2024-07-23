const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS screens2 (
      id SERIAL PRIMARY KEY,
      paringcode VARCHAR(255) NOT NULL,
      screenid VARCHAR(255) NOT NULL,
      status BOOLEAN NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  await pool.query(query);
};

createTable().catch(error => console.error('Error creating table:', error));

module.exports = { pool };
