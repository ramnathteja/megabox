const request = require("request");

//call this function ever time there is a new entry [CALL COMES FROM WEBPAGE]

//after subscription is success then update the register
exports.wdcSubscription = function (endpoint, headload, payload, callback) {
    var options = {
        method: 'POST',
        url: endpoint,
        headers: headload,
        body: payload
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body);
    });
}

//if subscription fialed log the error and abort the wirting of registry 
 