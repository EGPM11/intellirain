const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));


app.use('/dash', require('./dash/dash.server'));
app.use('/plantas', require('./plantas/plantas.server'));


app.get('/', (req, res) => {
    res.redirect('/dash');
});

// Ruta simulada para obtener datos de plantas
app.get('/api/plants', (req, res) => {
    const simulatedData = [
        { id: 1, name: 'Tomato', species: 'Solanum lycopersicum', status: 'Needs Water' },
        { id: 2, name: 'Basil', species: 'Ocimum basilicum', status: 'Watered' },
        { id: 3, name: 'Lettuce', species: 'Lactuca sativa', status: 'Needs Water' }
    ];
    res.json(simulatedData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
