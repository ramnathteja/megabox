const request = require("request");

exports.wdcCreateFLX = function (endpoint, headload, payload, callback) {
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