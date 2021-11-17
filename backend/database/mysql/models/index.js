'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configs = require('./../../../config');
const db = {};
const sequelize = new Sequelize(configs.mysql.database, configs.mysql.username, configs.mysql.password, {
  host: configs.mysql.host,
  port: configs.mysql.port,
  dialect: 'mysql',
  dialectOptions: {
    supportBigNumbers: true,
    bigNumberStrings: true,
    decimalNumbers: true,
    connectTimeout: 60000
  },
  define: {
    underscored: false,
    freezeTableName: false,
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_unicode_ci',
    },
    timestamps: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 120000,
  },
  logging: true,
});
sequelize.authenticate().then(function() {
  // console.log('Connection Successfully To mysql Database.');
  return null;
}).catch(function(err) {
  // console.log(`Unable to connect to the database: ${err}`);
  return err;
});
const basename = path.basename(__filename);

fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
