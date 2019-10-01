const request = require("request");
const environment = require('../../../environment/environment');


exports.wdcCreateCNT = function (endpoint, headload, payload, callback) {
    var options = {
        method: 'POST',
        url: endpoint,
        headers: {
            'Content-Type': 'application/json',
            'X-M2M-Origin': headload,
            'X-M2M-RI': '12345',
            Accept: 'application/json'
        },
        body: { 'm2m:cnt': { rn: payload } }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body);
    });
}
