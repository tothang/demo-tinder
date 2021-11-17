const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './../.env') });

var configs = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    domain: process.env.DOMAIN,
    mysql: {
        database: process.env.MYSQL_DATABASE,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
    }

};

module.exports = configs