const {Celular, Marca}=require('../db')

const obtenerProductos=async()=>{
    let productos=await Celular.findAll({include:[{model:Marca}]})
    let toObj=[]
    productos?.map((e)=>{
        toObj.push({
            id:e.id,
            linea:e.linea,
            modelo:e.modelo,
            capacidad:e.capacidad,
            precio:e.capacidad,
            stock:e.stock,
            imagen:e.imagen,
            especificaciones:e.especificaciones,
            descripcion:e.descripcion,
            marca:e.marca.nombre
        })
    })
    return toObj;
}
const obtenerProductosById=async(id)=>{
    let e= await Celular.findByPk(id,{include:[{model:Marca}]})
    const producto={
        id:e.id,
        linea:e.linea,
        modelo:e.modelo,
        capacidad:e.capacidad,
        precio:e.capacidad,
        stock:e.stock,
        imagen:e.imagen,
        especificaciones:e.especificaciones,
        descripcion:e.descripcion,
        marca:e.marca.nombre

    }
    return producto
}
module.exports={obtenerProductos,obtenerProductosById}