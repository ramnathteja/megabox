var request = require("request");

var options = { method: 'GET',
  url: 'http://192.168.128.198:7599/wdc_base/sync_parking/parkingLot_99',
  headers: 
   { 'Postman-Token': '34de7200-d1ea-4395-a8c9-fcd331821025',
     'cache-control': 'no-cache',
     'X-M2M-Origin': 'S20170717074825768bp2l',
     'X-M2M-RI': '1234er5',
     Accept: 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
