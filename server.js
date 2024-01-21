let express=require('express');
let app=express();
let path=require('path');
const cors=require('cors');
const port = 8800;

app.use(cors());
app.use(express.static(path.join(__dirname)));
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

        if (parseInt(policeOfficeCode) === 1234 && isPoliceOfficeNameIncluded) {
            const policeStation = isPoliceOfficeNameIncluded['구분'];
            const address = isPoliceOfficeNameIncluded['주소'];
            res.render('map', { policeOfficeName, policeStation, address });

        } else {
            res.send('Please try again.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
