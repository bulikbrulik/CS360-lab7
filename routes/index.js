var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root:  'public' });
});
router.get('/getcity',function(req,res,next) {
            console.log("In getcity route");
	var myRe = new RegExp("^" + req.query.q);
          console.log(myRe);
	fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
            if(err) throw err;
            var cities = data.toString().split("\n");
            var jsonresult = [];
        for(var i = 0; i < cities.length; i++) {
          var result = cities[i].search(myRe); 
          if(result != -1) {
             jsonresult.push({city:cities[i]});
          } 
        }   
        console.log(jsonresult); 
        res.status(200).json(jsonresult);
        });
});
router.get('/getname',function(req,res,next) {
            console.log("In getname route");
	var myRe = new RegExp("^" + req.query.q.toUpperCase());
          console.log(myRe);
	fs.readFile(__dirname + '/dist.all.last.txt',function(err,data) {
            if(err) throw err;
            var names = data.toString().split("\n");
            var jsonresult = [];
        for(var i = 0; i < names.length; i++) {
          var result = names[i].search(myRe); 
          if(result != -1) {
             jsonresult.push({name:names[i]});
          } 
        }   
        console.log(jsonresult); 
        res.status(200).json(jsonresult);
        });
});


module.exports = router;
