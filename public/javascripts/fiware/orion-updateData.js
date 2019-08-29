const request = require("request");

exports.orionUpdateData = function (endpoint, payload, callback) {
    var options = {
        method: 'POST',
        url: endpoint,
        headers:
        {
            'Content-Type': 'application/json'
        },
        body: payload,
        json: true
    };

    request(options, function (error, response, body) {
        // if (error) throw new Error(error);

        callback(body);
    });
}


