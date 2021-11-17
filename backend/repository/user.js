const mysql = require('./../database/mysql/models');
const getList = async (limit) => {
    return mysql.Users.findAll({
        attributes: [
            'firstName',
            'lastName',
            'gender',
            'picture'
        ],
        limit: limit
    });
};

const detail = async (_id) => {
    return mysql.Users.findOne({
        where:{
            id: _id
        }
    });
};
module.exports = {
    getList,
    detail
}