let express=require('express');
let app=express();
let path=require('path');
const cors=require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const port = 8000;

app.use(cors());
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));


app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
//공공데이터포탈 openAPI 연결
const request = require("request");

const options = {
    method: "GET",
    url: "https://api.odcloud.kr/api/15054711/v1/uddi:9097ad1f-3471-42c6-a390-d85b5121816a?page=1&perPage=2051&serviceKey=7o7oLDcGaDuBkmvrCDRKWzDq5sD%2F9k4%2FpMurtSqgRZNtX9CmYlwDlF2sUzPQvWHt5EvfTXqPPtAoOFj70rlCNQ%3D%3D",
    headers: {
        'Accept': 'application / json'
    },
};

request(options, async(error, response, body) => {
    if (error) {throw new Error(error);}
    let info = JSON.parse(body);
    //console.log(info);
    // for (const item of info.data) {
    //     const officename = item['관서명'];
    //     const policeStation = item['구분'];
    //     const policeStation_address = item['주소'];
    //     console.log(officename,policeStation,'policeStation_address=',policeStation_address);
    //   }
    
    app.post('/login', (req, res) => {
        const policeOfficeName = req.body.police_office_name;
        const policeOfficeCode = req.body.police_office_code;

        console.log("Police Office Name:", policeOfficeName);
        console.log("Police Office Code:", policeOfficeCode);

        const isPoliceOfficeNameIncluded = info.data.find(item => item['관서명'] === policeOfficeName);

        // const

        if (parseInt(policeOfficeCode) === 1234 && isPoliceOfficeNameIncluded) {
            const policeStation = isPoliceOfficeNameIncluded['구분'];
            const address = isPoliceOfficeNameIncluded['주소'];

            // MySQL에서 reporter 테이블 조회
            connection.query('SELECT * FROM reporter', (error,reporterResults, fields)=> {
                if(error) {
                    console.error('MySQL 에러: ', error);
                    res.status(500).json({error: 'DB Error'});
                } else {
                    // reporterResults -> reporter 테이블 조회 결과 포함
                    console.log('Reporter info is: ', reporterResults);
                }

                // 테이블 조회 결과
                const reporterlist = reporterResults;
                console.log(reporterlist);
            })

            res.render('map', { policeOfficeName, policeStation, address });

        } else {
            res.send('Please try again.');
        }
    });
});
//Connet to mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'eunseo2823!!',
    database: 'reporter',
});

connection.connect((err) => {
    if (err) {
      console.error('MySQL 연결 오류: ' + err.stack);
      return;
    }
});

connection.query('SELECT * from reporter', (error, rows, fields) => {
  if (error) throw error;
  console.log('User info is: ', rows);
});

// connection.end();

app.post('/submitReport', (req, res) => {
    console.log('신고 접수 요청 받음');

    connection.query(
        'INSERT INTO reporter VALUES (?, ?, ?)', [ req.body.NAME, req.body.PHONE, req.body.LOCATION],
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
    console.log(`Server listening at http://localhost:${port}`);
});