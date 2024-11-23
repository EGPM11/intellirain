<?php
include '../database/BDplantas.php'; 

$sql = "SELECT * FROM usuarios"; 
$stmt = $conn->query($sql);
$datos = $stmt->fetchAll(PDO::FETCH_ASSOC); 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="/nav.css">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-icon" onclick="window.location.href='/dash'">🏠</div>
        <div class="sidebar-icon" onclick="window.location.href='/dash'">📊</div>
        <div class="sidebar-icon" onclick="window.location.href='/plantas'">🌱</div>
        <div class="sidebar-icon" onclick="alert('Settings')">⚙️</div>
    </div>

    <div class="main-content">
        <header>
            <div class="header">
                <h1>IntelliRain Dashboard</h1>
                <button class="button-dark-mode" onclick="toggleDarkMode()">Dark Mode</button>
            </div>
        </header>
        <div class="content">
            <p>Bienvenido al dashboard de IntelliRain</p>

            <!-- Tabla para mostrar los datos -->
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th> <!-- Cambia según las columnas de tu tabla -->
                    </tr>
                </thead>
                <tbody>
                    <?php
                    foreach ($datos as $fila) {
                        echo "<tr>";
                        echo "<td>" . $fila['id'] . "</td>"; // Cambia 'id' por la columna real
                        echo "<td>" . $fila['nombre'] . "</td>"; // Cambia 'nombre' por la columna real
                        echo "<td>" . $fila['email'] . "</td>"; // Cambia 'email' por la columna real
                        echo "</tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>

    <script src="/darkmode.js"></script>
</body>
</html>
