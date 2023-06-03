// Get the client
import mysql from 'mysql2';

// Create the connection to database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise();

async function getEvents() {
    const [rows] = await pool.query("SELECT * FROM events");
    return rows;
}

const events = await getEvents();
console.log(events);
