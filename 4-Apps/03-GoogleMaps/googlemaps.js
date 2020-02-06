
//checking to see if the browser can find the geolocation information
if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) { //used to get current position of the device
        let latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude); //sets the latitude and longitude
        var myOptions = { //sets the display of the map
            zoom: 8,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            disableDefaultUI: false,
        }

        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); //creates the map and places it into map_canvas

        //declares the custom icon equal to the img link
        var iconBase = 'https://lh3.googleusercontent.com/proxy/H5UPvbG5Go7MMkGa0Qfx6UqfpZbuoSeK9aDwR7P-XLoqx2M-qoWoRh0JH2UncuvIGUgJbeBINeuWcRbDZ8as3LvF5Bz-YiCEwVFUY5L1icaglyh3cNHX-6rZwuotx6SRZHUJNSxuL7l7FJoYs3hCckJo';

        //creates the marker
        var marker = new google.maps.Marker({
            position: latlng,
            icon: iconBase,
            map: map
        });

        //creates the content for the content window
        let contentString = '<div id="content"><h2 id="firstHeading" class="firstHeading">Custom info window</h2><p>This is a cool custom info window.</p></div>';

        //creates the content window
        let infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        //tells the browser what to do when the marker is clicked
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

    });

} else { //if geolocation isn't found, create a p tag and assign it the error string
    var para = document.createElement('p');
    para.textContent = 'Argh, no geolocation!';
    document.body.appendChild(para);
}