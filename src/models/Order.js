const {DataTypes} =require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('order',{
        name:{type:DataTypes.STRING, allowNull: false},
        date:{type: DataTypes.DATEONLY},
        status:{type: DataTypes.STRING, default: 'Pendiente'}
    },{
        timestamps:false
    });
};