document.addEventListener('DOMContentLoaded', function () {
  const searchBtn = document.getElementById('searchBtn');
  const cityInput = document.getElementById('cityInput');
  const forecastContainer = document.getElementById('forecastContainer');
  const errorMessage = document.getElementById('errorMessage');
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  // Theme setup
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

  // Load city from URL
  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get('city');

  if (cityParam) {
    cityInput.value = cityParam;
    fetchForecast(cityParam);
  } else {
    forecastContainer.innerHTML = ''; // Clear forecast if no city
  }

  searchBtn.addEventListener('click', function () {
    const city = cityInput.value.trim();
    if (city) {
      localStorage.setItem('lastSearchedCity', city);
      window.location.href = `forecast.html?city=${encodeURIComponent(city)}`;
    }
  });

  function fetchForecast(city) {
    errorMessage.textContent = '';
    // Direct API call with API key
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=810b31795d089279466e116a8477f510&units=metric`)
      .then(response => {
        if (!response.ok) throw new Error('City not found');
        return response.json();
      })
      .then(displayForecast)
      .catch(error => {
        errorMessage.textContent = error.message;
        forecastContainer.innerHTML = '';
      });
  }

  function displayForecast(data) {
    forecastContainer.innerHTML = ''; // Clear previous content

    // Filter for one forecast per day (e.g., 12:00:00)
    const filtered = data.list.filter(entry => entry.dt_txt.includes("12:00:00"));

    filtered.forEach(entry => {
      const card = document.createElement('div');
      card.className = 'forecast-card';

      const date = new Date(entry.dt_txt).toLocaleDateString();
      const iconCode = entry.weather[0].icon;
      const iconFile = getDoodleIcon(iconCode);
      const icon = `../assets/icons/doodle/${iconFile}`;

      card.innerHTML = `
        <h3>${date}</h3>
        <img src="${icon}" alt="${entry.weather[0].main}" />
        <p>${entry.weather[0].description}</p>
        <p>Temp: ${Math.round(entry.main.temp)}°C</p>
        <p>Humidity: ${entry.main.humidity}%</p>
        <p>Wind: ${entry.wind.speed} m/s</p>
      `;

      forecastContainer.appendChild(card);
    });
  }

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  function getDoodleIcon(iconCode) {
    const iconMap = {
      '01d': 'icons8-smiling-sun-100.png',
      '01n': 'icons8-moon-and-stars-100.png',
      '02d': 'icons8-partly-cloudy-day-100.png',
      '02n': 'icons8-cloudy-night-100.png',
      '03d': 'icons8-partly-cloudy-day-100.png',
      '03n': 'icons8-cloudy-night-100.png',
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
