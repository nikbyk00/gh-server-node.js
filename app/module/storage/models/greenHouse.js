const { DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const { Helper } = require('../helpers');

class GreenHouse extends Model {
 
}

GreenHouse.init({
id: {
    type: DataTypes.STRING,
    primaryKey: true,
},
  roomId: {
    type: DataTypes.STRING(255),
},
  name: {
    type: DataTypes.STRING(255),
},
  additionalTemperature: {
    type: DataTypes.NUMBER,
},
  temperature: {
    type: DataTypes.NUMBER,
},
  EC: {
    type: DataTypes.NUMBER,
},
  CO2: {
    type: DataTypes.NUMBER,
},
  illuminance: {
    type: DataTypes.NUMBER,
},
  liquidLevel: {
    type: DataTypes.NUMBER,
},
  ventilation: {
    type: DataTypes.BOOLEAN,
},
  washingInterval: {
    type: DataTypes.NUMBER,
},
  ph: {
    type: DataTypes.NUMBER,
}
},
    {
      sequelize: db,
      tableName: 'greenHouse'
    }
);

module.exports = { GreenHouse } 