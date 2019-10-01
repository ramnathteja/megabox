const request = require("request");
const environment = require('../../../environment/environment');


exports.wdcCreateCIN = function (endpoint, headload, payload, callback) {
    var options = {
        method: 'POST',
        url: endpoint,
        headers: {
            'Content-Type': 'application/json; ty=4',
            'X-M2M-Origin': headload,
            'X-M2M-RI': '12345',
            Accept: 'application/json'
        },
        body: '{\n    "m2m:cin": {\n    \t"con": "' + payload + '"\n    }\n}'
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body);
    });
}

