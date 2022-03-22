const express = require('express')
//link de paginas
const router = express.Router();

const pool = require('../database');

const { isLoggedIn } = require('../lib/auth');

const { selectFields } = require('express-validator/src/select-fields');



const multer=require('multer');
const upload=multer({ dest:'src/public/img'});
const fs = require('fs');


router.get('/agregarEmpresa', async (req, res) => {//se renderiza el form personas (agregar personas)




    const tipo = await pool.query('SELECT * FROM tipo ');
    console.log(tipo)

    res.render('carpetaEmpresa/agregarEmpresa', { tipo });
});

router.get('/', async (req, res) => {

    const empresa1 = await pool.query('SELECT * FROM empresa ');
   // const descripcion = await pool.query('SELECT tipo.nombreTipoEmpresa AS descripcion FROM empresa LEFT JOIN tipo ON empresa.idTipo = tipo.idTipo');
    //console.log(descripcion)
    const descripcion = await pool.query('SELECT * FROM tipo ');

    
    ///////////////////
    





    //////////////////

    var varr = req.user.idPersona;
    console.log(varr)

    var empresa = [];



    empresa1.reduce(function (contadorAnterior2, actualCuenta) {

        if (actualCuenta.idPersona == varr) {





            empresa.push(actualCuenta);

        }


        contadorAnterior2 + 1;
    }, 0)

    //////////////////////
    res.render('carpetaEmpresa/listEmpresa', { empresa,descripcion});
})

router.post('/agregarEmpresa',upload.single('imagenEmpresa')  , async  (req, res) => {

    const dire=req.file.filename;
    const valor=(req.file.mimetype.split('/')[1]);

    fs.renameSync(req.file.path,  req.file.path+ '.' +req.file.mimetype.split('/')[1]);

    console.log(valor)

    const imagenEmpresa=(dire+'.'+valor)
    //console.log(final);

    const { idPersona, idTipo, nombreEmpresa, sloganEmpresa, ciudadEmpresa, fonoEmpresa, horarioEmpresa, suscripcionEmpresa, estrellasEmpresa, fechaEmpresa } = req.body;


    const newLink = {
        idPersona,
        idTipo,
        nombreEmpresa,
        sloganEmpresa,
        ciudadEmpresa,
        fonoEmpresa,
        horarioEmpresa,
        suscripcionEmpresa,
        estrellasEmpresa,
        fechaEmpresa,
        imagenEmpresa


    };
    console.log(newLink)

   

  
    await pool.query('INSERT INTO empresa set?', [newLink]);
    req.flash('success', 'empresa creada');
    res.redirect('/carpetaEmpresa');
});
router.get('/editEmpresa/:idEmpresa', isLoggedIn, async (req, res) => {
    const { idEmpresa } = req.params;
    const empresa = await pool.query('SELECT * FROM empresa WHERE idEmpresa=?', [idEmpresa])

    res.render('carpetaEmpresa/editEmpresa', { empresa: empresa[0] });

});
router.post('/editEmpresa/:idEmpresa', async (req, res) => {

    const { idEmpresa } = req.params;
    const { idTipo, nombreEmpresa, sloganEmpresa, ciudadEmpresa, fonoEmpresa, horarioEmpresa, suscripcionEmpresa, estrellasEmpresa, fechaEmpresa } = req.body;
    const newProducto = {
        idTipo,
        nombreEmpresa,
        sloganEmpresa,
        ciudadEmpresa,
        fonoEmpresa,
        horarioEmpresa,
        suscripcionEmpresa,
        estrellasEmpresa,
        fechaEmpresa,

    };
    await pool.query('UPDATE empresa set? WHERE idEmpresa=?', [newProducto, idEmpresa])
    req.flash('success', 'empresa actualizada');
    res.redirect('/carpetaEmpresa');
});





module.exports = router;