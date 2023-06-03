// // get the client
// const mysql = require('mysql2');

// // // create the connection to database
// const connection = mysql.createConnection({
//     host: '172.23.192.1',
//     user: 'username',
//     password: 'password'
//   });

// //   // simple query
//   connection.connect((err) => {
//     if (err) {
//       console.log('Error connecting to db', err);
//       return;
//     }
//     console.log('Connection established');
//   });

  // connection.query('CREATE DATABASE memories', function (error, results, fields) {
  //   if (error) throw error;
  //   console.log(results);
  // });

  // connection.query('SHOW databases', function (error, results, fields) {
  //   if (error) throw error;
  //   console.log('The solution is: ', results);
  // });

  // connection.query('USE memories', function (error, results, fields) {
  //     if (error) throw error;
  //     console.log(results);
  // });

  // connection.query('CREATE TABLE events (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), date DATE)',
  // function (error, results, fields) {
  //   if (error) throw error;
  //   console.log(results);
  // });

  // connection.query('CREATE TABLE stats (date DATE, count INT)',
  // function (error, results, fields) {
  //   if (error) throw error;
  //   console.log(results);
  // });

  // connection.query('SHOW TABLES',
  // function (error, results, fields) {
  //   if (error) throw error;
  //   console.log(results);
  // });

  // connection.end();
