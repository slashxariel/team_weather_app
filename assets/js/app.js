let today = new Date();
document.getElementById('time').innerHTML = today.toLocaleTimeString();
document.getElementById('date').innerHTML = today.toLocaleDateString();



navigator.geolocation.getCurrentPosition(function(position) {
        
    let latitude = position.coords.latitude;        
    let longitude = position.coords.longitude;

    function weatherBallon(position) {

        fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + "66914e94781e7043c66bd385374a114d")
        .then(function(resp) { 
            return resp.json() 
        }) // Convert data to json
        .then(function(data) {
            drawWeather(data);
        })
        .catch(function() {
            // catch any errors
        }); 
    }
    function drawWeather(data) {
        let celcius = Math.round(parseFloat(data.main.temp)-273.15);
        let fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32);
        let description = data.weather[0].description; 
        document.getElementById('temp').innerHTML = celcius + '&deg;';
        document.getElementById('location').innerHTML = data.name;
    } 
    
    window.onload = function() {
        weatherBallon(position);
    }
    
});
     
    
