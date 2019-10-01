const environment = require('../../../environment/environment');
const mqtt = require('mqtt');
const entityUpdate = require('../fiware/orion-updateData');
const entityCreate = require('../fiware/orion-postData');
const resourceMap = require('../resourceMapping/dc-fiware');
const client = mqtt.connect(environment.dc_subscriptionServer);


exports.notificationHandler = function () {

    //recieve notification from the wdc
    client.on('connect', () => {
        client.subscribe(environment.dc_subscriptionTag);
    });
    client.on('message', (topic, message) => {
        console.log(topic);
        var dcResponse = message.toString();
        //resource map from dc-ngsi
        resourceMap.wdcToNgsi(dcResponse, (mappedNGSI) => {
            //updata orion
            entityCreate.orionPostData(mappedNGSI, (body) => {
                console.log(body);//todo:log errors
            });
        });
    });

}



var endpoint = 'http://203.253.128.164:1026/v2/op/update';
var payload = {
    actionType: 'update',
    entities:
        [{
            id: 'spot_678',
            location:
            {
                type: 'geo:json',
                value: { type: 'Point', coordinates: [127.129058, 37.613176] }
            }
        }]
}
entityUpdate.orionUpdateData(endpoint, payload, function (result) {
    console.log(result);
    //todo: log the update
});