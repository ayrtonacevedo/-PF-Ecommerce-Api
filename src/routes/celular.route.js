const {Router}=require('express')
const {obtenerProductos,obtenerProductosById}=require('../Middleware/getProducto.middleware')
const {crearProducto}=require('../Middleware/crearProducto.middleware')
const { modificarProducto } = require('../Middleware/modificarProducto.middleware');


const router=Router();

router.get('/', async(req,res,next)=>{
    const allproductos=await obtenerProductos();
    const filters = req.query;
    try{
        const filteredProduct = allproductos.filter(c => {
            let isValid = true;
            for (key in filters) {
              console.log(key, c[key], filters[key]);
              if(key=="capacity"){
                let [min,max]=filters[key].split("/");
                    isValid = isValid && (c[key]>=min&&c[key]<=max)
              }else if(key=="price"){
                let [min,max]=filters[key].split("/");
                    isValid = isValid && (c[key]>=min&&c[key]<=max)
              }else if(key=="stock"){
                let [min,max]=filters[key].split("/");
                    isValid = isValid && (c[key]>=min&&c[key]<=max)
              }else if(key=="memoryRAM"){
                let [min,max]=filters[key].split("/");
                    isValid = isValid && (c[key]>=min&&c[key]<=max)
              }else{
                isValid = isValid && c[key].toLowerCase().includes(filters[key].toLowerCase());
              }
            }
            return isValid;
          });
          if(!filters){
            const products=await obtenerProductos();
            products.length>0?
            res.send(products):res.send({message:"No products"})
          }else{
            filteredProduct.length>0?
            res.send(filteredProduct):res.send({message:"No products"})
          }
    }
    catch(error){next(error.message); console.log(error.message)}
})

router.get('/:id', async(req,res,next)=>{
    let {id}=req.params
    try{
        let product = await obtenerProductosById(id)
        return res.send(product)
    }
    catch(error){next(error); console.log(error)}
})

router.post('/',async(req,res,next)=>{
    let {line, model, capacity, price, stock, image, spec, memoryRAM, description, disabled, brand}=req.body
    try{
        let productoCreado=await crearProducto(line, model, capacity, price, stock, image, spec, memoryRAM, description, brand, disabled)
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