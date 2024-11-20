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
    const CITY = "Santo Domingo"; // Cambia por la ciudad que desees
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric&cnt=7`;

    // Obtener datos de OpenWeather
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const labels = data.list.map(item => new Date(item.dt * 1000).toLocaleDateString());
            const temps = data.list.map(item => item.main.temp);
            const precip = data.list.map(item => item.pop * 100);

            renderChart("tempChart", labels, temps, "Temperatura (°C)", "rgba(255, 99, 132, 0.2)", "rgba(255, 99, 132, 1)");
            renderChart("precipChart", labels, precip, "Probabilidad de Lluvia (%)", "rgba(54, 162, 235, 0.2)", "rgba(54, 162, 235, 1)");
        })
        .catch(error => console.error("Error al obtener los datos:", error));

    // Función para generar gráficos
    function renderChart(canvasId, labels, data, label, bgColor, borderColor) {
        const ctx = document.getElementById(canvasId).getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                labels,
                datasets: [{
                    label,
                    data,
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});


// Coordenadas iniciales para centrar el mapa en República Dominicana
const dominicanRepublic = [18.7357, -70.1627];

// Inicializamos el mapa
const map = L.map('map').setView(dominicanRepublic, 8);

// Añadimos el mapa base desde OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Usamos una API para obtener la ubicación (puedes reemplazarla por OpenWeather o cualquier API geográfica)
fetch('https://ipapi.co/json/') // O cualquier API para detectar ubicación
    .then(response => response.json())
    .then(data => {
        const { latitude, longitude, city } = data;

        // Colocamos un marcador en la ubicación detectada
        L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(`Ciudad: ${city}`)
            .openPopup();

        // Centramos el mapa en la ubicación detectada
        map.setView([latitude, longitude], 10);
    })
    .catch(error => {
        console.error("Error al obtener la ubicación:", error);
    });
