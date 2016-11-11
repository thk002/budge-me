var express = require('express');
var router = express.Router();
var fs = require('fs');
var dailyJSON = require('jsonfile');

// var dailyRewards = 'public/JSON/dailyRewards.json'
// dailyJSON.readFile(dailyRewards, function(err, dailyRewards) {
//   console.dir(dailyRewards)
// })

/*
 * Parse JSON files for each item type ------------------------------------------
 * These will be used in order to render rewards and penalties onto '/social' in the "/items" page
 */

var dailyYes = JSON.parse(fs.readFileSync('public/JSON/dailyRewards.json', 'utf8'));
var dailyNo = JSON.parse(fs.readFileSync('public/JSON/dailyPenalty.json', 'utf8'));
var weeklyYes = JSON.parse(fs.readFileSync('public/JSON/weeklyRewards.json', 'utf8'));
var weeklyNo = JSON.parse(fs.readFileSync('public/JSON/weeklyPenalty.json', 'utf8'));

/*
 * ROUTERS for each page in budge me---------------------------------------------
 */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/* GET social page. */
router.get('/social', function(req, res, next) {
	// var dailyFile = JSON.parse(fs.readFileSync('public/JSON/dailyRewards.json', 'utf8'));
 // 	res.render('social', {daily: dailyFile});
 		res.redirect('/items');
});
/* GET budget page. */
router.get('/budget', function(req, res, next) {
  res.render('budget');
});
/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});
/* GET setting page. */
router.get('/settings', function(req, res, next) {
  res.render('settings');
});
/* GET TBD page. */
router.get('/TBD', function(req, res, next) {
  res.render('TBD');
});
/* GET items page. */
router.get('/items', function(req, res, next) {
	
	var dailyItem=[];
	// dailyItem.push("Test")
	var weeklyItem=[];

  if (req.query.daily == 'yes') {
  	//Need to add a random number generator
  	dailyItem.push(dailyYes.dailyRewards[0])
  	// res.send(dailyItem)

  }
  else {
  	//get daily rewards item
  	dailyItem.push(dailyNo.dailyPenalty[0])
  	// res.send(dailyItem)
  }

  if (req.query.weekly == 'yes') {
  	//get weekly rewards item
  	weeklyItem.push(weeklyYes.weeklyRewards[0])
   	// res.send(weeklyItem)

  }
  else {
  	//get weekly rewards item
 	weeklyItem.push(weeklyNo.weeklyPenalty[0])
   	// res.send(weeklyItem)
  }
  console.log(dailyItem);
  // render daily/weekly items based on quest response
  res.render('social', {daily: dailyItem, weekly: weeklyItem});
  // res.send("Reached Items route")

});

module.exports = router;
