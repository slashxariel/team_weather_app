let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];



let today = new Date();
document.getElementById('time').innerHTML = today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
document.getElementById('date').innerHTML = days[today.getDay()] + " " + today.toLocaleDateString();




document.getElementById('tomorrow').innerHTML = days[today.getDay() + 1]; 
document.getElementById('day_after_tomorrow').innerHTML = days[today.getDay() + 2]; 
document.getElementById('three_days_after_tomorrow').innerHTML = days[today.getDay() + 3]; 
document.getElementById('four_days_after_tomorrow').innerHTML = days[today.getDay() + 4];
document.getElementById('five_days_after_tomorrow').innerHTML = days[today.getDay() + 5];
document.getElementById('six_days_after_tomorrow').innerHTML = days[today.getDay() +6];

function getWeatherData() {
	const options = {
		enableHighAccuracy: true
	};
	navigator.geolocation.getCurrentPosition(
		pos => {
			fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + pos.coords.latitude + "&lon=" + pos.coords.longitude + "&appid=" + "66914e94781e7043c66bd385374a114d")
            .then(function(resp) { 
                return resp.json() 
            })
            .then(function(data) {
                drawWeather(data);
            })
            .catch(err => console.error(err));
		},
		error => console.error(error),
		options
	);
}

function drawWeather(data) {
    let celcius = Math.round(parseFloat(data.main.temp)-273.15);
    let fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32);
    let description = data.weather[0].description; 
    let kmh = Math.round(parseFloat(data.wind.speed)*3.6);
    document.getElementById('temp').innerHTML = celcius + '&deg;';
    document.getElementById('location').innerHTML = data.name;
    document.getElementById('wind_speed').innerHTML = kmh + ' km/h';
    document.getElementById('rain').innerHTML = data.humidity + ' mm';
} 

window.onload = function() {
    getWeatherData();
}

let searchBtn = document.getElementById('search-btn');
let search = document.getElementById('search');
let local = document.getElementById('location');
searchBtn.addEventListener('click', () => {
    search.style.display = 'inline-block';
    search.focus();
    local.style.display = 'none';
    search.setAttribute('placeholder', 'Digite a cidade');
}) 

