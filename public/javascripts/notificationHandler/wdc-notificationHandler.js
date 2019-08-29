const mqtt = require('mqtt');
const client = mqtt.connect('');
const entityUpdate = require('../fiware/orion-updateData');
const entityCreate = require('../fiware/orion-postData');
const resourceMap = require('../resourceMapping/dc-fiware');

//todo: recieve notification from the wdc

client.on('connect', () => {
    client.subscribe('')
});

client.on('message',(topic, message) => {

});

//todo: resource map from dc-ngsi

//updata orion
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