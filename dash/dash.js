

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
