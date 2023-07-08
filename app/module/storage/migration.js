const fs = require('fs');
const path = require('path');
const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const { Migration } = require('./models/_migrations');
const { db } = require('./database');

const logger = console;
const migrationsPath = path.join(__dirname, '../../db/seeders');

async function runMigrations() {
  const list  = [];
  const queryInterface = db.getQueryInterface();
  queryInterface.createTable('_migrations', {
    filename: DataTypes.STRING,
    appliedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('current_timestamp'),
      allowNull: false
    }
  });

  logger.debug(`Scan folder "${migrationsPath}" for migrations`, { scope: 'migrations' });
  console.log('------------------ --------------------- ----------')
try {
  list = await Promise.all([
    readDir(migrationsPath),
    Migration.findAll(),
  ]);
} catch (err) {
  console.log(err),
  alert(err)
}

console.log('^^^^^^^^^^^^^^^')
  for (const file of list) {
    if (!file.match(/\.js$/)) {
      continue;
    }
    const appliedMigration = migrations.find((migration) => migration.filename === file);
    if (appliedMigration) {
      logger.debug(`Migration "${file}" was applied at ${appliedMigration.appliedAt}`, { scope: 'migrations' });
      continue;
    }
    logger.debug(`Migration "${file}" applying...`, { scope: 'migrations' });

    const { up, down } = require(path.join(migrationsPath, file));

    if (!up || !down) {
      throw new Error(`Invalid migration functions in file ${file}`);
    }

    await up(queryInterface, sequelize);

    const item = new Migration({
      filename: file,
      appliedAt: Date.now()
    });
    await item.save();
  }

  function readDir(dir) {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, (errDir, files) => {
        if (errDir) {
          return reject(errDir);
        }
        return resolve(files);
      });
    });
  }
}

async function revertMigration(name) {
  const migrationFile = path.join(migrationsPath, name);

  logger.debug(`Reverting "${migrationFile}"...`, { scope: 'migrations' });

  const migration = await Migration.findOne({
    where: { filename: name }
  });
  if (!migration) {
    throw new Error(`Migration "${name}" not applied`);
  }

  const { up, down } = require(migrationFile);

  if (!up || !down) {
    throw new Error(`Invalid migration functions in file ${migrationFile}`);
  }
  await down(db.getQueryInterface(), sequelize);
  await migration.destroy();
}

module.exports = {
  runMigrations,
  revertMigration
}