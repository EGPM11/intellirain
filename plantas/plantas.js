document.addEventListener('DOMContentLoaded', () => {
    const opcion = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    const countrySelect = document.getElementById('country');
    const plantContent = document.getElementById('plant-content');

    // Función para obtener datos de clima
    function fetchWeather(country) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=500c2d60e968e7eb9ad2952773c2ad8d&units=metric`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                plantContent.innerHTML = ''; // Limpia el contenido previo
                const plantItem = document.createElement('div');
                plantItem.classList.add('plant-item');
                plantItem.innerHTML = `
                    <div class="plant-info">
                        <div class="plant-icon">🌤️</div>
                        <div>
                            <div class="plant-name">${data.name}</div> <!-- Ciudad -->
                            <div class="plant-species">${data.weather[0].description}</div> <!-- Descripción del clima -->
                        </div>
                    </div>
                    <div class="water-status">
                        Temp: ${data.main.temp}°C | Feels like: ${data.main.feels_like}°C
                    </div>
                    <div class="water-status">
                        Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s
                    </div>
                `;
                plantContent.appendChild(plantItem);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    // Evento para capturar el cambio en el selector de países
    countrySelect.addEventListener('change', (event) => {
        const selectedCountry = event.target.value;
        fetchWeather(selectedCountry); // Llama a la función con el país seleccionado
    });

    // Llamada inicial con el primer país del listado
    fetchWeather(countrySelect.value);
});
