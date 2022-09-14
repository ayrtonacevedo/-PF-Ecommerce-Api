const {PRODUCTOS}=require('./productos')
const { crearProducto } = require("../Middleware/crearProducto.middleware")
const {Celular}=require('../db')

const productoSeeder=async()=>{
    const response=await Celular.findAll();
    if(response.length>0){
        console.log("Los Productos ya estan cargados")
    }else{
        PRODUCTOS.map((e)=>{
            crearProducto(e.linea, e.modelo, e.capacidad, e.precio, e.stock, e.imagen, e.especificaciones, e.descripcion, e.marca)
        })
        console.log("SeederProducto")
    }
}
module.exports={productoSeeder}