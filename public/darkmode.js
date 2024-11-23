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

function initMapAndWeather() {
    const API_KEY = "d27d3c497accf42705b31ff0d50dec47"; // Reemplaza con tu clave de OpenWeather
    const API_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
    const dominicanRepublic = [18.7357, -70.1627]; // Coordenadas de la República Dominicana

    // Inicialización del mapa
    const map = L.map("map").setView(dominicanRepublic, 8);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Botón de ubicación
    const locationBtn = document.getElementById("location-btn");
    locationBtn.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                    );
                    const weatherData = await response.json();
                    const CITY = weatherData.name;

                    // Actualiza el mapa y el marcador
                    L.marker([latitude, longitude])
                        .addTo(map)
                        .bindPopup(`Ciudad detectada: ${CITY}`)
                        .openPopup();
                    map.setView([latitude, longitude], 10);

                    // Actualiza los gráficos y los indicadores
                    updateWeatherData(weatherData);
                } catch (error) {
                    console.error("Error al obtener los datos:", error);
                }
            });
        } else {
            alert("Tu navegador no soporta geolocalización.");
        }
    });

    // Función para actualizar datos del clima
    function updateWeatherData(weatherData) {
        // Extrae los valores de la respuesta de la API
        const temperature = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const pressure = weatherData.main.pressure;
        const windSpeed = weatherData.wind.speed;

        // Actualiza los indicadores
        document.getElementById("temperature").textContent = `${temperature} °C`;
        document.getElementById("humidity").textContent = `${humidity} %`;
        document.getElementById("pressure").textContent = `${pressure} hPa`;
        document.getElementById("wind").textContent = `${windSpeed} km/h`;

        // Muestra los gráficos de pronóstico
        const city = weatherData.name;
        const API_URL = `${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&cnt=7`;

        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                const labels = data.list.map((item) =>
                    new Date(item.dt * 1000).toLocaleDateString()
                );
                const temps = data.list.map((item) => item.main.temp);
                const precip = data.list.map((item) => item.pop * 100);

                // Actualiza los gráficos
                renderChart(
                    "tempChart",
                    temps,
                    labels,
                    "Temperatura (°C)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 99, 132, 1)"
                );
                renderChart(
                    "precipChart",
                    precip,
                    labels,
                    "Probabilidad de Lluvia (%)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(54, 162, 235, 1)"
                );
            })
            .catch((error) => console.error("Error al obtener los datos del pronóstico:", error));
    }

    // Función para renderizar gráficos con Chart.js
    function renderChart(canvasId, data, labels, label, backgroundColor, borderColor) {
        // Verifica si ya existe un gráfico en ese canvas
        if (window[canvasId] instanceof Chart) {
            // Si existe, destrúyelo para poder renderizar uno nuevo
            window[canvasId].destroy();
        }

        // Crea el nuevo gráfico
        const ctx = document.getElementById(canvasId).getContext("2d");
        window[canvasId] = new Chart(ctx, {
            type: "line", // Cambia según el tipo de gráfico que necesitas
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: "top"
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}
