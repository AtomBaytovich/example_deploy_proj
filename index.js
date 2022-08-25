const path = require('path');
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.options('*', cors());

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'))); // статическая папка

app.use('/', require('./routes/index'));
// Not Found
app.use("*", (req, res) => res.send('404 | Not Found'));

app.listen(PORT, () => {
    console.log(`Проект запущен на http://localhost:${PORT}`);
});