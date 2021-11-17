const mysql = require('./../database/mysql/models');
const getList = async (data) => {
    return mysql.User.findAll({
        limit: data.limit
    });
};
module.exports = {
    getList
}