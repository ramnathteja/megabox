const environment_development={
   
};

const environment_production={
  
};


if( process.env.NODE_ENV && process.env.NODE_ENV === 'production' )
  module.exports=environment_production;
else
  module.exports=environment_development;