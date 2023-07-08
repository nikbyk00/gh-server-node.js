const { DataTypes, Model } = require('sequelize');
const { db } = require('../database');
const { Helper } = require('../helpers');

class AdminPanelUserToken extends Model {
    
}

AdminPanelUserToken.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => {
            return Helper.getUUID()
        }
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adminPanelUserId: {
        field: 'adminPanelUserId',
        type: DataTypes.STRING
    },
    dateCreated: {
        field: 'dateCreated',
         type: DataTypes.BIGINT,
        defaultValue: () => {
            return Helper.getCurrentDateInMS()
        }
    }
},
  {
    sequelize: db,
    tableName: 'adminPanelUserToken'
  }
);

module.exports = { AdminPanelUserToken }