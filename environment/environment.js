const environment_development={
  dc_baseUrl:'http://127.0.0.1:7599/wdc_base',
  dc_subscription:'/oneM2M/req/+/ram/json',

  orion_postData:'http://203.253.128.164:1026/v2/entities/',
  
};

const environment_production={
  dc_baseUrl:'',
  dc_subscription:'',
};


if( process.env.NODE_ENV && process.env.NODE_ENV === 'production' )
  module.exports=environment_production;
else
  module.exports=environment_development;