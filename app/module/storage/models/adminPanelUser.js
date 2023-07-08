const { DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const { Helper } = require('../helpers');

class AdminPanelUser extends Model {
  
}

AdminPanelUser.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => {
      return Helper.getUUID()
  }
},
code: {
  type: DataTypes.STRING(255)
},
name: {
  type: DataTypes.STRING(255)
},
login: {
    type: DataTypes.STRING
},
password: {
    type: DataTypes.STRING
},
dateCreated: {
    field: 'dateCreated',
    type: DataTypes.BIGINT,
    defaultValue: () => {
      return Helper.getCurrentDateInMS()
  }
},
roles: {
    type: DataTypes.BIGINT
},
spaceId: {
  type: DataTypes.STRING(255)
}
},
  {
    sequelize: db,
    tableName: 'adminPanelUser'
  }
);

module.exports = { AdminPanelUser }                         