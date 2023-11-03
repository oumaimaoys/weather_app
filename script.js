const weatherCard = document.querySelector('.weather-card');
const search = document.querySelector('.button');
const weatherBox = document.querySelector('.item2');
const weatherDetails = document.querySelector('#weather-data');
const errormsg = document.querySelector(".pop-error");

errormsg.style.display = 'none';

search.addEventListener('click', () => {
    const api_key = 'fb984cd57e46e1d9421a1e301bb2970d';
    const city = document.querySelector('.input-box').value;
    
    if(city === ''){
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                errormsg.style.display = 'block';
                return;
            }
            errormsg.style.display = 'none';

            const image = document.querySelector('#weather-box img');
            const temperature = document.querySelector('#weather-box #temp');
            const description = document.querySelector('#weather-box #description');
            const humidity_img = document.querySelector('#weather-data #humidity img');
            const humidity = document.querySelector('#weather-data #humidity span');
            const wind_img = document.querySelector('#weather-data #wind-speed img');
            const wind = document.querySelector('#weather-data #wind-speed span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rainy.png';
                    break;

                case 'Snow':
                    image.src = 'images/snowy.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloudy.png';
                    break;

                case 'Haze':
                    image.src = 'images/misty.png';
                    break;

                default:
                    image.src = 'images/windy.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            humidity_img.src = 'images/humidity.png';
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            wind_img.src = 'images/wind.png';

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');


    });
});