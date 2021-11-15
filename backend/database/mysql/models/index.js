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
  logging: false,
  operatorsAliases: {
    $eq: Sequelize.Op.eq,
    $ne: Sequelize.Op.ne,
    $gte: Sequelize.Op.gte,
    $gt: Sequelize.Op.gt,
    $lte: Sequelize.Op.lte,
    $lt: Sequelize.Op.lt,
    $not: Sequelize.Op.not,
    $in: Sequelize.Op.in,
    $notIn: Sequelize.Op.notIn,
    $is: Sequelize.Op.is,
    $like: Sequelize.Op.like,
    $notLike: Sequelize.Op.notLike,
    $iLike: Sequelize.Op.iLike,
    $notILike: Sequelize.Op.notILike,
    $regexp: Sequelize.Op.regexp,
    $notRegexp: Sequelize.Op.notRegexp,
    $iRegexp: Sequelize.Op.iRegexp,
    $notIRegexp: Sequelize.Op.notIRegexp,
    $between: Sequelize.Op.between,
    $notBetween: Sequelize.Op.notBetween,
    $overlap: Sequelize.Op.overlap,
    $contains: Sequelize.Op.contains,
    $contained: Sequelize.Op.contained,
    $adjacent: Sequelize.Op.adjacent,
    $strictLeft: Sequelize.Op.strictLeft,
    $strictRight: Sequelize.Op.strictRight,
    $noExtendRight: Sequelize.Op.noExtendRight,
    $noExtendLeft: Sequelize.Op.noExtendLeft,
    $and: Sequelize.Op.and,
    $or: Sequelize.Op.or,
    $any: Sequelize.Op.any,
    $all: Sequelize.Op.all,
    $values: Sequelize.Op.values,
    $col: Sequelize.Op.col,
  },
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
