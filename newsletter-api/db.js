// This file connects Node.js to MySQL

const mysql = require('mysql2/promise');

// create a connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'SCHacks',
  password: 'hacking',
  database: 'newsletter',
  waitForConnections:true,
  connectionLimit:10,
  queueLimit:0
});

// connect to mySQL
async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

module.exports = {
  query
};
