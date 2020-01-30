# megabox
An Interworking proxy entity for the oneM2M compilant paltform WDC and FIWARE Platform's Orion Context Broker.
## Version
v1.2.0

## Introduction
Megabox is a proxy between oneM2M compilent WDC platform and orion context broker of FIWARE platform. This proxy takes advantage of the common service functionalities of WDC platform by subscribing to parking lot entity and mapping the oneM2M resources to NGSI data format when there is an update in the parking lot information.

## System Stucture
Working flow of the Mca-NGSI Adapot is as follows: 
1. The proxy starts by listening to the entites that are listed in the listening-list.json file. 
2. When ever there is an update in any of the entity that were listed in listening-list.json file, a notification even is fired in the WDC which will caught by the proxy through its subscription.
3. Once notification is received, proxy will commence its second functionality of mapping oneM2M resource to NGSI data format. 
4. Once resource mapping is finished, the now NGSI data is posted to ORION CONTEXT BROKER. 

## Installation
Since the Adaptor is developed based on the Node.js, it needs to be installed
To build full environment, WDC and Orion-broker are also need to be installed

## Configuration
Configura  WDC and Orion Context Broker, Ip and port in the environment.js file.

## Run
Use node.js application execution command as below

node app.js

## Author
Chekka Ramnath Teja (ch.ramnathteja@gmail.com)
