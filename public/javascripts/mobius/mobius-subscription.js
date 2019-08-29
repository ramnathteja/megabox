const cl = require('./ConfigLoader');
let util = require('util');
const MOBIUS_SERVER_IP = '192.168.0.16';

exports.createSubscription = function (sensor_ids) {    
    let config = cl.get_resource_config();
    let keti_mobius = new mobius();
    keti_mobius.set_mobius_info(config.cse.cbhost, config.cse.cbport);


    for (let i = 0; i < 3; i++) {
        if (i < 1) {
            PARKING_LOT = 'yt_lot_1'
        } else if (i < 2) {
            PARKING_LOT = 'yt_lot_2'
        } else if (i < 3) {
            PARKING_LOT = 'yt_lot_3'
        }
        path = util.format('/%s/%s/%s',
            config.cse.cbname,
            ROOT_CONTAINER_NAME,
            PARKING_LOT
        );

        let nu = 'mqtt://' + MOBIUS_SERVER_IP + ':' + config.cse.mqttport + '/' + config.ae.aeid + '?ct=json';

        let sub = {
            'm2m:sub': {
                'rn': 'sub_' + PARKING_LOT,
                'enc': {
                    'net': [3]
                },
                'nu': [nu]
            }
        };

        let sub_current = 'sub_' + PARKING_LOT;
        let sub_path = path + '/' + sub_current;

        resp = keti_mobius.retrieve_sub(sub_path);

        if (resp.code == 404) {
            keti_mobius.create_sub(path, sub);
        } else if (resp.code == 200) {
            console.log('subsription resource does exist');
        }

        for (let i = 0; i < sensor_ids.length; i++) {
            let PARKING_LOT = null;
            let current = 'spot_' + sensor_ids[i];
            if (sensor_ids[i] <= 200) {
                PARKING_LOT = 'yt_lot_1'
            } else if (sensor_ids[i] <= 400) {
                PARKING_LOT = 'yt_lot_2'
            } else if (sensor_ids[i] <= 700) {
                PARKING_LOT = 'yt_lot_3'
            }
            path = util.format('/%s/%s/%s/%s',
                config.cse.cbname,
                ROOT_CONTAINER_NAME,
                PARKING_LOT,
                current
            );
            let nu = 'mqtt://' + MOBIUS_SERVER_IP + ':' + config.cse.mqttport + '/' + config.ae.aeid + '?ct=json';

            let sub = {
                'm2m:sub': {
                    'rn': 'sub_' + sensor_ids[i],
                    'enc': {
                        'net': [3]
                    },
                    'nu': [nu]
                }
            };
            let sub_current = 'sub_' + sensor_ids[i];
            let sub_path = path + '/' + sub_current;

            let resp = keti_mobius.retrieve_sub(sub_path);
            if (resp.code == 404) {
                keti_mobius.create_sub(path, sub);
            } else if (resp.code == 200) {
                console.log('subsription resource does exist');
            }
        }
        console.log("finished into the funciton********");

    }
}