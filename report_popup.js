const { response } = require("express");

function submitForm() {
    console.log('submitForm 함수 호출됨');

    const NAME = document.getElementById('NAME')[0].Value;
    const PHONE = document.getElementById('PHONE')[0].Value;
    const LOCATION = document.getElementById('LOCATION')[0].Value;

    // Fetch API를 사용하여 서버에 데이터 전송
    fetch('http://localhost:3300/submitReport', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({NAME: NAME, PHONE: NAME, LOCATION: NAME}),
    })
    .then(response => response.json())
    .then(data => {
        console.log('신고가 접수되었습니다', data);
    })
    .catch(error => {
        console.error('오류 발생: ', error);
    });
}