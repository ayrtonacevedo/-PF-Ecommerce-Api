const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
   // defino el modelo
   sequelize.define('rating',
      {
         rating: { type: DataTypes.TEXT, allowNull: false },
         emailUser: { type: DataTypes.STRING, allowNull: false },
         comment: { type: DataTypes.TEXT },
         emailAdmin: { type: DataTypes.STRING },
         date: { type: DataTypes.DATE, allowNull: false },
      });

};