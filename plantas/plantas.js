document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.getElementById("cards-container");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    // Función para obtener datos desde el backend
    const fetchDataFromDatabase = async (query = "") => {
        try {
            const response = await fetch(`/plantas/data?query=${query}`);
            if (!response.ok) {
                throw new Error(`Error al obtener datos: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener datos de la base de datos:", error);
            return [];
        }
    };

    // Función para renderizar las tarjetas
    const renderPlants = (plants) => {
        cardsContainer.innerHTML = ""; // Limpia las tarjetas anteriores

        if (plants.length === 0) {
            cardsContainer.innerHTML = "<p>No se encontraron plantas.</p>";
            return;
        }

        plants.forEach((plant) => {
            const card = document.createElement("div");
            card.className = "name-button";
            card.innerHTML = `
                <img 
                    src="${plant.image_url || "https://via.placeholder.com/150"}" 
                    alt="${plant.common_name || "Sin imagen disponible"}" 
                    class="plant-image"
                >
                <div class="label">${plant.common_name || "Nombre no disponible"}</div>
                <div class="scientific-name">${plant.scientific_name || "Nombre científico no disponible"}</div>
                <div class="family">Familia: ${plant.family || "No disponible"}</div>
            `;
            cardsContainer.appendChild(card);
        });
    };

    // Función para actualizar las tarjetas dinámicamente
    const updateCards = async (query = "") => {
        const plants = await fetchDataFromDatabase(query);
        renderPlants(plants);
    };

    // Cargar las tarjetas al iniciar la página
    updateCards();

    // Escuchar el evento de búsqueda
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        updateCards(query);
    });
});
