const { DataTypes, Model } = require('sequelize');
const {db} = require('../database');

class Migration extends Model {

}

Migration.init(
  {
    filename: { type: DataTypes.STRING, primaryKey: true },
    appliedAt: { type: DataTypes.DATE, allowNull: false }
  },
  {
    sequelize: db,
    tableName: '_migrations'
  }
)

module.exports = { Migration }



