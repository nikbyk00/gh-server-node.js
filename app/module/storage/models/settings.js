const { DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const { Helper } = require('../helpers');

class Settings extends Model {

}

Settings.init({
    id : {
    type: DataTypes.STRING,
    primaryKey: true,
        defaultValue: () => {
        return Helper.getUUID()
        }
    },
    userId : {
        type: DataTypes.STRING,
        allowNull: false
    },
    lang: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "rus"
    },
    topic: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "white"
    },
    disablingGh: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "min_30"

    },
    disablingSensor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "min_30"
    },
    conflict: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "min_30"
    },
    reminder: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "day_2"
    },
    reminderMaturationDay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
    {
    sequelize: db,
    tableName: 'room'
    }
);

module.exports = { Settings }