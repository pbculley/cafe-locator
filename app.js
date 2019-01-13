var express = require("express");
var app = express(); 
var path = require("path"); 
var yelp = require("yelp-fusion");
var request = require("request");
var bodyParser = require("body-parser");

app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let client = yelp.client("wvgTbG0vFrnfDXLftB1LhfurlDZmbsl3WhvaPaJEd0lAeUDnbqiT1kyilHsFw88S4U28E4Ywlu_vLm7PnUqcq_P4zl6aKB5SL14cMHq3GfVX9gIe25WXOho8srMEXHYx"); 

app.get("/", function(req,res){
	res.render("landing");
});

app.post("/", async function(req, res){
    client.search({
	  term: 'punk',
	  location: req.body.location, 
	  limit: 10
	}).then(response => {
		var businesses = response.jsonBody.businesses;
		var ids = businesses.map(el => el.id);
		var imgs = businesses.map(el => el.image_url);
		var coName = businesses.map(el => el.name);
		var searchResults = {
			name: coName,
			location: [], 
			imgs: imgs,
			displayPhone: [],
			hours: hours
		}

		var hours; 
		async function delay(ms){
			return new Promise(resolve => {
				setTimeout(resolve,ms)
			})
		}

		async function timeout(){
			var hours = ids.map(el => {
				return client.business(el).then(async response => {
					var hours =  response.jsonBody.hours;
					console.log(hours); 
				}); 
				return hours; 
			})
			var result = await hours; 
			return result; 
		}
	
		// async function testing(){
		// 	await delay(2000); 
		// 	test = "test 1";  
		// }

		async function results(){
			var result = await timeout(); 
			for(var x = 0; x < businesses.length; x++){
					searchResults.location.push(businesses[x].location['display_address']); 
					searchResults.displayPhone.push(businesses[x].display_phone); 
			}
			return result;
		}
	results().then(result => res.render('search', {searchResults:searchResults, hours: hours}));
}).catch(e => {
  console.log(e);
});
});

app.get("/cafes", function(req,res){
	res.render("cafes", {cafes:cafes});
});
app.post("/cafes", function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var newCafe = {
		name: name, 
		image: image
	}
})
app.get("/cafes/new", function(req,res){
	res.render("new.ejs")
})
app.listen(3000);


			// setTimeout(function(x){
			// 	client.business(idArray[x]).then(response => {
			// 	var hours = response.jsonBody.hours.map(el => {
			// 		return el.open;
			// 	});


			// 	openHours = hours.map(lo => {
			// 		for(var x = 0; x < lo.length; x++){
			// 			return lo.map(hrs => {
			// 				var start = Number(hrs.start); 
			// 				var end = Number(hrs.end);
			// 			return findDay(hrs.day) + " " + findTime(hrs.start) + " - " + findTime(hrs.end); 
			// 			}); 
			// 		}
			// 	});	
			// 	console.log(openHours); 
			// 	});  
		
			// },delay*x,x)

						// function findDay(y){
			// 	var dayArr = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun",]; 
			// 	return dayArr[y]; 
			// 	 }

			// function findTime(x){
			// 	var pm = "" + (x - 1200);
			// 	var am = "" + x; 
			// 	if(x == 1200){
			// 		return "12:00 p.m"; 
			// 	}
			// 	if( x >= 1200){
			// 		return pm.replace(/00$/, ":") + pm.slice(-2) + " p.m";
			// 	}
			// 		return am.replace(/00$/, ":") + am.slice(-2) + " a.m.";
			// 	}




