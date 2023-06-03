// get the client
const mysql = require('mysql2');

// // create the connection to database
const connection = mysql.createConnection({
    host: '172.23.192.1',
    user: 'username',
    password: 'password'
  });

//   // simple query
  connection.connect((err) => {
    if (err) {
      console.log('Error connecting to db', err);
      return;
    }
    console.log('Connection established');
  });

  connection.query('USE memories', function (error, results, fields) {
      if (error) throw error;
      console.log(results);
  });

//   connection.query('INSERT INTO events (title, date) VALUES ("Family", "2023-06-02")', function (error, results, fields) {
//     if (error) throw error;
//     console.log(results[0]);
//   });

//   connection.query('INSERT INTO events (title, date) VALUES ("Friends", "2023-06-01")', function (error, results, fields) {
//     if (error) throw error;
//     console.log(results[0]);
//   });

//   connection.query('DELETE FROM events WHERE id = 1', function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
//   });

//   connection.query('UPDATE events SET date = "2023-05-01" WHERE id = 2', function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
//   });

  connection.query('SELECT * FROM events', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  });

  connection.end();
