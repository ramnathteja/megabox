const environment = require('../../../environment/environment');
const mqtt = require('mqtt');
const entityCreate = require('../fiware/orion-postData');
const entityUpdate = require('../fiware/orion-updateData');
const resourceMap = require('../resourceMapping/dc-fiware');
const client = mqtt.connect(environment.dc_subscriptionServer);


exports.notificationHandler = function () {

    console.log('came in to notification');

    //recieve notification from the wdc
    client.on('connect', () => {
        console.log("mqtt connected");
        client.subscribe(environment.dc_subscriptionTag);
    });
    client.on('message', (topic, message) => {
        var dcResponse = JSON.parse(message.toString());
        // //resource map from dc-ngsi
        resourceMap.wdcToNgsi(dcResponse, (mappedNGSI) => {
            var payload = {
                actionType: 'update',
                entities:
                    [mappedNGSI]
            }
            //     //updata orion
            entityUpdate.orionUpdateData(payload, (body) => {
                console.log(body);
                //todo:log errors
            });
        });
    });

}