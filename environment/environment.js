const environment_development={
  dc_baseUrl:'http://127.0.0.1:7599/wdc_base',

  
};

const environment_production={
  dc_baseUrl:'',
};


if( process.env.NODE_ENV && process.env.NODE_ENV === 'production' )
  module.exports=environment_production;
else
  module.exports=environment_development;