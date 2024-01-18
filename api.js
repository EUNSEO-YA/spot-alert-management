const request = require("request");
const {Api} = require("./models");

const options = {
    method: "GET",
    url: "https://api.odcloud.kr/api/15054711/v1/uddi:9097ad1f-3471-42c6-a390-d85b5121816a?page=1&perPage=10&serviceKey=7o7oLDcGaDuBkmvrCDRKWzDq5sD%2F9k4%2FpMurtSqgRZNtX9CmYlwDlF2sUzPQvWHt5EvfTXqPPtAoOFj70rlCNQ%3D%3D",
    headers: {
        'Accept': 'application / json'
    },
};

request(options, async(error, response, ListSpot) => {
    if (error) {throw new Error(error);}
    let info = JSON.parse(ListSpot);

    for(i in info['ListSpot']['row']) {
        let ApiId = info['ListSpot']['row'][i]['ApiId']
        let City = info['ListSpot']['row'][i]['City']
        let policestation = info['ListSpot']['row'][i]['policestation']
        let officename = info['ListSpot']['row'][i]['officename']
        let GUBUN = info['ListSpot']['row'][i]['GUBUN']
        let Tel = info['ListSpot']['row'][i]['Tel']
        let Address = info['ListSpot']['row'][i]['Address']
    

    await Api.create({ApiId:ApiId, City:City, policestation:policestation, officename:officename, GUBUN:GUBUN, Tel:Tel, Address:Address})
    }
});

