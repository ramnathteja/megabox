const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://203.253.128.164:1883');
const util = require('util');
const entityUpdate = require('../fiware/orion-updateData');
const entityCreate = require('../fiware/orion-postData');
const resourceMap = require('../resourceMapping/dc-fiware');

//todo: recieve notification from the wdc

var targetTopic = util.format('/oneM2M/req/+/ram/json');

client.on('connect', () => {
    // client.subscribe(targetTopic)
    client.subscribe('/oneM2M/req/+/ram/json')
});

client.on('message',(topic, message) => {
    console.log(topic);
    console.log(message.toString());
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