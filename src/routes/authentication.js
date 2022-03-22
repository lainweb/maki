const express = require('express');
const { route } = require('.');
//rutas para login y logout
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotlogedIn } = require('../lib/auth');
const pool = require('../database');
const crypto = require('crypto');
var nodemailer = require('nodemailer');
const helpers = require('../lib/helpers');

//const uuidv1 = require('uuid/v1');

router.get('/signup', isNotlogedIn, (req, res) => {//renderizar datos formulario

    res.render('auth/signup')
})



router.post('/signup', passport.authenticate('local.signup', {



    successRedirect: '/profile',
    failureRedirect: '/signup',
    failedFlash: true





}));



router.get('/signin', isNotlogedIn, (req, res) => {

    res.render('auth/signin');
})

router.post('/signin', isNotlogedIn, (req, res, next) => {



    passport.authenticate('local.signin', {


        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true

    })(req, res, next);



});




router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
})



router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/signin')
})

router.get('/forget', async (req, res) => {

    res.render('auth/forget');
})
router.get('/restablecer', async (req, res) => {

    res.render('auth/restablecer');
})
router.post('/restablecer', async (req, res) => {
    //const token = req.params;
    const token = req.headers.referer;
    const valorToken=token.slice(-40)
    console.log(valorToken)

    const nuevacontra=req.body;
    console.log(nuevacontra.contrasenaPersona)

    const contraActualizada = await helpers.encriptar(nuevacontra.contrasenaPersona);
    pool.query('UPDATE persona set  contrasenaPersona=? WHERE recuContrasena=?', [contraActualizada,valorToken])
    res.render('auth/contraActualizada');

});


////////////////////////////////////////////

router.get('/exito', async (req, res) => {

    res.render('auth/exito');
})
router.get('/contraActualizada', async (req, res) => {

    res.render('auth/contraActualizada');
})

router.post('/forgett/', async (req, res) => {

    const mail = req.body.correoPersona
    console.log(mail)
    const resultado = await pool.query('SELECT * FROM persona WHERE correoPersona=?', [mail])
    if (resultado == "") {
        console.log('no existe')
        //const id = uuidv1();
        // console.log(id)
    } else {
        console.log(' existe');
        console.log(resultado);
        const val= (resultado[0].idPersona)
        //const va=resultado.idPersona;

       
        console.log(val);
     


        //await pool.query('UPDATE persona set? WHERE idPersona=?', [newProducto, resultado.idPersona])

        ////////////////////////
        crypto.randomBytes(20, function (err, buf) {
            var token = buf.toString('hex');



            console.log(token)
           
             pool.query('UPDATE persona set  recuContrasena=? WHERE idPersona=?', [token,val])




            var email = nodemailer.createTransport({

                host: 'mail.makib.cl',
                port:465,
                secure:true,
                auth: {
                    user: 'lain@makib.cl',
                    pass: 'leonelalejandro'
                }
            });

            var mailOptions = {

                from: 'lain@makib.cl',
                to: mail,
                subject: 'recuperarContraseña - lain@makib.cl',
                html: '<p>Ingresa al link <a href="https://maki.cleverapps.io/restablecer?token=' + token 

            };
              email.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    res.redirect('/exito')
                    console.log(0)
                }
            });






            ///////////////////////////////////////
        });



    }


});


module.exports = router;