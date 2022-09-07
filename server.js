const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

const data = fs.readFileSync("./database.json"),
      parsedData = JSON.parse(data),
      mysql = require('mysql');

const connection = mysql.createConnection({
  host : parsedData.host,
  user : parsedData.user,
  password : parsedData.password,
  port : parsedData.port,
  database : parsedData.database
});
connection.connect();


/*app.get('/api/customers', (req, res) => {
    res.send([
    {
    'id': 1,
    'image' : 'https://placeimg.com/64/64/1',
    'name': '강정호',
    'birthday' : 980307,
    'gender' : '남자',
    'job' : '대학생'
  },
  {
    'id': 2,
    'image' : 'https://placeimg.com/64/64/2',
    'name': '홍길동',
    'birthday' : 450204,
    'gender' : '남자',
    'job' : '개발자'
  },
  {
    'id': 3,
    'image' : 'https://placeimg.com/64/64/3',
    'name': '이순신',
    'birthday' : 950512,
    'gender' : '남자',
    'job' : '충무공'
  }]);
});
*/
app.get('/api/customers', (req, res) => {
  connection.query(
      "SELECT * FROM customer",
    (err,rows,fields) => {
      res.send(rows);
    }
);
});


app.listen(port, () => console.log(`Listening on port ${port}`));