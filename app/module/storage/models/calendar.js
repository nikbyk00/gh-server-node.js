const { DataTypes, Model } = require('sequelize');
const {db} = require('../database');
const { Helper } = require('../helpers');

class Calendar extends Model {
  
}

Calendar.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => {
            return Helper.getUUID()
        }
    },
    date: {
        type: DataTypes.STRING
    },
    maturationDate: {
        type: DataTypes.STRING
    },
    eventName: {
        type: DataTypes.STRING
    },
    event: {
        type: DataTypes.STRING
    },
    greenHouseId: {
        type: DataTypes.STRING
    }
},
  {
    sequelize: db,
    tableName: 'calendar'
  }
);

module.exports = { Calendar };