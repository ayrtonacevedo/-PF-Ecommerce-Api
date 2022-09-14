const {Marca}=require('../db')


const crearMarca=async(marca)=>{
    let existe = await Marca.findOne({where:{nombre:marca}})
    if(existe){return existe;}
    else{return await Marca.create({nombre: marca.toUpperCase()})}

}
module.exports={crearMarca}