document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.getElementById("cards-container");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const closePopup = document.getElementById("close-popup");
    const savePlantBtn = document.getElementById("save-plant-btn");
    const popupTitle = document.getElementById("popup-title");
    const popupDescription = document.getElementById("popup-description");
    const popupDetails = document.getElementById("popup-details");

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
        cardsContainer.innerHTML = ""; // Limpia las tarjetas previas

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
            card.addEventListener("click", () => openPopup(plant));
            cardsContainer.appendChild(card);
        });
    };

    // Función para abrir la ventana emergente
    const openPopup = (plant) => {
        popupTitle.textContent = plant.common_name || "Nombre no disponible";
        popupDescription.textContent = `Nombre científico: ${plant.scientific_name || "No disponible"}`;
        popupDetails.textContent = `Familia: ${plant.family || "No disponible"}`;
        
        // Mostrar popup y overlay
        popup.classList.add("active");
        overlay.classList.add("active");
    };

    // Función para cerrar la ventana emergente
    const closePopupHandler = () => {
        popup.classList.remove("active");
        overlay.classList.remove("active");
    };

    // Función para actualizar las tarjetas dinámicamente
    const updateCards = async (query = "") => {
        const plants = await fetchDataFromDatabase(query);
        renderPlants(plants);
    };

    // Eventos de interacción
    closePopup.addEventListener("click", closePopupHandler);
    overlay.addEventListener("click", closePopupHandler);

    savePlantBtn.addEventListener("click", () => {
        alert("Se ha guardado la planta");
    });

    // Cargar las tarjetas al iniciar la página
    updateCards();

    // Escuchar el evento de búsqueda en tiempo real
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim(); // Obtiene el texto ingresado
        updateCards(query); // Actualiza las tarjetas dinámicamente
    });

    // También conserva el comportamiento del botón de búsqueda
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim(); // Obtiene el texto ingresado
        updateCards(query); // Actualiza las tarjetas al hacer clic
    });
});
