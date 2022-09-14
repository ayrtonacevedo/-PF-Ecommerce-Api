const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('celular', {
    linea: {type: DataTypes.STRING,allowNull: false,},
    modelo:{type:DataTypes.STRING, allowNull:false},
    capacidad:{ type:DataTypes.STRING,allowNull:false},
    precio:{ type:DataTypes.FLOAT,allowNull:false},
    stock:{ type:DataTypes.INTEGER},
    image:{type:DataTypes.TEXT,},
    especificaciones:{type:DataTypes.ARRAY(DataTypes.STRING),},
    descripcion:{type:DataTypes.TEXT}
  },{
    timestamps:false
  });
};

