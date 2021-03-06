const environment_development = {
  dc_acpValue:'SM',
  dc_baseUrl: 'http://203.253.128.179:7599/wdc_base',
  dc_subscriptionServer: 'mqtt://203.253.128.179:1883',
  dc_subscriptionTag: '/ram?ct=json',
  dc_listeningTag:'/oneM2M/req/+/ram/#',
  orion_postData: 'http://203.253.128.164:1026/v2/entities/',
  orion_updateData: 'http://203.253.128.164:1026/v2/entities/'

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