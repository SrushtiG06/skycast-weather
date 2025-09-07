document.addEventListener('DOMContentLoaded', function () {
  const searchBtn = document.getElementById('searchBtn');
  const cityInput = document.getElementById('cityInput');
  const errorMessage = document.getElementById('errorMessage');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  // Ensure all required elements exist
  if (!searchBtn || !cityInput || !errorMessage) {
    console.error('Required DOM elements not found.');
    return;
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeToggleBtn.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // ✅ Hamburger Menu
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // ✅ Input Reset
  cityInput.value = '';

  // ✅ Load city from URL
  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get('city');
  if (cityParam) {
    cityInput.value = cityParam;
    fetchWeather(cityParam);
  } else {
    clearWeatherData();
  }

  searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
      localStorage.setItem('lastSearchedCity', city);
      window.location.href = `current.html?city=${encodeURIComponent(city)}`;
    }
  });

  function fetchWeather(city) {
    errorMessage.textContent = '';
    // Direct API call with API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=810b31795d089279466e116a8477f510&units=metric`)
      .then(response => {
        if (!response.ok) throw new Error('City not found');
        return response.json();
      })
      .then(displayWeather)
      .catch(error => {
        errorMessage.textContent = error.message;
        clearWeatherData();
      });
  }

  function displayWeather(data) {
    document.getElementById('location').textContent = `Location: ${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
    const iconCode = data.weather[0].icon;
    const iconFile = getDoodleIcon(iconCode);
    document.getElementById('weatherIcon').src = `../assets/icons/doodle/${iconFile}`;
    document.getElementById('weatherIcon').alt = data.weather[0].main;
  }

  function clearWeatherData() {
    document.getElementById('location').textContent = 'Location: --';
    document.getElementById('temperature').textContent = 'Temperature: --';
    document.getElementById('humidity').textContent = 'Humidity: --';
    document.getElementById('wind').textContent = 'Wind Speed: --';
    document.getElementById('description').textContent = 'Description: --';
    document.getElementById('weatherIcon').src = '../assets/icons/doodle/icons8-smiling-sun-100.png';
    document.getElementById('weatherIcon').alt = 'Default weather icon';
  }

  function getDoodleIcon(iconCode) {
    const iconMap = {
      '01d': 'icons8-smiling-sun-100.png',
      '01n': 'icons8-moon-and-stars-100.png',
      '02d': 'icons8-partly-cloudy-day-100.png',
      '02n': 'icons8-cloudy-night-100.png',
      '03d': 'icons8-cloud-100.png',
      '03n': 'icons8-cloud-100.png',
      '04d': 'icons8-cloud-100.png',
      '04n': 'icons8-cloud-100.png',
      '09d': 'icons8-rain-100.png',
      '09n': 'icons8-rain-100.png',
      '10d': 'icons8-rain-100.png',
      '10n': 'icons8-rainy-snowy-night-100.png',
      '11d': 'icons8-storm-100.png',
      '11n': 'icons8-stormy-night-100.png',
      '13d': 'icons8-snow-100.png',
      '13n': 'icons8-snowy-night-100.png',
      '50d': 'icons8-fog-100-2.png',
      '50n': 'icons8-fognight-100.png'
    };
    return iconMap[iconCode] || 'icons8-sun-100.png';
  }
});
