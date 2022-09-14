const {Marca}=require('../db');


const obtenerMarcas=async()=>{
    let marcas=await Marca.findAll()
    let toObj=[]
    marcas?.map((e)=>{
        toObj.push(e.nombre)
    })
    return toObj;
}
module.exports={obtenerMarcas}