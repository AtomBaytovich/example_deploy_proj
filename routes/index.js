const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    return res.render('index', {
        title: 'Мини сайт Atom Baytovich | CODE'
    });
});


module.exports = router;