const request = require("request");

exports.orionGetdata = function (endpoint, query, headload, callback) {
  var options = {
    method: 'GET',
    url: endpoint,
    qs: query,
    headers: headload
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    callback(body);
  });
}