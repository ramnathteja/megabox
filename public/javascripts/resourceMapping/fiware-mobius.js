const jsonpath = require('jsonpath');

exports.ngsiToWdc = function (ngsiResponse, callback) {
    var mappedWDC = {
        "sc:parkingSpot": {
            "rn": jsonpath.value(ngsiResponse, '$..id'),
            "ty": 28,
            "pi": "SkmnDBfeHX",
            "ri": "SymEIuUHrQ",
            "type": "ParkingSpot",
            "name": jsonpath.value(ngsiResponse, '$..name.value'),
            "category": jsonpath.value(ngsiResponse, '$..category.value'),
            "location": {
                "type": "Point",
                "coordinates": jsonpath.value(ngsiResponse, '$..coordinates')
            },
            "status": jsonpath.value(ngsiResponse, '$..status.value'),
            "userType": "Disabled",
            "refParkingLot": "wdc_base/sync_parking/parkingLot_1"
        }
    }
    callback(mappedWDC);
}