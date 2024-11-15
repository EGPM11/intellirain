function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Si deseas que el modo oscuro se mantenga entre sesiones, puedes guardar el estado en el almacenamiento local:
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
}
