const express = require("express");
const path = require("path");
const router = express.Router();

// Simula una base de datos (deberías reemplazar esto con tu conexión real a la base de datos)
const plants = [
    {
        id: 1,
        common_name: "Rosa",
        scientific_name: "Rosa rubiginosa",
        family: "Rosaceae",
        image_url: "https://via.placeholder.com/150",
    },
    {
        id: 2,
        common_name: "Cactus",
        scientific_name: "Cactaceae",
        family: "Cactaceae",
        image_url: "https://via.placeholder.com/150",
    },
    {
        id: 3,
        common_name: "Tulipán",
        scientific_name: "Tulipa",
        family: "Liliaceae",
        image_url: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      common_name: "Tulipán",
      scientific_name: "Tulipa",
      family: "Liliaceae",
      image_url: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    common_name: "Tulipán",
    scientific_name: "Tulipa",
    family: "Liliaceae",
    image_url: "https://via.placeholder.com/150",
},
];

// Ruta para servir el HTML
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "plantas.html"));
});

// Ruta para devolver datos de plantas desde la base de datos
router.get("/data", (req, res) => {
    const { query } = req.query; // Filtrar por nombre, nombre científico o familia

    let filteredPlants = plants;
    if (query) {
        filteredPlants = plants.filter(
            (plant) =>
                plant.common_name.toLowerCase().includes(query.toLowerCase()) ||
                plant.scientific_name.toLowerCase().includes(query.toLowerCase()) ||
                plant.family.toLowerCase().includes(query.toLowerCase())
        );
    }

    res.json(filteredPlants);
});

module.exports = router;
