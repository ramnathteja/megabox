const request = require("request");

const environment = require('../../../environment/environment');
/*
FIXME: there is no available methode to deny duplicate/multiple subscriptions 
        resulting in creating more than one subscription to a single resource;
        need to find a hack to bipass this!!
 */

exports.subscribe = function (desc, entityID, entityType,condi_attr, notifi_attr, callback) {
    var options = {
        method: 'POST',
        url: environment.orion_subscriptionUrl,
        headers:
        {
            'Content-Type': 'application/json'
        },
        body:
        {
            description: desc,
            subject:
            {
                entities: [{ id: entityID, type: entityType }],
                condition: { attrs: condi_attr }
            },
            notification:
            {
                http: { url: environment.orion_notificationUrl },
                attrs: notifi_attr
            },
            expires: '2040-01-01T14:00:00.00Z',
            throttling: 5
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
        }

        callback(body);
    });
}