const {Celular}=require("../db")
const {crearMarca}=require('../Middleware/crearMarca.middleware')

const crearProducto = async (linea, modelo, capacidad, precio, stock, image, especificaciones, descripcion, marca)=>{
    let mar=await crearMarca(marca)
    let existe=await Celular.findOne({where:{linea:linea,modelo:modelo, capacidad:capacidad, descripcion:descripcion  }})
    if (existe){console.log(linea+" "+modelo+" ya existe!");return {flag: false, message:"ya existe el producto"}}
    let producto=await Celular.create({
        linea:linea,
        modelo:modelo,
        capacidad:capacidad,
        precio:precio,
        stock:stock,
        image:image,
        especificaciones:especificaciones,
        descripcion:descripcion
    })
    await producto.setMarca(mar)
    producto.save();
    return{flag:true,message:"Producto creado"}
}
module.exports={crearProducto}