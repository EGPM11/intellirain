const express = require("express");
const path = require("path");
const axios = require("axios"); 
const router = express.Router();

const API_KEY = "d27d3c497accf42705b31ff0d50dec47"
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Ruta principal para servir el HTML
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "plantas.html"));
});

// Nueva ruta para obtener datos climáticos
router.get("/clima", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitud y longitud son requeridas." });
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
        lang: "es", 
      },
    });

    res.json(response.data); 
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    res.status(500).json({ error: "Error al obtener los datos climáticos." });
  }
});

module.exports = router;
