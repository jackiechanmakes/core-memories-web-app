// Get the client
import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

// Create the connection to database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise();

export async function createTestTable() {
  await pool.query('CREATE TABLE test AS ');
}

export async function getEvents() {
    const [rows] = await pool.query(`
    SELECT * FROM events`);
    return rows;
}

export async function getEvent(id) {
  const [rows] = await pool.query(`
  SELECT *
  FROM events
  WHERE id = ?`, [id]);
  return rows[0];
}

export async function getEventsByDate(date) {
  const [rows] = await pool.query(`
  SELECT *
  FROM events
  WHERE date LIKE ?
  `, [date]
  );

  return rows;
}

export async function createEvent(date, title) {
  const [result] = await pool.query(`
  INSERT INTO events (date, title)
  VALUES (?, ?)
  `, [date, title]);
  const id = result.insertId;
  return getEvent(id);
}

export async function deleteEvent(id) {
  await pool.query(`
  DELETE FROM events
  WHERE id = ?
  `, [id]);
}

export async function updateEvent(title, id, isMock) {
  if (isMock) {
    let fakeData = "This updateEvent unit test passed.";
    return fakeData;
  } else {
    const [result] = await pool.query(`
    UPDATE events
    SET title = ?
    WHERE id = ?
    `, [title, id]);
  }

  return getEvent(id);
}

export async function replaceEvent(idParam, id, date, title) {
  await pool.query(`
  UPDATE events
  SET id = ?, date = ?, title = ?
  WHERE id = ?
  `, [id, date, title, idParam]);
  return getEvent(id);
}

export async function getStats() {
  let result = await pool.query(`
  SELECT date, COUNT(*) as count
  FROM events
  GROUP BY date
  ORDER BY date ASC
  `);
  return result[0];
}

export function closeConnection() {
  pool.end();
}
