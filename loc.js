var map=null;

var ourCoords = { 
	latitude:13.3500 ,
	longitude :74.7500
};

window.onload = getLocation ;

function addMarker(map,google_latLng,title,content) {
	var markerOptions = { 
		position: google_latLng,
		map: map,
		title: title , 
		clickable: true 
 	};
	var Info_Window_Options = { 
		content : content , 
		position : google_latLng 
	};
	var marker = new google.maps.Marker(markerOptions);
	var infoWindow = new google.maps.InfoWindow(Info_Window_Options);
	google.maps.event.addListener(marker,"click",function() {
		infoWindow.open(map);
	});
}	
	

function showMap(coords) {
	var googleLatAndLong = new google.maps.LatLng(coords.latitude,coords.longitude);
	var title_for_pin = "Here you are !!";
  	var content_for_click = "Your Location: " +" " + "Latitude: " + coords.latitude + " " + "Longitude: " +  coords.longitude ; 
	var mapOptions	= {
		zoom: 10, 
		center: googleLatAndLong ,
		mapTypeId: google.maps.MapTypeId.HYBRID	
	};
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv,mapOptions);
	addMarker(map,googleLatAndLong,title_for_pin,content_for_click);
}	



function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);
	var Radius = 6371; // radius of the Earth in km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
Math.cos(startLatRads) * Math.cos(destLatRads) *
Math.cos(startLongRads - destLongRads)) * Radius;
	return distance ;
}
function degreesToRadians(degrees) {
var radians = (degrees * Math.PI)/180;

return radians;
}
function getLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation);
	}
	else {
		alert("Doesnt support Geolocation");
	}
}
function displayLocation(position) {
	var latitude = position.coords.latitude ; 
	var longitude = position.coords.longitude ;

	var div = document.getElementById("Location");
	div.innerHTML = "You are at latitude: " + latitude + " Longitude: " + longitude;
	var km = computeDistance(position.coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "Distance: " + km ;
	showMap(position.coords);
}


