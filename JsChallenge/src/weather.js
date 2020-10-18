const weather = document.querySelector('.js-weather')

const API_KEY = 'e638734df5fd98d26258937c01adea8f'; // OpenWeatherMap API
const COORDS = 'coords'

// F(fahrenheit, 화씨)에서 C(celsius, 섭씨)로 바꿔야 한다.
// C를 사용하려면 'metric units(미터법)', F를 사용하려면 'imperial units(야드 파운드법)'을 사용해야 한다.
// "&units=metric"을 URL 마지막에 추가해주면 된다.
function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json()
    }).then(function(json) { //json데이터가 준비되면 해당 json데이터를 사용한다.
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    })
    // api 호출 후 console-Network에서 확인할 수 있다.
    // then이 하는 역할은 데이터가 완전히 넘어온 후(fetch가 끝난 후) 함수를 호출하는 역할이다.
    // Promise {<pending>} : 가져온 데이터를 처리중이라는 의미.
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    console.log(position.coords);
    const latitude = position.coords.latitude,
        longitude = position.coords.longitude,
        coordsObj = {
            latitude,
            longitude
        };
        // coordsObj = {
        //     latitude: latitude,
        //     longitude: longitude
        // };
        saveCoords(coordsObj);
        getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('can not access geo location!');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoored() {
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null) {
        askForCoords();
    } else {
        // getWeather
        const parseCoords = JSON.parse(loadCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}


function init() {
    loadCoored();
}

init();