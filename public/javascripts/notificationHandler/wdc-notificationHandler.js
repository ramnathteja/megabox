const environment = require('../../../environment/environment');
const mqtt = require('mqtt');
const entityCreate = require('../fiware/orion-postData');
const entityUpdate = require('../fiware/orion-updateData');
const resourceMap = require('../resourceMapping/dc-fiware');
const client = mqtt.connect(environment.dc_subscriptionServer);

/**
    TODO: need to send ack to dc once notifcation is received
 */
exports.notificationHandler = function () {
    //recieve notification from the wdc
    client.on('connect', () => {
        console.log(".............MQTT connection for wdc established\n");
        client.subscribe(environment.dc_subscriptionTag);
    });
    client.on('message', (topic, message) => {
        var dcResponse = JSON.parse(message.toString());
        // //resource map from dc-ngsi
        resourceMap.wdcToNgsi(dcResponse, (mappedNGSI) => {
            const payload = JSON.parse(JSON.stringify(mappedNGSI));
            var entityID = payload.id;
            delete payload.id;
            delete payload.type;
            console.log(entityID);
            //updata entity
            entityUpdate.orionUpdateData(entityID, payload, (statusCode) => {
                if (statusCode != 204) { //TODO: and have to check if !204 is because entity was not created, if not then catelog the error!!
                    console.warn(entityID + "........updating into orion is unsuccessful");
                    //create entity
                    entityCreate.orionPostData(mappedNGSI, (body) => {
                        //TODO if error probably have to create entity first
                        console.log(body);
                        //TODO:log errors
                    });
                } else {
                    console.warn(entityID + "........is updated into orion successful");
                }
            });

        });
    });

}