const jsonpath = require('jsonpath');
const moment = require('moment');

exports.wdcToNgsi = function (dcResponse, callback) {
    var date = moment(jsonpath.value(dcResponse, '$..lt'), "YYYYMMDDThhmmss");
    var coordinates = jsonpath.value(dcResponse, '$..coordinates');
    var mappedNGSI = {
        "id": jsonpath.value(dcResponse, '$..rn'),
        "type": jsonpath.value(dcResponse, '$..type'),
        "category": {
            "type": "Text",
            "value": jsonpath.value(dcResponse, '$..category')
        },
        "name": {
            "type": "Text",
            "value": jsonpath.value(dcResponse, '$..name')
        },
        "location": {
            "type": "geo:json",
            "value": {
                "type": "Point",
                "coordinates": [coordinates[1], coordinates[0]]
            }
        },
        "dateModified": {
            "type": "DateTime",
            "value": date.format("YYYY-MM-DDThh:mm:ss") + "Z"
        },
        "status": {
            "type": "Text",
            "value": jsonpath.value(dcResponse, '$..status')
        }
    }
    callback(mappedNGSI);
}