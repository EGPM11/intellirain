async function obtenerClima(lat, lon) {
    try {
      // Solicita los datos climáticos al servidor
      const response = await fetch(`/plantas/clima?lat=${lat}&lon=${lon}`);
      const data = await response.json();
  
      if (data.error) {
        console.error("Error:", data.error);
        return;
      }
  
      // Actualiza el contenido del HTML con los datos climáticos
      const contentDiv = document.getElementById("plant-content");
      contentDiv.innerHTML = `
        <div>
          <h2>Clima actual:</h2>
          <p>Ubicación: ${data.name}</p>
          <p>Temperatura: ${data.main.temp}°C</p>
          <p>Clima: ${data.weather[0].description}</p>
          <p>Humedad: ${data.main.humidity}%</p>
        </div>
      `;
    } catch (error) {
      console.error("Error al obtener el clima:", error);
    }
  }
  
  // Llama a la función con coordenadas de ejemplo (latitud y longitud)
  obtenerClima(18.7357, -70.1627); 
  