var request = require("request");
const environment = require('../../../environment/environment');

var options = { method: 'PUT',
  url: 'http://{{mp_url}}/{{cb}}/cnt/flx-wb1iIeL2AO',
  headers: 
   { 'Postman-Token': 'a758f48e-6ba3-4c78-838b-483e6f2a2a9e',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json',
     'X-M2M-Origin': 'SM',
     'X-M2M-RI': '12345',
     Accept: 'application/json' },
  body: { 'm2m:sc_spot': { status: 'abc' } },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
