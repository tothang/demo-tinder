const userRepository = require('../repository/user');
const { to } = require('./../library/response/index');
const getList = async (limit) => {
    return await to(userRepository.getList(limit));
}

const detail = async (id) => {
    return await to(userRepository.detail(id));
}

const like = async (currentId, likedId) => {
    return await to(userRepository.insertLike({
        userId: currentId,
        likedId: likedId
    }));
}

const pass = async (currentId, likedId) => {
    return await to(userRepository.insertPass({
        userId: currentId,
        likedId: likedId
    }));
}

module.exports = {
    getList,
    detail,
    like,
    pass
}