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
        image_url: "data:image/jpeg;base64,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",
    },
    {
        id: 2,
        common_name: "Cactus",
        scientific_name: "Cactaceae",
        family: "Cactaceae",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx7tjtaL6RpzsyXkeIpqeSe19wHqUiJMXxHg&s",
    },
    {
        id: 3,
        common_name: "Tulipán",
        scientific_name: "Tulipa",
        family: "Liliaceae",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDbZyeGjfGPFMvouVISzMu8TveixeSDOudzA&s",
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
