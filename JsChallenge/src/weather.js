const weatherZone = document.querySelector('.weatherZone'),
    API_KEY = 'e638734df5fd98d26258937c01adea8f',
    COORDS = 'coords';
let temperature, placeName;

function printWeather() {
    weatherZone.innerHTML = `<p><i class="fas fa-map-marker-alt"></i> ${placeName}, ${temperature}°C<p>`;
}

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
            temperature = json.main.temp;
            placeName = json.name;
            console.log(temperature, placeName);
            printWeather();
    }); 
}

function saveCoordsObj(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    console.log(position);
    console.log(position.coords.latitude);
    const latitude = position.coords.latitude,
        longitude = position.coords.longitude,
        coordsObj = {
            latitude,
            longitude
        };
        saveCoordsObj(coordsObj);
        getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('can not access geo location!');
}

function askForCoords() {
    console.log('askForCoords');
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoored() {
    console.log('loadCoored');
    const loadCoords = localStorage.getItem(COORDS);
    console.log(loadCoords);
    if(loadCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoored();
}

init();