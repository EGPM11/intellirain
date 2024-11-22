const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, )));
app.use(express.static(path.join(__dirname, 'dash')));
app.use(express.static(path.join(__dirname, 'plantas')));


app.use('/dash', require('./dash/dash.server'));
app.use('/plantas', require('./plantas/plantas.server'));


app.get('/', (req, res) => {
    res.redirect('/dash');
});

app.get('/', (req, res) => {
    res.redirect('/plantas');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
