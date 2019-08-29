const request = require("request");

exports.orionPostData = function (payload, callback) {
    var options = {
        method: 'POST',
        url: 'http://203.253.128.164:1026/v2/entities/',
        headers:
        {

            'Content-Type': 'application/json'
        },
        body: payload,
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body);
    });
}


