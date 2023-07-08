const { DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const { Helper } = require('../helpers');

class Journal extends Model {
 
}

Journal.init({
id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => {
        return Helper.getUUID()
    }
},
time: {
    type: DataTypes.STRING(255),
    allowNull: false
},
date: {
    type: DataTypes.STRING(255),
    allowNull: false
},
spaceId: {  
    type: DataTypes.STRING(255),
    allowNull: false
},
event: {
    type: DataTypes.STRING(255),
    allowNull: false
}
},
    {
    sequelize: db,
    tableName: 'journal'
    }
);

module.exports = { Journal }