const {Router}=require('express')
const {obtenerProductos,obtenerProductosById, obtenerProductosByMarca, obtenerProductosByCapacidad, obtenerProductosByLinea, filtrarProductosMarcaAndLinea, obtenerProductosByStock, obtenerProductosByPrecio}=require('../Middleware/getProducto.middleware')
const {crearProducto}=require('../Middleware/crearProducto.middleware')


const router=Router();

router.get('/', async(req,res,next)=>{
    let {marca,linea,stockmin,stockmax,precio,capacidad}=req.query;
    try{
        if(marca && linea){
            return res.status(200).json(await filtrarProductosMarcaAndLinea(marca,linea));
        }else if(stockmin && stockmax){
            return res.status(200).json(await obtenerProductosByStock(stockmin,stockmax));
        }else if(precio){
            return res.status(200).json(await obtenerProductosByPrecio(precio));
        }else if(capacidad){
            return res.status(200).json(await obtenerProductosByCapacidad(capacidad));
        }else if(marca){
            return res.status(200).json(await obtenerProductosByMarca(marca));
        }else if(linea){
            return res.status(200).json(await obtenerProductosByLinea(linea));
        }else{
            let productos = await obtenerProductos()
            productos.length>0?
            res.send(productos):res.send({message:"No products"})
        }
    }
    catch(error){next(error.message); console.log(error.message)}
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






module.exports=router