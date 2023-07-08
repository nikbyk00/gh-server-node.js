const { DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const { Helper } = require('../helpers');

class Space extends Model {
 
}

Space.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => {
      return Helper.getUUID()
  }
      },
      userId: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      spaceName: {
      type: DataTypes.STRING(255),
      allowNull: false
      },
    },
      {
      sequelize: db,
      tableName: 'space'
    }
);

module.exports = { Space } 