const environment_development = {
  dc_acpValue:'SM',
  dc_baseUrl: 'http://127.0.0.1:7599/wdc_base',
  dc_subscriptionServer: 'mqtt://203.253.128.164:1883',
  dc_subscriptionTag: '/ram?ct=json',
  orion_postData: 'http://203.253.128.164:1026/v2/entities/',
  orion_updateData: 'http://203.253.128.164:1026/v2/entities/',
  orion_subscriptionUrl:'http://localhost:1026/v2/subscriptions',
  orion_notificationUrl:'http://docker.for.mac.localhost:3000/ram'

};

const environment_production = {
  dc_baseUrl: '',
  dc_subscriptionServer:'',
  dc_subscription: '',
  orion_postData:''
};


if (process.env.NODE_ENV && process.env.NODE_ENV === 'production')
  module.exports = environment_production;
else
  module.exports = environment_development;