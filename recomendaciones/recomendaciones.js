const API_KEY = 'd27d3c497accf42705b31ff0d50dec47'; // Reemplaza con tu clave real

        const map = L.map('map').setView([18.7357, -70.1627], 8); // RD por defecto
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Función para obtener datos climáticos
        async function getWeatherData(lat, lon) {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Error al obtener datos del clima.');
                return await response.json();
            } catch (error) {
                console.error(error);
                return null;
            }
        }

        // Función para mostrar los indicadores en las cartas
        function updateIndicators(data) {
            const { main: { temp, humidity }, wind: { speed } } = data;

            document.getElementById('temperature').textContent = `${temp}°C`;
            document.getElementById('humidity').textContent = `${humidity}%`;
            document.getElementById('wind').textContent = `${speed} km/h`;
        }

        // Función para mostrar recomendaciones agrícolas
        function showRecommendations(data) {
            const recommendationsDiv = document.getElementById('recommendations');
            if (!data) {
                recommendationsDiv.innerHTML = `<p class="alert">⚠️ No se pudo obtener el clima. Intenta nuevamente.</p>`;
                return;
            }

            const { main: { temp } } = data;
            let recommendation = `<p>Condiciones actuales:</p>`;

            // Recomendaciones de cultivos basados en la temperatura
            if (temp > 30) {
                recommendation += `<p>🌱 Ideal para cultivos de plátano, yuca y otros cultivos tropicales.</p>`;
                recommendation += `<p>❌ No recomendado para cultivos de café o hortalizas de clima frío.</p>`;
            } else if (temp < 18) {
                recommendation += `<p>☕ Recomendado para café y otros cultivos de zonas frescas.</p>`;
                recommendation += `<p>❌ Evitar cultivos de arroz y plátano que requieren calor.</p>`;
            } else {
                recommendation += `<p>🌾 Buen momento para cultivar arroz, maíz y otros cultivos comunes.</p>`;
                recommendation += `<p>❌ No es ideal para cultivos que requieren mucho calor, como el cacao.</p>`;
            }

            recommendationsDiv.innerHTML = recommendation;
        }

        // Detectar ubicación
        document.getElementById('location-btn').addEventListener('click', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async ({ coords }) => {
                    const { latitude, longitude } = coords;

                    map.setView([latitude, longitude], 12);
                    L.marker([latitude, longitude]).addTo(map);

                    const weatherData = await getWeatherData(latitude, longitude);
                    updateIndicators(weatherData);  // Actualiza las cartas con los datos del clima
                    showRecommendations(weatherData);  // Muestra las recomendaciones agrícolas
                });
            } else {
                alert('La geolocalización no está soportada en este navegador.');
            }
        });
// Función para alternar el modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
    } else {
        localStorage.setItem("dark-mode", "disabled");
    }
}

// Configuración inicial al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
    initMapAndWeather();
});