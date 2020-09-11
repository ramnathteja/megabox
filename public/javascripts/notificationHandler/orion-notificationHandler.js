const express = require('express');
const router = express.Router();
const environment = require('../../../environment/environment');
const cinCreate = require('../wdc/wdc-createCIN');
const cinUpdate = require('../wdc/wdc-updateFLX');
const resourceMap = require('../resourceMapping/fiware-dc');


exports.notificationHandler = function () {
    //recieve notification from the wdc


}