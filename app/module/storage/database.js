const Sequelize = require('sequelize')
const env = require ('../../db/config/env.config');

const { createNamespace } = require ('cls-hooked');

const namespace = createNamespace('ns');
Sequelize.useCLS(namespace);


  const db = new Sequelize({
    dialect: env.DB_TYPE,
    logging: env.DB_LOG ? console.log : false,
    host: env.DB_HOSTNAME,
    username: env.DB_USERNAME,
    password: `${env.DB_PASSWORD}`,
    port: env.DB_PORT,
    database: env.DB_DATABASE,
    timezone: '+00:00',
    define: {
      timestamps: false
    }
  });

  function openConnection() {
    return db.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
        })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
  }

  function openSync() {
    return db.sync()
      .then(() => {
          console.log('All models were synchronized successfully.');
        })
      .catch((err) => {
            console.error('All models were synchronized error:', err);
    });
  }
  
   function closeConnection() {
    return db.close();
   }

   module.exports = {
    db,
    openConnection,
    closeConnection,
    openSync
   }

