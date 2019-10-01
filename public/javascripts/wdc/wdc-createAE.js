const request = require("request");
const environment = require('../../../environment/environment');

exports.wdcCreateAE = function (endpoint, headload, payload, callback) {
    var options = {
        method: 'POST',
        url: endpoint,
        headers: {
            'X-M2M-RI': '1234',
            'X-M2M-Origin': headload,
            'Content-Type': 'application/json; ty=2'
        },
        body: '{\n    "m2m:ae": {\n        "rn": "' + payload + '",\n        "acpi":["wdc_base/acp_test127"],\n        "rr": true\n    }\n}'
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body);
    });
}
