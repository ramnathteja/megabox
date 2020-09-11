const request = require("request");
const environment = require('../../../environment/environment');

exports.orionPostData = function (payload, callback) {
    console.warn("came into orion create entity");
    var options = {
        method: 'POST',
        url: environment.orion_postData,
        headers:
        {
            'Content-Type': 'application/json'
        },
        body: payload,
        json: true
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body); //FIXME: when new entity is created the statuscode is empyt/undefined
    });
}


