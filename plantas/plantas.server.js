const express = require("express");
const path = require("path");
const mysql = require("mysql2");

const app = express();
const router = express.Router();

// Configuración de conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Martinez2709",
    database: "plantasdb",
});

// Verificar la conexión
db.connect((err) => {
    if (err) {
        console.error("Error al conectar con la base de datos:", err);
        return;
    }
    console.log("Conexión a la base de datos establecida.");
});

// Ruta para servir el HTML
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "plantas.html"));
});

// Ruta para devolver datos de plantas desde la base de datos
router.get("/data", (req, res) => {
    const { query } = req.query;

    let sql = "SELECT * FROM plantas";
    const params = [];

    if (query) {
        sql += " WHERE nombre_comun LIKE ? OR nombre_cientifico LIKE ? OR tipo LIKE ?";
        params.push(`%${query}%`, `%${query}%`, `%${query}%`);
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error("Error al realizar la consulta:", err);
            res.status(500).json({ error: "Error al obtener datos." });
            return;
        }

        // Mapear los resultados para usar nombres consistentes
        const mappedResults = results.map((plant) => ({
            common_name: plant.nombre_comun,
            scientific_name: plant.nombre_cientifico,
            family: plant.tipo,
            image_url: plant.imagen_url || "https://via.placeholder.com/150", // Imagen por defecto si no existe
        }));

        res.json(mappedResults);
    });
});

module.exports = router;

// Inicia el servidor
const PORT = 3000;
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
