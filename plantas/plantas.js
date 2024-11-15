document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/plants')
        .then(response => response.json())
        .then(data => {
            const plantContent = document.getElementById('plant-content');
            data.forEach(plant => {
                const plantItem = document.createElement('div');
                plantItem.classList.add('plant-item');
                plantItem.innerHTML = `
                    <div class="plant-info">
                        <div class="plant-icon">🌱</div>
                        <div>
                            <div class="plant-name">${plant.name}</div>
                            <div class="plant-species">${plant.species}</div>
                        </div>
                    </div>
                    <div class="water-status ${plant.status === 'Needs Water' ? 'needs-water' : 'watered'}">
                        ${plant.status}
                    </div>
                `;
                plantContent.appendChild(plantItem);
            });
        })
        .catch(error => console.error('Error fetching plant data:', error));
});
