const {Marca}=require('../db')
const {MARCA}=require('./marcas')

async function seederMarcas(){
    const response=await Marca.findAll();
    if(response.length > 0){
        console.log("Marcas ya Cargadas")
    }else{
        Marca.bulkCreate(MARCA);
        console.log("SeederMarcas")
    }
}
module.exports={
    seederMarcas
}
