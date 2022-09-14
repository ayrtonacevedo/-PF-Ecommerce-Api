const {Router}= require('express')
const {obtenerMarcas}=require('../Middleware/getMarca.middleware')
const {crearMarca}=require('../Middleware/crearMarca.middleware')
const router=Router()

router.get('/', async(req,res,next)=>{
    try{
        let marcas=await obtenerMarcas()
        res.send(marcas)
    }
    catch(error){next(error)}
})
router.post('/', async(req,res,next)=>{
    let {marcas}=req.body
    try{
        let marca=await crearMarca(marcas)
        marca? res.send("Marca "+marcas+" agregado con exito"):res.send("Problema al agregar la marca")
    }
    catch(error){next(error)}
})
module.exports=router