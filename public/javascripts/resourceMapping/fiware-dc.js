const jsonpath = require('jsonpath');
/**
 FIXME: change to generic based!! blindly populate whatever you find in ngsi
 data model agonastic 
 */
const getKeys = function (obj, arr) {
    Object.keys(obj).forEach(el => {
        arr.push(el);
    });
    return arr;
}

exports.ngsiToWdc = function (ngsiResponse, callback) {
    console.log(ngsiResponse.data[0]);
    console.log("printing the msg inside f-dc mapping!!!!");
    var keys = getKeys(ngsiResponse.data[0],[]);
    console.log("these are our keys ",keys);
    var mappedOneM2M = {};
    mappedOneM2M[jsonpath.value(ngsiResponse, '$..type')] = {}; 
    keys.forEach(el => {
        switch(el){
            case 'type' :
                break;
            case 'id':
                mappedOneM2M[jsonpath.value(ngsiResponse, '$..type')]['rn'] = jsonpath.value(ngsiResponse, '$..'+el);
                break;
            default:
                mappedOneM2M[jsonpath.value(ngsiResponse, '$..type')][el] = jsonpath.value(ngsiResponse, '$..'+el+'.value');
                break; 
        }   
    });
    console.log(mappedOneM2M);
    var mappedWDC = {
        "sc:parkingSpot": { //what do with resourceType key ?

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