const { pool } = require('./database');

// Function to create a screen
const createScreen = async (paringCode, screenId, status) => {
  const query = `
    INSERT INTO screens2 (paringCode, screenId, status)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [paringCode, screenId, status];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Function to get all screens
const getScreens = async () => {
  const query = `
    SELECT * FROM screens2;
  `;
  const res = await pool.query(query);
  return res.rows;
};

// Function to update a screen by ID
const updateScreen = async (id, paringCode, screenId, status) => {
  const query = `
    UPDATE screens2
    SET paringCode = $1, screenId = $2, status = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *;
  `;
  const values = [paringCode, screenId, status, id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Function to get a single screen by ID
const getScreenById = async (id) => {
  const query = `
    SELECT * FROM screens2
    WHERE id = $1;
  `;
  const values = [id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

module.exports = { createScreen, getScreens, updateScreen, getScreenById };
