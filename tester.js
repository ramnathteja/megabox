var request = require("request");

var options = { method: 'PUT',
  url: 'http://203.253.128.179:7599/wdc_base/sync_parking/parkingLot_KETI/parkingSpot_113',
  headers: 
   { 'Postman-Token': 'b6e25199-f778-45ac-b15f-48a7b9a024c0',
     'cache-control': 'no-cache',
     'Content-Type': 'application/vnd.onem2m-res+json',
     'X-M2M-Origin': 'justin',
     'X-M2M-RI': '12345',
     Accept: 'application/json' },
  body: '{\n  "sc:parkingSpot": {\n     "status": "occupied"\n      }\n}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});