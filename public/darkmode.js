function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Si deseas que el modo oscuro se mantenga entre sesiones, puedes guardar el estado en el almacenamiento local:
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "d27d3c497accf42705b31ff0d50dec47"; // Reemplaza con tu clave de OpenWeather
    let CITY = "Santo Domingo"; // Valor por defecto

    const API_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

    // Coordenadas iniciales para centrar el mapa en República Dominicana
    const dominicanRepublic = [18.7357, -70.1627];

    // Inicializamos el mapa
    const map = L.map("map").setView(dominicanRepublic, 8);

    // Añadimos el mapa base desde OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Detectar ubicación al hacer clic en el botón
    const locationBtn = document.getElementById("location-btn");
    locationBtn.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    // Usar las coordenadas para obtener la ciudad
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=es`);
                    const weatherData = await response.json();
                    CITY = weatherData.name; // Actualizamos la ciudad detectada

                    // Colocamos un marcador en la ubicación detectada
                    L.marker([latitude, longitude])
                        .addTo(map)
                        .bindPopup(`Ciudad detectada: ${CITY}`)
                        .openPopup();

                    // Centramos el mapa en la ubicación detectada
                    map.setView([latitude, longitude], 10);

                    // Llamamos a la API de previsión con la ciudad detectada
                    fetchWeatherData(CITY);
                } catch (error) {
                    console.error("Error al obtener la ciudad:", error);
                }
            }, (error) => {
                console.error("Error de geolocalización:", error);
                alert("No se pudo acceder a tu ubicación.");
            });
        } else {
            alert("Tu navegador no soporta geolocalización.");
        }
    });

    // Función para obtener datos del clima
    function fetchWeatherData(city) {
        const API_URL = `${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&cnt=7`;

        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                const labels = data.list.map((item) =>
                    new Date(item.dt * 1000).toLocaleDateString()
                );
                const temps = data.list.map((item) => item.main.temp);
                const precip = data.list.map((item) => item.pop * 100);

                renderChart(
                    "tempChart",
                    labels,
                    temps,
                    "Temperatura (°C)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 99, 132, 1)"
                );
                renderChart(
                    "precipChart",
                    labels,
                    precip,
                    "Probabilidad de Lluvia (%)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(54, 162, 235, 1)"
                );
            })
            .catch((error) => console.error("Error al obtener los datos:", error));
    }

    // Función para generar gráficos
    function renderChart(canvasId, labels, data, label, bgColor, borderColor) {
        const ctx = document.getElementById(canvasId).getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label,
                        data,
                        backgroundColor: bgColor,
                        borderColor: borderColor,
                        borderWidth: 1,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
});

