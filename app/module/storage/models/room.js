const { DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const { Helper } = require('../helpers');

class Room extends Model {
 
}

Room.init({
id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => {
        return Helper.getUUID()
    }
},
roomName: {
    type: DataTypes.STRING(255),
    allowNull: false
},
spaceId: {
    type: DataTypes.STRING,
    allowNull: false
}
},
    {
    sequelize: db,
    tableName: 'room'
    }
);

module.exports = { Room } 