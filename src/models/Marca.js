const {DataTypes} =require('sequelize')
module.exports=(sequelize)=>{
    sequelize.define('marca',{
        nombre:{type:DataTypes.STRING, unique:true},
    },{
        timestamps:false
    });
};