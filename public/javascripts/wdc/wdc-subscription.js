const request = require("request");
const environment = require('../../../environment/environment');

//call this function ever time there is a new entry [CALL COMES FROM WEBPAGE]

//after subscription is success then update the register
exports.subscribe = function (endpoint, callback) {
    console.log("this is the acp  value",environment.dc_acpValue);
    var options = {
        method: 'POST',
        url: endpoint,
        headers: {
            'Content-Type': 'application/json;ty=23',
            'X-M2M-Origin': environment.dc_acpValue,
            'X-M2M-RI': '12345',
            'Accept': 'application/json'
        },
        body: JSON.stringify
        ({
            'm2m:sub':
            {
                enc: { net: [1, 3], chty: [4] },
                nu: [environment.dc_subscriptionServer.concat(environment.dc_subscriptionTag)],
                nct: 1
            }
        })
    };

    request(options, function (error, response, body) {
        if(error) {
            console.log(error);
        }

        callback(body);
    });
}
// todo if subscription failed we have to create CNT if it failed create AE
//if subscription fialed log the error and abort the wirting of registry 


