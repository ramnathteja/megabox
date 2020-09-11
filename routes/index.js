const express = require('express');
const router = express.Router();
const resourceMap = require('../public/javascripts/resourceMapping/fiware-dc');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res){
  console.log("request came");

  res.send("about, world!")
});

router.post('/ram', function(req, res){
  // console.log(req.body);
  resourceMap.ngsiToWdc(req.body,()=>{
    
  });
  res.sendStatus(204);//FIXME: need to send appropriate status code back to broker 
});




module.exports = router;
