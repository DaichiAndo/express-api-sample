const express = require('express');
const mysql = require('mysql');
require('dotenv').config()

// DB接続設定
const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// DB接続, テーブル作成
con.connect(function(err) {
  if (err) throw err;
  console.log('MySQL Connected');

  const sql =
    'CREATE TABLE IF NOT EXISTS users ' +
    '(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL)';
	con.query(sql, function (err, result) {  
    if (err) throw err;  
    console.log('users table created');  
	});
});

// API
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/users', (req, res) => {
  const sql = 'select * from users'
	con.query(sql, function (err, result, fields) {  
    if (err) res.send('Internal Error');
    res.send(result)
	});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
