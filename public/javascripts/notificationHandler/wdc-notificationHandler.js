const environment = require('../../../environment/environment');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://203.253.128.164:1883');
const entityUpdate = require('../fiware/orion-updateData');
const entityCreate = require('../fiware/orion-postData');
const resourceMap = require('../resourceMapping/dc-fiware');

//todo: recieve notification from the wdc

client.on('connect', () => {
    client.subscribe(environment.dc_subscription);
});

client.on('message',(topic, message) => {
    console.log(topic);
    var dcResponse = message.toString();
    resourceMap.wdcToNgsi(dcResponse, (mappedNGSI)=>{
        entityCreate.orionPostData(mappedNGSI,(body)=>{
            console.log(body);
        });
    });
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