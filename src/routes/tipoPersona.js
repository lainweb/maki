const express = require('express')
//link de paginas
const router = express.Router();

const pool = require('../database');

const {isLoggedIn}=require('../lib/auth');





router.get('/', async (req, res) => {

    const tipop = await pool.query('SELECT * FROM tipop ');
    console.log(tipop)




    
    res.render('carpetaTipoPersona/listTipoPersona',{tipop});
})


module.exports = router;