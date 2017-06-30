"use strict";
function fetchJsonp(_url, options = {}) {

  const defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  };

  function generateCallbackFunction() {
    return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
  }

  function removeScript(scriptId) {
    const script = document.getElementById(scriptId);
    if (script) {
      document.getElementsByTagName('head')[0].removeChild(script);
    }
  }

  // to avoid param reassign
  let url = _url;
  const timeout = options.timeout || defaultOptions.timeout;
  const jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

  let timeoutId;

  return new Promise((resolve, reject) => {
    const callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
    const scriptId = `${jsonpCallback}_${callbackFunction}`;

    window[callbackFunction] = (response) => {
      resolve({
        ok: true,
        // keep consistent with fetch API
        json: () => Promise.resolve(response),
      });

      if (timeoutId) clearTimeout(timeoutId);

      removeScript(scriptId);
    };

    // Check if the user set their own params, and if not add a ? to start a list of params
    url += (url.indexOf('?') === -1) ? '?' : '&';

    const jsonpScript = document.createElement('script');
    jsonpScript.setAttribute('src', `${url}${jsonpCallback}=${callbackFunction}`);
    if (options.charset) {
      jsonpScript.setAttribute('charset', options.charset);
    }
    jsonpScript.id = scriptId;
    document.getElementsByTagName('head')[0].appendChild(jsonpScript);

    timeoutId = setTimeout(() => {
      reject(new Error(`JSONP request to ${_url} timed out`));

      removeScript(scriptId);
    }, timeout);

    // Caught if got 404/500
    jsonpScript.onerror = () => {
      reject(new Error(`JSONP request to ${_url} failed`));

      removeScript(scriptId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  });
}

function displayImage(conditionCode) {

  const codeNum = parseInt(conditionCode, 10);
  const baseUrl = 'https://source.unsplash.com/';
  const defaultImageId = {id: '3oyeaivM_fE', userName: '@qstevenson', fullName: 'Quin Stevenson'};

  const background = document.querySelector('.flex-container');
  const creditBadge = document.querySelector('.credit-badge');
  const creditName = document.querySelector('.credit-name');

  const image = imgFromCode(codeNum);
  background.style.backgroundImage = `url(${baseUrl}${image.id})`;
  creditBadge.setAttribute('href', `http://unsplash.com/${image.userName}?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge`);
  creditBadge.setAttribute('title', `Download free do whatever you want high-resolution photos from ${image.fullName}`);
  creditName.innerText = image.fullName;

  // creditBadge.innerHTML = ``;
  // if (!conditionCode) {
  //   return baseUrl + defaultImageId;
  // }
  // return baseUrl + idFromCode(conditionCode);

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
        return {id: '-pCHz5XiMb0', userName: '@atn', fullName: 'Etienne Desclides'};
        break;
      case 21: //	haze
      case 22: //	smoky
        return {id: 't1mqA3V3-7g', userName: '@florianklauer', fullName: 'Florian Klauer'};
        break;
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
        return {id: '7caumHzcqL4', userName: '@chuchad', fullName: 'Vladimir Chuchadeev'};
        break;
      case 29: //	partly cloudy (night)
        return {id: 'g3QBQto9Jt0', userName: '@matthewkane', fullName: 'Matthew Kane'};
        break;
      case 30: //	partly cloudy (day)
      case 44: //	partly cloudy
        return {id: 'AaJ2TuDS1uo', userName: '@photalife', fullName: 'Darren Coleshill'};
        break;
      case 31: //	clear (night)
        return {id: 'tqzqzH8hb5A', userName: '@sveninho', fullName: 'Sven Scheuermeier'};
        break;
      case 32: //	sunny
        return {id: 'u7ldh_tgH3s', userName: '@dakotaroosphotography', fullName: 'Dakota Roos'};
        break;
      case 33: //	fair (night)
        return {id: '2uEqc-9P3oQ', userName: '@jeremythomasphoto', fullName: 'Jeremy Thomas'};
        break;
      case 34: //	fair (day)
        return {id: 'E9aetBe2w40', userName: '@sam', fullName: 'Sam Schooler'};
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
      case 15:  //	blowing snow
      case 16: //	snow
      case 41: //	heavy snow
      case 42: //	scattered snow showers
      case 43: //	heavy snow
      case 46: //	snow showers
        return {id: 'Mexn4TZSlX4', userName: '@noahsilliman', fullName: 'Noah Silliman'};
        break;
      case 3200: //	not available
      default:
        return defaultImageId;
        break;
    }
  }
}

function handleFailure() {
  const weatherCard = document.querySelector('.weather-card');
  weatherCard.innerText = "Sorry we couldn't retrieve the weather";
  displayImage(); //display default image
}

function getLocationFromIP(ip) {
  let endpoint = "http://ipinfo.io/";
  if (ip) {
    endpoint += ip + '/';
  }
  endpoint += 'json?';
  return fetchJsonp(endpoint)
    .then(blob => blob.json())
    .catch((err) => {
      throw new Error('getLocationFromIP -> ' + err.message);
    });
}

function getWeatherFromCity(location) {
  const endpoint = `https://uery.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where u = "c" and woeid in (select woeid from geo.places(1) where text='${location}')&format=json`;
  return fetchJsonp(endpoint)
    .then(blob => blob.json())
    .then(data => Promise.resolve(data.query.results.channel.item.condition))
    .catch((err) => {
      throw new Error('getWeatherFromCity -> ' + err.message);
    });
}

function getLocaleData() {
  return getLocationFromIP().then(location => {
    const city = `${location.city} ${location.region} ${location.country}`;
    return getWeatherFromCity(city)
      .then(weather => Object.assign({}, location, weather))
      .catch((err) => {
        throw new Error('getLocaleData -> ' + err.message);
      });
  })
}

function renderWeatherData(weather) {
  const temperatureDiv = document.querySelector('.temperature');
  const conditionsDiv = document.querySelector('.condition');
  const units = "C";
  temperatureDiv.innerHTML = `${weather.temp}&deg;${units}`;
  conditionsDiv.innerText = weather.text;
}

function loadWeatherPage() {
  getLocaleData().then(data => {
    // console.log(data);
    renderWeatherData(data);
    displayImage(data.code);
  }).catch((err) => {
    console.log(err.message);
    handleFailure();
  });
}

function convertTemperature(degreesCelsius, convertToFahrenheit) {
  const temperatureDiv = document.querySelector('#temperature');
  const degrees = convertToFahrenheit ? (degreesCelsius * 9 / 5) + 32 : degreesCelsius;
  const displayUnits = convertToFahrenheit ? 'F' : 'C';
  temperatureDiv.innerHTML = `${degrees}&deg;${displayUnits}`;
}

