const mqtt = require('mqtt');
const client = mqtt.connect('');
console.log('hello kitty');
//recieve notifications from fiware
client.on('connected', () => {
    console.log('connected');
    client.subscribe('ramtest1',()=>{
        console.log("subscribed");
    })
});

client.on('message', (topic, message) => {
    if(topic === 'ramtest1') {
        console.log(message);
    }
});

//resoucemapping ngsi-wdc
//update wdc flx