const jsonpath = require('jsonpath');

exports.wdcToNgsi = function(dcResponse, callback) {
    var mappedNGSI = {
        "id": jsonpath.value(dcResponse, '$..rn'),
        "type": "ParkingSpot",
        "category":{
            "type":"Text",
            "value": jsonpath.value(dcResponse, '$..category')
        },
        "name":{
            "type":"Text",
            "value":jsonpath.value(dcResponse, '$..name')
        },
        "location":{
            "type":"geo:json",
            "value":{
                "type":"Point",
                "coordinates":jsonpath.value(dcResponse, '$..coordinates')
            }
        },
        "dateModified": {
            "type":"DateTime",
            "value":jsonpath.value(dcResponse, '$..lt')
        },
        "status": {
            "type":"Text",
            "value":jsonpath.value(dcResponse, '$..status')
        }
    }
    callback(mappedNGSI);
}