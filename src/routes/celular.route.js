
const {Router}=require('express')
const {obtenerProductos,obtenerProductosById}=require('../Middleware/getProducto.middleware')
const {crearProducto}=require('../Middleware/crearProducto.middleware')
const {crearMarca}=require('../Middleware/crearMarca.middleware')
const { Cell } = require('../db');


const router = Router();


router.get('/', async(req,res,next)=>{
    const allproductos=await obtenerProductos();
    const filters = req.query;
    try{
        const filteredProduct = allproductos.filter(c => {
            let isValid = true;
            for (key in filters) {
              if(key=="capacity" || key=="price"){
                let [min,max]=filters[key].split("/");
                    isValid = (c[key]>=min&&c[key]<=max)
              }else if(key=="memoryRAM"){
                isValid = `${c[key]}` === filters[key]
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
    catch (error) { next(error.message); console.log(error.message) }
})

router.get('/:id', async (req, res, next) => {
    let { id } = req.params
    try {
        let product = await obtenerProductosById(id)
        return res.send(product)
    }
    catch (error) { next(error); console.log(error) }
})

router.post('/', async (req, res, next) => {
    let { line, model, capacity, price, stock, image, spec, memoryRAM, description, disabled, brand } = req.body
    console.log(req.body, 'soy lo que le llega al back')
    try {
        let productoCreado = await crearProducto(line, model, capacity, price, stock, image, spec, memoryRAM, description, brand, disabled)
        productoCreado.flag ? res.send(productoCreado.message)
            : res.send(productoCreado.message)
    }
    catch (error) { next(error) }
})

router.put('/:id',async(req,res,next)=>{
  let {line, model, capacity, price, stock, image, spec, memoryRAM, description, brand, disabled}=req.body
  let {id}=req.params;
    
    try{
        await Cell.update(
          {line, model, capacity, price, stock, image, spec, memoryRAM, description, brand, disabled},
          {where: {id}}
        )

        if(brand){
          let marca =await crearMarca(brand)
          let cel = await Cell.findByPk(id)
          
          await cel.setBrand(marca)
          cel.save();
        }

        return res.status(200).json("Cell updated")

    }
    catch(error){next(error)}
})





module.exports=router

