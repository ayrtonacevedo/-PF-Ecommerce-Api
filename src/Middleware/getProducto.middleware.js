const {Celular, Marca,Op}=require('../db')

const obtenerProductos=async()=>{
    let productos=await Celular.findAll({include:[{model:Marca}]})
    let toObj=[]
    productos?.map((e)=>{
        toObj.push({
            id:e.id,
            linea:e.linea,
            modelo:e.modelo,
            capacidad:e.capacidad,
            precio:e.precio,
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
// filtrado por marca
const obtenerProductosByMarca=async(marca)=>{
    const allProductos=await obtenerProductos();
    const filtrarProductosByMarca=allProductos.filter(c=>c.marca.toLowerCase().includes(marca.toLowerCase()));
    if(filtrarProductosByMarca.length<=0){
        throw new Error("No Product")
    }else{
        return filtrarProductosByMarca;
    }
}
// filtrado por linea
const obtenerProductosByLinea=async(linea)=>{
    const allProductos=await obtenerProductos();
    const filtrarProductosByLinea=allProductos.filter(c=>c.linea.toLowerCase().includes(linea.toLowerCase()));
    if(filtrarProductosByLinea.length<=0){
        throw new Error("No Product")
    }else{
        return filtrarProductosByLinea;
    }
}
// filtrado por stock
const obtenerProductosByStock=async(stockmin,stockmax)=>{
    const allProductos=await obtenerProductos();
    const filtrarProductosByStock=allProductos.filter(c=>{
        if(c.stock>=stockmin && c.stock<=stockmax){
            return c;
        }
    });
    if(filtrarProductosByStock.length<=0){
        throw new Error("No Product")
    }else{
        return filtrarProductosByStock;
    }
}
// filtrado por precio
const obtenerProductosByPrecio=async(precio)=>{
    const allProductos=await obtenerProductos();
    const filtrarProductosByPrecio=allProductos.filter(c=>{
        if(c.precio<=precio){
            return c;
        }
    });
    if(filtrarProductosByPrecio.length<=0){
        throw new Error("No Product")
    }else{
        return filtrarProductosByPrecio;
    }
}

// filtrado por capacidad
const obtenerProductosByCapacidad=async(capacidad)=>{
    const allProductos=await obtenerProductos();
    const filtrarProductosByCapacidad=allProductos.filter(c=>{
        if(c.capacidad.includes("MB")){
            c.capacidad=parseInt(c.capacidad)*0.001+"GB"
        }
        if(c.capacidad.includes("TB")){
            c.capacidad=parseInt(c.capacidad)*1000+"GB"
        }
        const newdata=c.capacidad.split("GB");
        if(parseInt(newdata[0])<=parseInt(capacidad)){
            return c;
        }
    });
    if(filtrarProductosByCapacidad.length<=0){
        throw new Error("No Product")
    }else{
        return filtrarProductosByCapacidad;
    }
}

// filtrado por linea
const filtrarProductosMarcaAndLinea=async(marca,linea)=>{
    const allProductosByMarca=await obtenerProductosByMarca(marca);
    const filtrarProductosBymarca_Linea=allProductosByMarca.filter(c=>c.linea.toLowerCase().includes(linea.toLowerCase()));
    if(filtrarProductosBymarca_Linea.length<=0){
        throw new Error("No Product")
    }else{
        return filtrarProductosBymarca_Linea;
    }
}



module.exports={
    obtenerProductos,
    obtenerProductosById,
    obtenerProductosByMarca,
    obtenerProductosByLinea,
    obtenerProductosByStock,
    obtenerProductosByPrecio,
    filtrarProductosMarcaAndLinea,
    obtenerProductosByCapacidad
}