const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async  (req, res) => {

    const tipo = await pool.query('SELECT * FROM tipo ');
    console.log(tipo)


    res.render('index', { tipo });
});

module.exports = router;
