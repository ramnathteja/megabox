const request = require("request");
const environment = require('../../../environment/environment');

exports.mobius = function () {
    let server_ip = environment.CSEInfo;
    let ae_id = environment.Origin;

    this.Create_resource = function (path, resourceType, body) {
        console.log('Create Sub: POST ->'+ path)
        let options = {
            method: 'POST',
            url: 'http://' + server_ip + path,
            headers:
            {
                'Content-Type': 'application/json;ty='+ resourceType,
                'X-M2M-RI': '123',
                'X-M2M-Origin': ae_id,
                Accept: 'application/json'
            },
            body
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
        });
    }

    this.Retrieve_resource = function (path) {
        console.log('Retrieve Sub: GET ->'+ path)
        let options = {
            method: 'GET',
            url: 'http://' + server_ip + path,
            headers:
            {
                'X-M2M-RI': '234',
                'X-M2M-Origin': ae_id,
                Accept: 'application/json'
            },
            body
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
        });
    }

    this.Delete_resource = function (path) {
        console.log('Delete resource: DELETE ->'+ path)
        let options = {
            method: 'DELETE',
            url: 'http://' + server_ip + path,
            headers:
            {
                'X-M2M-RI': '345',
                'X-M2M-Origin': ae_id,
                Accept: 'application/json'
            },
            body
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
        });
    }

}