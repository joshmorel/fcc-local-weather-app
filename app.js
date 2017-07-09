
const localWeather =

(function IIFE(document) {
  "use strict";

  function displayImage(conditionCode) {

    const codeNum = parseInt(conditionCode, 10);
    const baseUrl = 'https://source.unsplash.com/';
    const defaultImageId = {id: '3oyeaivM_fE', userName: '@qstevenson', fullName: 'Quin Stevenson'};
    const bgImg = document.querySelector('.bg-img');
    const creditBadge = document.querySelector('.unsplash-badge');
    const creditName = document.querySelector('.unsplash-name');
    const toLoad = document.querySelectorAll('.to-load');

    const image = imgFromCode(codeNum);
    bgImg.style.backgroundImage = `url(${baseUrl}${image.id})`;
    creditBadge.setAttribute('href', `http://unsplash.com/${image.userName}?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge`);
    creditBadge.setAttribute('title', `Download free do whatever you want high-resolution photos from ${image.fullName}`);
    creditName.innerText = image.fullName;

    toLoad.forEach(el => el.style.visibility = "visible");

    function imgFromCode(conditionCode) {
      switch (conditionCode) {
        case 0: //'tornado'
          return {id: '8eFbe3jQZ7Y', userName: '@tulen', fullName: 'Tulen Travel'};
          break;
        case 1: //tropical storm
        case 2: //hurricane
        case 3: //severe thunderstorms
        case 4: // thunderstorms
          return {id: 'jh2KTqHLMjE', userName: '@jeremythomasphoto', fullName: 'Jeremy Thomas'};
          break;
        case 5: //	mixed rain and snow
        case 6: //	mixed rain and sleet
        case 7: //	mixed snow and sleet
        case 18: //	sleet
          return {id: 'T7RlFC8dH60', userName: '@lolaguti', fullName: 'Lola Guti'};
          break;
        case 8: //	freezing drizzle
        case 10: //	freezing rain
          return {id: 'DqGsjytXOXg', userName: '@andy_walton', fullName: 'Andrew Walton'};
          break;
        case 9: //	drizzle
        case 11: // showers
        case 12: //	showers
        case 39: //	scattered thunderstorms
        case 40: //	scattered showers
          return {id: 'Nw_D8v79PM4', userName: '@r_shayesrehpour', fullName: 'reza shayestehpour'};
          break;
        case 17: //	hail
        case 35: //	mixed rain and hail
          return {id: 'F-t5EpfQNpk', userName: '@eutahm', fullName: 'Eutah Mizushima'};
          break;
        case 19: //	dust
          return {id: 'wdMWMHXUpsc', userName: '@sickle', fullName: 'Sergey Pesterev'};
          break;
        case 20: //	foggy
          return {id: 'IOJE_IE1h-A', userName: '@amundroed', fullName: 'Amund Røed'};
          break;
        case 21: //	haze
        case 22: //	smoky
          return {id: 'jYChcwbXqnI', userName: '@t_g_m_l', fullName: 'Thomas Morter-Laing'};
          break;
        case 15: //blowing snow
        case 23: //	blustery
        case 24: //	windy
          return {id: 'XHZhI_Zy6TM', userName: '@lesanderson', fullName: 'Les Anderson'};
          break;
        case 25: //	cold
          return {id: 'Gw31jigR9j4', userName: '@robertbye', fullName: 'Rob Bye'};
          break;
        case 26: //	cloudy
        case 27: //	mostly cloudy (night)
        case 28: //	mostly cloudy (day)
          return {id: 'V4qjYCac7y8', userName: '@atronyx', fullName: 'Artem Anokhin'};
          break;
        case 29: //	partly cloudy (night)
          return {id: 'g3QBQto9Jt0', userName: '@matthewkane', fullName: 'Matthew Kane'};
          break;
        case 30: //	partly cloudy (day)
        case 44: //	partly cloudy
          return {id: 'BTubi6qaY6Q', userName: '@aaronburden', fullName: 'Aaron Burden'};
          break;
        case 31: //	clear (night)
          return {id: 'tqzqzH8hb5A', userName: '@sveninho', fullName: 'Sven Scheuermeier'};
          break;
        case 32: //	sunny
        case 34: //	fair (day)
          return {id: 'u7ldh_tgH3s', userName: '@dakotaroosphotography', fullName: 'Dakota Roos'};
          break;
        case 33: //	fair (night)
          return {id: '2uEqc-9P3oQ', userName: '@jeremythomasphoto', fullName: 'Jeremy Thomas'};
          break;
        case 36: //	hot
          return {id: 'qQfb5WBDB5o', userName: '@adriencoquet', fullName: 'Adrien Coquet'};
          break;
        case 37: //	isolated thunderstorms
        case 38: //	scattered thunderstorms
        case 45: //	thundershowers
        case 47: //	isolated thundershowers
          return {id: 'uxwKpUvwGuY', userName: '@jayd', fullName: 'Jay Dantinne'};
          break;
        case 13: //	snow flurries
        case 14: //	light snow showers
        case 16: //	snow
        case 41: //	heavy snow
        case 42: //	scattered snow showers
        case 43: //	heavy snow
        case 46: //	snow showers
          return {id: '-iK6ZxQC6EU', userName: '@markrabephotography', fullName: 'Mark Rabe'};
          break;
        case 3200: //	not available
        default:
          return defaultImageId;
          break;
      }
    }
  }

  function handleFailure(err) {
    // console.log(err.message);
    //Show default image
    displayImage(3200);
    const weatherCard = document.querySelector('.weather-card');
    weatherCard.innerHTML = `<p>Sorry we couldn't retrieve the weather.<hr/><p>Error: ${err.message}</p>`;
  }

  function getWeatherFromLocation() {

    return new Promise((resolve, reject) => {

      function getWeatherFromPosition(position) {
        const crd = position.coords;
        const yqlSubQuery = `SELECT woeid FROM geo.places(1) WHERE text="(${crd.latitude},${crd.longitude})"`;
        const endpoint = `https://query.yahooapis.com/v1/public/yql?q=SELECT location, item.condition FROM weather.forecast WHERE u = "c" AND woeid IN (${yqlSubQuery})&format=json`;
        fetch(endpoint)
          .then(blob => blob.json())
          .then(data => {
            if(data.error) {
              reject(new Error(data.error.description));
            }
            resolve(data.query.results.channel);
          })
          .catch((err) => reject(err));
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          getWeatherFromPosition,
          (err) => reject(err),
          {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
        );
      } else {
        reject(new Error("Geolocation not supported"));
      }

    });
  }

  function renderWeatherData(weather, useFahrenheit) {
    const condition = weather.item.condition;
    const conditionsDiv = document.querySelector('.condition');
    const temperatureDiv = document.querySelector('.temperature > .value');
    const unitsDiv = document.querySelector('.active-units');
    const locationDiv = document.querySelector('.location');

    const units = useFahrenheit ? "F" : "C";
    conditionsDiv.innerText = condition.text;
    temperatureDiv.innerText = condition.temp;
    unitsDiv.innerHTML = `&deg;${units}`;
    locationDiv.innerText = weather.location.city;
  }

  function loadWeatherPage() {
    getWeatherFromLocation().then(data => {
      renderWeatherData(data);
      displayImage(data.item.condition.code);
    }).catch((err) => {
      handleFailure(err);
    });
  }

  function convertTemperature() {
    const temperatureDiv = document.querySelector('.temperature > .value');
    const currentTemp = parseInt(temperatureDiv.innerText,10);
    const activeUnits = document.querySelector('.units > .active-units');
    const inactiveUnits = document.querySelector('.units > .btn-convert-units');

    if (!currentTemp) return;

    if (inactiveUnits.innerText === 'F') {
      temperatureDiv.innerText = Math.round((currentTemp * 9 / 5) + 32);
      activeUnits.innerHTML = '&deg;F';
      inactiveUnits.innerText = 'C';
    } else if (inactiveUnits.innerText === 'C') {
      temperatureDiv.innerText = Math.round((currentTemp - 32)*5/9);
      activeUnits.innerHTML = '&deg;C';
      inactiveUnits.innerText = 'F';
    }
  }

  return {
    loadWeatherPage: loadWeatherPage,
    convertTemperature: convertTemperature
  }

})(window.document);

//load weather on load of page
localWeather.loadWeatherPage();
