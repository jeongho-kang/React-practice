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

const multer = require('multer');
const { connect } = require('http2');
const upload = multer({dest: './upload'})

app.get('/api/customers', (req, res) => {
  connection.query(
      "SELECT * FROM customer",
    (err,rows,fields) => {
      res.send(rows);
    }
);
});

//이미지 파일 처리하는 부분
app.use('/image', express.static('./upload'));//'./image' 말고 '/image'하니까 이미지 잘 출력된다......
app.post('/api/customers', upload.single('image'), (req, res) =>{ // var대신 let을 사용한다. 
  let sql ='insert into CUSTOMER values (null,?,?,?,?,?)';
  //let image ='/image/' + req.file.filename; //이렇게 하니까 사진은 디비에 올라가긴 하는데 깨져서 올라감...
  let image ='http://localhost:5000/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;


  //디버깅
  // console.log(name);
  // console.log(image);
  // console.log(birthday);
  // console.log(gender);
  // console.log(job);


  let params=[image, name, birthday, gender, job];
  connection.query(sql, params, 
    (err, rows, field) => {
        res.send(rows);
        //디버깅용
        console.log(image);
    }
  );
});


app.delete('/api/customers/:id', (req,res)=> {
  let sql = 'UPDATE CUSTOMER SET isDeleted =1 WHERE id =?'; // 삭제완료후 알려줌
  let params =[req.params.id];
  connection.query(sql,params,(err,rows,fields) => {
    res.send(rows);
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));

