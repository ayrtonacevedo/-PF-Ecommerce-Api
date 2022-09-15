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
        model: e.modelo,
        capacity:e.capacity,
        price:e.capacity,
        stock:e.stock,
        image:e.image,
        spec:e.spec,
        memoryRAM: e.memoryRAM,
        description:e.description,
        brand:e.brand.name

    }
    return producto
}
// filtrado por marca
const obtenerProductosByMarca=async(brand)=>{
    const allProductos=await obtenerProductos();
    const filtrarProductosByMarca=allProductos.filter(c=>c.brand.toLowerCase().includes(brand.toLowerCase()));
    if(filtrarProductosByMarca.length<=0){
        throw new Error("No Product")
    }else{
        return filtrarProductosByMarca;
    }
}
// filtrado por linea
const obtenerProductosByLinea=async(line)=>{
    const allProductos=await obtenerProductos();
    const filtrarProductosByLinea=allProductos.filter(c=>c.line.toLowerCase().includes(line.toLowerCase()));
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
const obtenerProductosByPrecio=async(price)=>{
    const allProductos=await obtenerProductos();
    const filtrarProductosByPrecio=allProductos.filter(c=>{
        if(c.price<=price){
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
        if(c.capacity.includes("MB")){
            c.capacity=parseInt(c.capacity)*0.001+"GB"
        }
        if(c.capacity.includes("TB")){
            c.capacity=parseInt(c.capacity)*1000+"GB"
        }
        const newdata=c.capacity.split("GB");
        if(parseInt(newdata[0])<=parseInt(capacity)){
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
const filtrarProductosMarcaAndLinea=async(brand,line)=>{
    const allProductosByMarca=await obtenerProductosByMarca(brand);
    const filtrarProductosBymarca_Linea=allProductosByMarca.filter(c=>c.linea.toLowerCase().includes(line.toLowerCase()));
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