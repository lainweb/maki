const express = require('express')
//link de paginas
const router = express.Router();

const pool = require('../database');

const { isLoggedIn } = require('../lib/auth');


router.get('/listServicio/:idEmpresa', async (req, res) => {

    const servicio1 = await pool.query('SELECT * FROM servicio ');
    /////////////////////////
    const{idEmpresa}=req.params;
   
    var servicio = [];
    servicio1.reduce(function (contadorAnterior2, actualCuenta) {
        if (actualCuenta.idEmpresa == idEmpresa) {



           

            servicio.push(actualCuenta);
           
          }

    
    contadorAnterior2 + 1;
    }, 0)   
  
    
   

    /////////////////////////
    res.render('carpetaServicio/listServicio', { servicio });
})




router.get('/agregarServicio/:idEmpresa', async (req, res) => {//se renderiza el form personas (agregar personas)

    const { idEmpresa } = req.params;


    res.render('carpetaServicio/agregarServicio', { idEmpresa });
});

router.post('/agregarServicio/:idEmpresa', async (req, res) => {

    const { idEmpresa, nombreServicio, descripcionServicio, valorServicio } = req.body;


    const newLink = {
        idEmpresa,
        nombreServicio,
        descripcionServicio,
        valorServicio,



    };
    console.log(newLink)


    await pool.query('INSERT INTO servicio set?', [newLink]);
    req.flash('success', 'servicio creado');
    res.redirect('/carpetaEmpresa');
});
router.get('/editServicio/:idServicio', isLoggedIn, async (req, res) => {
    const { idServicio } = req.params;
    const servicio = await pool.query('SELECT * FROM servicio WHERE idServicio=?', [idServicio])

    res.render('carpetaServicio/editServicio', { servicio: servicio[0] });

});
router.post('/editServicio/:idServicio', async (req, res) => {

    const { idServicio } = req.params;
    const { nombreServicio, descripcionServicio, valorServicio } = req.body;
    const newProducto = {
        nombreServicio,
        descripcionServicio,
        valorServicio,


    };
    await pool.query('UPDATE servicio set? WHERE idServicio=?', [newProducto, idServicio])
    req.flash('success', 'servicio actualizado');
    res.redirect('/carpetaEmpresa');
});









module.exports = router;