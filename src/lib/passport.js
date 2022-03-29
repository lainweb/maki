const { body } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

const express = require('express');
const status = 1;


passport.use('local.signin', new LocalStrategy({

    usernameField: 'correoPersona',
    passwordField: 'contrasenaPersona',
    passReqToCallback: true

}, async (req, correoPersona, contrasenaPersona, done) => {
    console.log(req.body);
    const rows = await pool.query('SELECT * FROM persona WHERE correoPersona=?', [correoPersona]);

    if (rows.length > 0) {

        const user = rows[0];




        const validPassword = await helpers.matchPassword(contrasenaPersona, user.contrasenaPersona);
        if (validPassword) {


            //var string = JSON.stringify(user);
            //var obj = JSON.parse( string);
            // const status = user['idTipop'];

            //console.log(status)
            //user.nuevaClave = "status";
            // console.log(user)


            //user.administrador = "administrador";
            //const  admin= user;
            // console.log(admin)



            // user.nuevaClave = "status"
          
                done(null, user, req.flash('success', 'bienvenido' + user.correoPersona));
            







        } else {
            done(null, false, req.flash('message', 'contraseñaIncorrecta'));
        }
    }
    else {
        return done(null, false, req.flash('message', 'el usuario no existe'));
    }

}));


passport.use('local.signup', new LocalStrategy({

    usernameField: 'idTipoP',
    usernameField: 'idEstado',
    usernameField: 'rutPersona',
    usernameField: 'nombresPersona',
    usernameField: 'apellidoPersona',
    usernameField: 'correoPersona',

    passwordField: 'contrasenaPersona',
    passReqToCallback: true

    


}, async (req, correoPersona, contrasenaPersona, done) => {

    var arregloPaquete = [
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
    'amarillo.gif', 'amarillo.gif', 'amarillo.gif', 'amarillo.gif', 'amarillo.gif', 'amarillo.gif', 'amarillo.gif', 'amarillo.gif', 'amarillo.gif', 'amarillo.gif',
    'azul.gif', 'azul.gif', 'azul.gif', 'azul.gif', 'azul.gif', 'azul.gif', 'azul.gif', 'azul.gif', 'azul.gif', 'azul.gif', 'azul.gif',
    'verde.gif', 'verde.gif', 'verde.gif', 'verde.gif', 'verde.gif', 'verde.gif', 'verde.gif', 'verde.gif', 'verde.gif', 'verde.gif',
    'rojo.gif','rojo.gif','rojo.gif','rojo.gif','rojo.gif','rojo.gif','rojo.gif','rojo.gif','rojo.gif','rojo.gif',
    'rosa.gif','rosa.gif','rosa.gif','rosa.gif','rosa.gif',
    'negro.gif','negro.gif','negro.gif','negro.gif','negro.gif',
    'blanco.gif','blanco.gif','blanco.gif','blanco.gif','blanco.gif','blanco.gif','blanco.gif','blanco.gif','blanco.gif','blanco.gif'
];
    const imagenPersona = arregloPaquete[Math.floor(Math.random() * arregloPaquete.length)];

    const { idTipoP, idEstado, rutPersona, nombresPersona, apellidoPersona, fechaPersona } = req.body;
    const newUser = {
        idTipoP,
        idEstado,
        rutPersona,
        nombresPersona,
        apellidoPersona,
        correoPersona,
        contrasenaPersona,
        fechaPersona,
        imagenPersona

    };
    newUser.contrasenaPersona = await helpers.encriptar(contrasenaPersona);
    const result = await pool.query('INSERT INTO persona SET ?', [newUser]);
    newUser.idPersona = result.insertId;
    return done(null, newUser);
}));
var app = require('express')();



passport.serializeUser((user, done) => {
   // console.log('entro a serial usuario')
    done(null, user.idPersona);


});



passport.deserializeUser(async (idPersona, done) => {
    const rows = await pool.query('SELECT * FROM persona WHERE idPersona = ?', [idPersona]);
    done(null, rows[0]);
});

