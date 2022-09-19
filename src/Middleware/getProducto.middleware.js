const {Brand, Cell,Op}=require('../db')

const obtenerProductos=async()=>{
    let productos=await Cell.findAll({include:[{model:Brand}]})
    let toObj=[]
    productos?.map((e)=>{
        toObj.push({
            id:e.id,
            line:e.line,
            model:e.model,
            capacity:e.capacity,
            price:e.price,
            stock:e.stock,
            image:e.image,
            spec:e.spec,
            memoryRAM: e.memoryRAM,
            description:e.description,
            brand:e.brand.name
        })
    })
    return toObj;
}
const obtenerProductosById=async(id)=>{
    let e= await Cell.findByPk(id,{include:[{model:Brand}]})
    const producto={
        id:e.id,
        line:e.line,
        model: e.model,
        capacity:e.capacity,
        price:e.price,
        stock:e.stock,
        image:e.image,
        spec:e.spec,
        memoryRAM: e.memoryRAM,
        description:e.description,
        brand:e.brand.name

    }
    return producto
}

module.exports={
    obtenerProductos,
    obtenerProductosById
}