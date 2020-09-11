const request = require("request");
const environment = require('../../../environment/environment');


exports.orionUpdateData = function (enitityID, payload, callback) {

    var options = {
        method: 'PATCH',
        url: environment.orion_updateData + enitityID + '/attrs',
        headers:
        {
            'Content-Type': 'application/json'
        },
        body: payload,
        json: true
    };

    request(options, function (error, response, body) {
        // if (error) throw new Error(error);
        callback(response.statusCode);
    });
}


