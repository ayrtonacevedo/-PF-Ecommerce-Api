const {Router}=require('express')
const {obtenerProductos,obtenerProductosById}=require('../Middleware/getProducto.middleware')
const {crearProducto}=require('../Middleware/crearProducto.middleware');
const { modificarProducto } = require('../Middleware/modificarProducto.middleware');


const router=Router();

router.get('/', async(req,res,next)=>{
    try{
        let productos = await obtenerProductos()
        productos.length>0?
        res.send(productos):res.send({message:"No products"})
    }
    catch(error){next(error); console.log(error)}
})

router.get('/:id', async(req,res,next)=>{
    let {id}=req.params
    try{
        let producto = await obtenerProductosById(id)
        return res.send(producto)
    }
    catch(error){next(error); console.log(error)}
})

router.post('/',async(req,res,next)=>{
    let {linea, modelo, capacidad, precio, stock, image, especificaciones, descripcion,marca}=req.body
    try{
        let productoCreado=await crearProducto(linea, modelo, capacidad, precio, stock, image, especificaciones, descripcion,marca)
        productoCreado.flag? res.send(productoCreado.message)
        :res.send(productoCreado.message)
    }
    catch(error){next(error)}
})

router.put('/:id',async(req,res,next)=>{
    let {linea, modelo, capacidad, precio, stock, image, especificaciones, descripcion,marca}=req.body
    let{id}=req.params
    try{
        let productoModificado=await modificarProducto(linea, modelo, capacidad, precio, stock, image, especificaciones, descripcion,marca)
        productoModificado.flag? res.send(productoModificado.message)
        :res.send(productoModificado.message)
    }
    catch(error){next(error)}
})





module.exports=router