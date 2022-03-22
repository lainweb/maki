const express = require('express')
//link de paginas
const router = express.Router();

const pool = require('../database');

const {isLoggedIn}=require('../lib/auth');


router.get('/add', isLoggedIn,(req, res) => {

    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const { idCuenta, nombreProducto, cantidadProducto, descripcionProducto, fechaProducto } = req.body;
    const newLink = {
        idCuenta:req.user.idCuenta,
        nombreProducto,
        cantidadProducto,
        descripcionProducto,
        fechaProducto,
        
        

    };
    await pool.query('INSERT INTO producto set?', [newLink]);
    req.flash('success','producto guardado correctamente');
    res.redirect('/links');
});

router.get('/', async (req, res) => {

    const producto = await pool.query('SELECT * FROM producto WHERE idCuenta=? ', [req.user.idCuenta]);
   
    res.render('links/list',{producto});
})

router.get('/delete/:idProducto',isLoggedIn, async(req,res)=>{
    const{idProducto}=req.params;
    await pool.query('DELETE FROM producto WHERE idProducto =?',[idProducto]);
    req.flash('success','prodcuto eliminado');
    res.redirect('/links')
})
 router.get('/edit/:idProducto', isLoggedIn,async(req,res)=>{
    const{idProducto}=req.params;
    const producto=await pool.query('SELECT * FROM producto WHERE idProducto=?',[idProducto])
    
   res.render('links/edit',{producto:producto[0]});
 
 });
 router.post('/edit/:idProducto',async(req,res)=>{

    const {idProducto}=req.params;
    const{idCuenta,nombreProducto,cantidadProducto,descripcionProducto,fechaProducto}=req.body;
    const newProducto={
        idCuenta,
        nombreProducto,
        cantidadProducto,
        descripcionProducto,
        fechaProducto
    };
    await pool.query('UPDATE producto set? WHERE idProducto=?',[newProducto,idProducto])
    req.flash('success','producto actualizado');
    res.redirect('/links');
 });

module.exports = router;