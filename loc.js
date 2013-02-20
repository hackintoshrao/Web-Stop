window.onload = getLocation ;

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
}
