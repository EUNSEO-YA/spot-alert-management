const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3300;

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'eunseo2823!!',
    database: 'reporter',
});

app.post('/submitReport', (req, res) => {
    console.log('신고 접수 요청 받음');
    
    const {NAME, PHONE, LOCATION} = req.body;

    connection.query(
        'INSERT INTO reporter (NAME, PHONE, LOCATION) VALUES (?, ?, ?)', [NAME, PHONE, LOCATION],
        (error, results) => {
            if(error){
                console.error('MySQL 에러: ', error);
                res.status(500).json({error: 'DB Error'});
            } else {
                res.status(200).json({messaage: '신고가 정상적으로 접수되었습니다'});
            }
        }
    );
});

app.listen(port, () => {
    console.log('서버가 http://localhost:${port} 에서 실행중입니다');
});