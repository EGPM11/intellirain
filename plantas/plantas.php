<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plantas</title>
    <link rel="stylesheet" href="/public/nav.css">
    <link rel="stylesheet" href="./plantas.css">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-icon" onclick="window.location.href='../dash/dash.html'">🏠</div>
        <div class="sidebar-icon" onclick="window.location.href='../dash/dash.html'">📊</div>
        <div class="sidebar-icon" onclick="window.location.href='plantas.php'">🌱</div>
        <div class="sidebar-icon" onclick="toggleDarkMode()">🌙</div>
    </div>
    <div class="main-content">
        <div class="header">
            <h1>Plantas</h1>
            <div style="margin-top: 20px;">
                <input type="text" id="search-input" placeholder="Buscar por nombre, científico o familia" >
                <button id="search-btn" >
                    Buscar
                </button>
            </div>
        </div>
        <div class="content">
            <div class="cards-container" id="cards-container">
                <!-- Aquí se agregarán dinámicamente los botones de las plantas -->
            </div>
             <!-- Overlay de fondo -->
<div class="overlay" id="overlay"></div>

<!-- Ventana emergente -->
<div class="popup" id="popup">
    <h2 class="popup-title" id="popup-title">Planta 1</h2>
    <div class="popup-description">
        <span class="popup-label">Descripción:</span>
        <span id="popup-description">Es una planta verde.</span>
    </div>
    <div class="popup-details">
        <span class="popup-label">Detalles:</span>
        <span id="popup-details">Crece mejor en lugares húmedos.</span>
    </div>
    <div class="popup-buttons">
        <button class="btn-cerrar" id="close-popup">Cerrar</button>
        <button class="btn-guardar" id="save-plant-btn">Guardar</button>
    </div>
</div>
        </div>
    </div>

        </div>
    </div>
    <script src="../public/darkmode.js"></script>
    <script src="./plantas.js"></script>
    
    <!--Prueba de ltarjetas -->

    <?php
    // Datos de conexión
    $host = "localhost";
    $usuario = "root";
    $contrasena = "Martinez2709";
    $base_datos = "plantasdb";

    // Crear conexión
    $conn = new mysqli($host, $usuario, $contrasena, $base_datos);

    // Verificar conexión
    if ($conn->connect_error) {
        die("<p style='color: red;'>Error de conexión: " . $conn->connect_error . "</p>");
    }
    echo "<p style='color: green;'>Conexión exitosa a la base de datos.</p>";

    // Cerrar conexión
    $conn->close();
    ?>
</body>
</html>