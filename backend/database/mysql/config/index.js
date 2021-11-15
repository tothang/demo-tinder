const configs = require('./../../../config');

module.exports = {
    development: {
        username: configs.mysql.username,
        password: configs.mysql.password,
        database: configs.mysql.database,
        host: configs.mysql.host,
        port: configs.mysql.port,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true
        }
    }
};
