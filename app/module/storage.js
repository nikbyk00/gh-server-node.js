const {db} = require('./storage/database')
const modules = require('./index')
const common = require('./storage/common') 

 class Storage {
     static sequelize = db
     static models = modules
     static common = common
}

module.exports = Storage