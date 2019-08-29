const request = require('request');
const jsonPath = require('jsonpath');
const environment = require('../../../environment/environment');

const mobiusHandler = function () {
    
    let server_ip = environment.CSEInfo;
    let ae_id = environment.Origin;

    function init_mqtt_client() {
        mqtt_client = mqtt.connect('mqtt://' + config.cse.cbhost + ':' + config.cse.mqttport);
        //todo finish the function twit
        setInterval(function () {
            subscriptionCreate.createSubscription(sensor_ids);
        }, 1000 * 60 * 10);
        mqtt_client.on('connect', on_mqtt_connect);
        mqtt_client.on('message', on_mqtt_message_recv);
    }

    function on_mqtt_connect() {
        var noti_topic = util.format('/oneM2M/req/+/%s/#', config.ae.aeid);
        mqtt_client.unsubscribe(noti_topic);
        mqtt_client.subscribe(noti_topic);
        console.log('[mqtt_connect] noti_topic : ' + noti_topic);
    }

    function on_mqtt_message_recv(topic, message) {

        console.log('receive message from topic: <- ' + topic);
        console.log('receive message: ' + message.toString());

        var topic_arr = topic.split("/");

        if (topic_arr[1] == 'oneM2M' && topic_arr[2] == 'req' && topic_arr[4] == config.ae.aeid) {
            var jsonObj = JSON.parse(JSON.stringify(message.toString()));
            //var jsonObj = JSON.parse(message.toString());

            mqtt_noti_action(jsonObj, function (path_arr, cinObj, rqi, to, pc, sur) {
                if (cinObj) {
                    var rsp_topic = '/oneM2M/resp/' + topic_arr[3] + '/' + topic_arr[4] + '/' + topic_arr[5];

                    event.emit('upload', sur, cinObj);

                    response_mqtt(rsp_topic, '2000', to, config.ae.aeid, rqi, pc);
                }
            });
        }
        else {
            console.log('topic is not supported');
        }
    }

    function response_mqtt(rsp_topic, rsc, to, fr, rqi, pc) {

        var rsp_message = {};
        rsp_message['m2m:rsp'] = {};
        rsp_message['m2m:rsp'].rsc = rsc;
        rsp_message['m2m:rsp'].to = to;
        rsp_message['m2m:rsp'].fr = fr;
        rsp_message['m2m:rsp'].rqi = rqi;
        rsp_message['m2m:rsp'].pc = pc;
        mqtt_client.publish(rsp_topic, JSON.stringify(rsp_message));
        console.log('noti publish -> ' + JSON.stringify(rsp_message));
    };

    function mqtt_noti_action(jsonObj, callback) {
        if (jsonObj != null) {
            var rqi = JSON.stringify(jsonpath.query(JSON.parse(jsonObj), '$..rqi'))
            rqi = rqi.replace("\"", "").replace("]", "").replace("[", "").replace("\"", "")

            var to = JSON.stringify(jsonpath.query(JSON.parse(jsonObj), '$..to'))
            to = to.replace("\"", "").replace("]", "").replace("[", "").replace("\"", "")

            var pc = JSON.stringify(jsonpath.query(JSON.parse(jsonObj), '$..pc'))
            pc = pc.replace("\"", "").replace("]", "").replace("[", "").replace("\"", "")

            var sgnObj = JSON.stringify(jsonpath.query(JSON.parse(jsonObj), '$..sgn'))
            var path_arr = JSON.stringify(jsonpath.query(JSON.parse(jsonObj), '$..sur'));
            var cinObj = jsonpath.query(JSON.parse(jsonObj), '$..con');
            var sur = path_arr.split('/');

            PARKING_LOT = sur[2];
            var PARKING_SPOT = sur[3];

            PARKING_SPOT = PARKING_SPOT.replace("\"", "").replace("]", "");

            if (PARKING_SPOT == 'sub_yt_lot_1' || PARKING_SPOT == 'sub_yt_lot_2' || PARKING_SPOT == 'sub_yt_lot_3') {

                var lot = {};
                if (!cinObj[0]) {
                }
                else {
                    if (isNaN(cinObj[0]) == false) {

                        lot.availableSpotNumber = {};
                        lot.availableSpotNumber.type = 'Number';

                        lot.availableSpotNumber.value = cinObj[0];

                        p_path = util.format('/%s/%s/%s',
                            config.cse.cbname,
                            FLEX_CONTAINER_NAME,
                            PARKING_LOT
                        );

                        var cnt_obj = {}
                        cnt_obj['m2m:sc_offLot'] = lot;
                        resp = keti_mobius.update_flex_cnt(p_path, cnt_obj);
                    }
                }
            }
            else {
                var spot = {};
                if (cinObj[0] == 'occupied' || cinObj[0] == 'free') {
                    spot.status = {};
                    spot.status.type = 'Text';

                    spot.status.value = cinObj[0];

                    p_path = util.format('/%s/%s/%s/%s',
                        config.cse.cbname,
                        FLEX_CONTAINER_NAME,
                        PARKING_LOT,
                        PARKING_SPOT
                    );

                    var cnt_obj = {}
                    cnt_obj['m2m:sc_spot'] = spot;
                    resp = keti_mobius.update_flex_cnt(p_path, cnt_obj);
                }
            }

            callback(sur, cinObj, rqi, to, pc, sgnObj.sur);
        }
        else {
            console.log('[mqtt_noti_action] message is not noti');
        }
    };





}