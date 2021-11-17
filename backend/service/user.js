const userRepository = require('../repository/user');
const { to } = require('./../library/response/index');
const getList = async (limit) => {
    return await to(userRepository.getList(limit));
}

const detail = async (id) => {
    return await to(userRepository.detail(id));
}

module.exports = {
    getList,
    detail
}