// if ("geolocation" in navigator) {
//   console.log("available")
// } else {
//   console.log("not available")
// }

// function userPosition(){
// 	var userLocale = navigator.geolocation.getCurrentPosition(function(position){
// 		console.log(position.coords); 
// 	})
// }
// userPosition();

function mapsy(){
	var map = new google.maps.Map(document.getElementById('map'),{
	zoom: 4,
	center: new google.maps.LatLng(-25.344, 131.036)
});
}

// navigatore.geolocation.getCurrentPosition(function(position) {
//   console.log(position.coords.latitude, position.coords.longitude);
// });

