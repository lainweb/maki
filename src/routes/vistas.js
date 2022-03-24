const express = require('express')
//link de paginas
const router = express.Router();

const pool = require('../database');

const { isLoggedIn } = require('../lib/auth');





router.get('/verEmpresas', async (req, res) => {





    const empresa = await pool.query('SELECT * FROM empresa ');



    const tipo = await pool.query('SELECT * FROM tipo ');
    console.log(tipo)


    res.render('vistas/verEmpresas', { empresa, tipo });

})
////////////////////////////////////////////////////////////////////////////
router.get('/veamos/:idEmpresa', async (req, res) => {

    const servicio1 = await pool.query('SELECT * FROM servicio ');
    const { idEmpresa } = req.params;



    var servicio = [];
    servicio1.reduce(function (contadorAnterior2, actualCuenta) {
        if (actualCuenta.idEmpresa == idEmpresa) {





            servicio.push(actualCuenta);

        }


        contadorAnterior2 + 1;
    }, 0)


    const empresa = await pool.query('SELECT * FROM empresa WHERE idEmpresa=?', [idEmpresa])



    console.log(servicio)
    /////////////////////////
    // res.render('vistas/veamos', { empresa: empresa[0]});

    res.render('vistas/veamos', { empresa: empresa[0], servicio });
})
////////////////////////////////busqueda







///usuariocuentaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
router.get('/usuarioPerfil', async (req, res) => {

    res.render('vistas/usuarioPerfil');
})
router.get('/empresaPerfil', async (req, res) => {

    res.render('vistas/empresaPerfil');
})
router.get('/serviciosPerfil', async (req, res) => {

    res.render('vistas/serviciosPerfil');
})
router.get('/consejosProfile', async (req, res) => {

    res.render('vistas/consejosProfile');
})
router.get('/funcionamientoProfile', async (req, res) => {

    res.render('vistas/funcionamientoProfile');
})
router.get('/esferasPerfil', async (req, res) => {

    res.render('vistas/esferasPerfil');
})
router.get('/informacion', async (req, res) => {

    res.render('vistas/informacion');
})
router.get('/anuncios', async (req, res) => {

    res.render('vistas/anuncios');
})
router.post('/verEmpresas/', async (req, res) => {

    console.log('lol')
    const { idTipo } = req.body;
    console.log(idTipo)
    const { valor } = req.body;


    const tipo = await pool.query('SELECT * FROM tipo ');

    if (idTipo) {
        const empresa = await pool.query('SELECT * FROM empresa WHERE idTipo=?', [idTipo])
        res.render('vistas/busqueda', { empresa,tipo});
    } else {

        const empresa = await pool.query('SELECT * FROM empresa ');
        res.render('vistas/busqueda', { empresa,tipo});
    }


})






module.exports = router;