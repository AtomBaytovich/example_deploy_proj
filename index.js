const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;

const app = express();

// cors
app.use(cors());
app.options('*', cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// шаблонизатор ejs
app.set('views', './views');
app.set('view engine', 'ejs');

// статическая папка
app.use(express.static(path.join(__dirname, 'public')));

// подключаем наши роуты
app.use('/', require('./routes/index'));
app.use('/config-ngnix', require('./routes/generateConfigNgnix'));
// Not Found
app.use("*", (req, res) => res.send('404 | Not Found'));

// прослушка
app.listen(PORT, () => {
    console.log(`Проект запущен на http://localhost:${PORT}`);
});