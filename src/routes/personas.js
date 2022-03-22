const express = require('express')
//link de paginas
const router = express.Router();

const pool = require('../database');

const { isLoggedIn } = require('../lib/auth');

const multer = require('multer');
const upload = multer({ dest: 'src/public/img' });
const fs = require('fs');



router.get('/agregarPersona', async (req, res) => {//se renderiza el form personas (agregar personas)
    // const tipop = await pool.query('SELECT * FROM tipop ');

    //  const estado = await pool.query('SELECT * FROM estado ');

    res.render('carpetaPersonas/agregarPersona');



});

router.post('/agregarPersona', async (req, res) => {




    const {idTipop, idEstado, rutPersona, nombresPersona, apellidoPersona, correoPersona, contrasenaPersona, fechaPersona,imagenPersona} = req.body;

    //var arregloPaquete = ['amarillo.gif','azul.gif','negro.gif','rojo.gif','rosa.gif','verde.gif'];
    //const imagenPersona = arregloPaquete[Math.floor(Math.random() * arregloPaquete.length)];


    const newLink = {
        idTipop,
        idEstado,
        rutPersona,
        nombresPersona,
        apellidoPersona,
        correoPersona,
        contrasenaPersona,
        fechaPersona,
        imagenPersona



    };


    newLink.contrasenaPersona = await helpers.encriptar(contrasenaPersona);
    await pool.query('INSERT INTO persona set?', [newLink]);
    req.flash('success', 'administrador  creado correctamente');
    res.redirect('/carpetaPersonas');

    var lol = 'lol'
    console.log(lol)


});





router.get('/', async (req, res) => {

    const persona = await pool.query
        ("SELECT persona.nombresPersona AS nombre,persona.idPersona,persona.apellidoPersona AS apellido,persona.rutPersona AS rut,persona.correoPersona AS correo,persona.idEstado AS estado, tipop.nombreTipoPersona AS descripcion FROM persona LEFT JOIN tipop ON persona.idTipop = tipop.idTipop");
    console.log(persona)
    res.render('carpetaPersonas/listPersonas', { persona });



})


router.get('/editarPersona/:idPersona', async (req, res) => {
    const { idPersona } = req.params;
    const persona = await pool.query('SELECT * FROM persona WHERE idPersona=?', [idPersona])

    const tipop = await pool.query('SELECT * FROM tipop ');
    const estado = await pool.query('SELECT * FROM estado ');

    res.render('carpetaPersonas/editarPersona', { persona: persona[0], tipop, estado });

});
router.post('/editarPersona/:idPersona', async (req, res) => {

    const { idPersona } = req.params;
    const { idTipop, idEstado, rutPersona, nombresPersona, apellidoPersona, correoPersona, imagenPersona } = req.body;
    const newProducto = {
        idTipop,
        idEstado,
        rutPersona,
        nombresPersona,
        apellidoPersona,
        correoPersona,
        imagenPersona,


    };
    await pool.query('UPDATE persona set? WHERE idPersona=?', [newProducto, idPersona])
    req.flash('success', 'persona actualizada');
    res.redirect('/carpetaPersonas');
});



router.get('/editarUsuario', async (req, res) => {

    var varr = req.user.idPersona;

    const persona = await pool.query('SELECT * FROM persona WHERE idPersona=?', [varr])



    res.render('carpetaPersonas/editarUsuario', { persona: persona[0] });


    // res.render('carpetaPersonas/editarUsuario');

});

router.post('/editarUsuario/:idPersona', async (req, res) => {

   

    


    const { idPersona } = req.params;
    const { idTipop, idEstado, rutPersona, nombresPersona, apellidoPersona, correoPersona, fechaPersona,imagenPersona } = req.body;
    const newProducto = {
        idTipop,
        idEstado,
        rutPersona,
        nombresPersona,
        apellidoPersona,
        correoPersona,
        imagenPersona,
        fechaPersona

    };
    await pool.query('UPDATE persona set? WHERE idPersona=?', [newProducto, idPersona])
    req.flash('success', 'persona actualizada');
    res.redirect('/profile');
});



module.exports = router;