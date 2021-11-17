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

const insertLike = async (data) => {
    return mysql.LikeUser.create(data);
};

const insertPass = async (data) => {
    return mysql.PassUser.create(data);
};

module.exports = {
    getList,
    detail,
    insertLike,
    insertPass
}