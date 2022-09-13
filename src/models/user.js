const {DataTypes} =require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('user',{
        name:{type:DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING,allowNull: false, unique: true},
        password:{type:DataTypes.STRING, allowNull:false},
        image:{ type:DataTypes.TEXT},
        location:{ type:DataTypes.STRING,allowNull:false},
        direction:{ type:DataTypes.STRING, allowNull:false},
        image:{type:DataTypes.TEXT},
        rol:{type:DataTypes.ENUM('Administrador','Vendedor','Comprador')},
    },{
        timestamps:false
    });
};