let express=require('express');
let app=express();
let path=require('path');
const cors=require('cors');
const port = 8800;

app.use(cors());
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const policeOfficeName = req.body.police_office_name;
    const policeOfficeCode = req.body.police_office_code;

    console.log("Police Office Name:", policeOfficeName);
    console.log("Police Office Code:", policeOfficeCode);

    if (parseInt(policeOfficeCode) === 1234) {
        res.send('Welcome!');
    } else {
        res.send('Please try again.');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
