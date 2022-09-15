const {Celular}=require('../db')
const {crearMarca}=require('../Middleware/crearMarca.middleware')

const modificarProducto=async(id, linea, modelo,capacidad,precio,stock,image, especificaciones, descripcion, marca)=>{
    let producto= await Celular.findByPk(id)

    linea? producto.linea=linea:linea
   
    modelo? producto.modelo=modelo:modelo
   
    image? producto.image=image:image
   
    descripcion? producto.descripcion=descripcion:descripcion
   
    especificaciones? producto.especificaciones=especificaciones:especificaciones
   
    capacidad? producto.capacidad=capacidad:capacidad
   
    precio?producto.precio=parseInt(precio):precio

    stock?producto.stock=parseInt(stock):stock
    if(marca){
        let mar=await crearMarca(marca)
        await producto.setMarca(mar)
    }
    producto.save()
    return {flag:true, message:"Producto modificado"}

}
module.exports={modificarProducto}