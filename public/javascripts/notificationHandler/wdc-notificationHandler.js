const environment = require('../../../environment/environment');
const mqtt = require('mqtt');
const entityCreate = require('../fiware/orion-postData');
const entityUpdate = require('../fiware/orion-updateData');
const resourceMap = require('../resourceMapping/dc-fiware');
const client = mqtt.connect(environment.dc_subscriptionServer);


exports.notificationHandler = function () {
    //recieve notification from the wdc
    client.on('connect', (connack) => {
        console.log("\n#################---> MQTT connection with ", environment.dc_subscriptionServer ," has been established\n");
        client.subscribe(environment.dc_listeningTag, (err, granted)=>{
            console.warn("#################---> Errors while subscription : ", err,"\n");
            console.log("#################---> Subscribed successfully to topic  : ", granted[0].topic,"\n");
        });
    });
    client.on('message', (topic, message) => {
        var dcResponse = JSON.parse(message.toString());
        console.log(dcResponse);
        //resource map from dc-ngsi
        resourceMap.wdcToNgsi(dcResponse, (mappedNGSI) => {
            const payload = JSON.parse(JSON.stringify(mappedNGSI));
            var entityID = payload.id;
            delete payload.id;
            delete payload.type;
            //updata entity
            entityUpdate.orionUpdateData(entityID, payload, (statusCode) => {
                if (statusCode != 204) {
                    console.log("......Update to orion is unsuccessful");
                    //create entity
                    entityCreate.orionPostData(mappedNGSI, (body) => {
                        //todo if error probably have to create entity first
                        console.log(body);
                        //todo:log errors
                    });
                } else {
                    console.warn("......Update into orion is successful");
                }
            });

        });
    });

}