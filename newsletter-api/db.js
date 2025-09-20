// This file connects Node.js to MySQL

const mysql = require('mysql2');

// create a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'SCHacks',
  password: 'hacking',
  database: 'newsletter'
});

// connect to mySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;
