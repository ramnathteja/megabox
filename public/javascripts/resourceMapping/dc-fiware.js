const jsonpath = require('jsonpath');
const moment = require('moment');


const getKeys = function (obj, arr) {
    Object.keys(obj).forEach(el => {
        if (typeof (obj[el]) === 'object' && obj[el] !== null && !(Array.isArray(obj[el]))) {
            getKeys(obj[el], arr); //TODO:add type value 
        } else {
            arr.push(el);
        }
    });
    return arr;
}

exports.wdcToNgsi = function (oneM2M_response, callback) {
    var rep = jsonpath.value(oneM2M_response, '$..rep');
    var resourceType = (Object.keys(rep));
    var obj = rep[resourceType[0]];
    var keys = getKeys(obj, []);
    var mappedNGSI = {};
    keys.forEach(el => {
        switch (el) {
            case 'et':
                break;
            case 'cs':
                break;
            case 'ct':
                break;
            case 'lt':
                break;
            case 'pi':
                break;
            case 'cnd':
                break;
            case 'ri':
                break;
            case 'ty':
                break;
            case 'rn':
                mappedNGSI.id = jsonpath.value(oneM2M_response, '$..type') +"_"+ jsonpath.value(oneM2M_response, '$..rn');
                break;
            case 'type':
                mappedNGSI.type = jsonpath.value(oneM2M_response, '$..type');
                break;
            case 'coordinates':
                console.log([jsonpath.value(oneM2M_response, '$..'+el)[1],jsonpath.value(oneM2M_response, '$..'+el)[0]])
                mappedNGSI['location'] = {
                    "type": "geo:json",
                    "value": {
                        "type":"Point",
                        "coordinates":[jsonpath.value(oneM2M_response, '$..'+el)[1],jsonpath.value(oneM2M_response, '$..'+el)[0]]
                    }
                }
                break;
            default:
                switch(typeof (jsonpath.value(oneM2M_response, '$..' + el))){
                    case 'string':
                            mappedNGSI[el] = {
                                "type": "Text",
                                "value": jsonpath.value(oneM2M_response, '$..' + el)
                            };
                            break;
                    case 'number':
                            mappedNGSI[el] = {
                                "type": "integer", //delimiter and change type string to text
                                "value": jsonpath.value(oneM2M_response, '$..' + el)
                            };
                            break;
                }
        }
    });
    // console.log(mappedNGSI);
    callback(mappedNGSI);
}