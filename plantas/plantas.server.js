const express = require("express");
const path = require("path");
const mysql = require("mysql2");

const app = express();
const router = express.Router();

// Configuración de conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost", // Cambiar según tu configuración
    user: "root", // Usuario de MySQL
    password: "", // Contraseña de MySQL
    database: "plantasdb", // Nombre de tu base de datos
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
    const { query } = req.query; // Filtrar por nombre, nombre científico o familia

    let sql = "SELECT * FROM plantas";
    if (query) {
        sql += " WHERE common_name LIKE ? OR scientific_name LIKE ? OR family LIKE ?";
    }

    const params = query ? [`%${query}%`, `%${query}%`, `%${query}%`] : [];

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error("Error al realizar la consulta:", err);
            res.status(500).json({ error: "Error al obtener datos." });
            return;
        }
        res.json(results);
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
