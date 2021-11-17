const userRepository = require('../repository/user');
const { to } = require('./../library/response/index');
const getList = async (page, limit) => {
    let result = await to(userRepository);
    return result;
}

module.exports = {
    getList
}