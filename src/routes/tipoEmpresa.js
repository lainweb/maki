const express = require('express')
//link de paginas
const router = express.Router();

const pool = require('../database');

const {isLoggedIn}=require('../lib/auth');

router.get('/agregarTipo', isLoggedIn,(req, res) => {//se renderiza el form personas (agregar personas)

    res.render('carpetaTipoEmpresa/agregarTipo');
});



router.get('/', async (req, res) => {

    const tipo = await pool.query('SELECT * FROM tipo ');
    console.log(tipo)





    
    res.render('carpetaTipoEmpresa/listTipoEmpresa',{tipo});
})

router.post('/agregarTipo', async (req, res) => {
    const { nombreTipoEmpresa, descripcionTipoEmpresa } = req.body;
    const newLink = {
        nombreTipoEmpresa,
        descripcionTipoEmpresa
        
        

    };
  
    await pool.query('INSERT INTO tipo set?', [newLink]);
    req.flash('success','tipoEmpresa creado');
    res.redirect('/carpetaTipoEmpresa');
});

router.get('/editTipoEmpresa/:idTipo', isLoggedIn,async(req,res)=>{
    const{idTipo}=req.params;
    const tipo=await pool.query('SELECT * FROM tipo WHERE idTipo=?',[idTipo])
    
   res.render('carpetaTipoEmpresa/editTipoEmpresa',{tipo:tipo[0]});
 
 });

 router.post('/editTipoEmpresa/:idTipo',async(req,res)=>{

    const {idTipo}=req.params;
    const{nombreTipoEmpresa,descripcionTipoEmpresa}=req.body;
    const newProducto={
        nombreTipoEmpresa,
        descripcionTipoEmpresa,
       
    };
    await pool.query('UPDATE tipo set? WHERE idTipo=?',[newProducto,idTipo])
    req.flash('success','tipoEmpresa actualizado');
    res.redirect('/carpetaTipoEmpresa');
 });

 


module.exports = router;