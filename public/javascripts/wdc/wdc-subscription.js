const request = require("request");
const environment = require('../../../environment/environment');

//call this function ever time there is a new entry [CALL COMES FROM WEBPAGE]

//after subscription is success then update the register
exports.wdcSubscription = function (endpoint, headload, callback) {
    var options = {
        method: 'POST',
        url: endpoint,
        headers: {
            'Content-Type': 'application/json',
            'X-M2M-Origin': headload,
            'X-M2M-RI': '12345',
            Accept: 'application/json'
        },
        body: {
            'm2m:sub':
            {
                enc: { net: [1, 3], chty: [4] },
                nu: [environment.dc_subscription],
                nct: 1
            }
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body);
    });
}

//if subscription fialed log the error and abort the wirting of registry 


