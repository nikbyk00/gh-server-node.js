const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') }) 

module.exports = {
    DB_LOG: true,
    DB_TYPE: 'postgres',
    DB_HOSTNAME: '91.240.84.192',
    DB_USERNAME: 'postgres',
    DB_PASSWORD: 'postgres',
    DB_DATABASE: 'greenhouse',
    DB_PORT: 5432
  }