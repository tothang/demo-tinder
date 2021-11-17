const { ReS, ReE } = require('../library/response');
const userService = require('../service/user');
const list = async (req, res) => {
    try {
        let result = await userService.getList( 10);
        return ReS(res, result, 200)
    } catch (error) {
        return ReE(res, error, 200)
    }
};

const detail = async (req, res) => {
    try {
        let result = await userService.detail( req.params.id);
        return ReS(res, result, 200)
    } catch (error) {
        return ReE(res, error, 200)
    }
};

const like = async (req, res) => {
    try {
        let currentId = req.headers.token.split(".")[2]
        let likeId = req.params.id;
        let result = await userService.like(currentId,likeId);
        return ReS(res, result, 200)
    } catch (error) {
        return ReE(res, error, 200)
    }
};

const pass = async (req, res) => {
    try {
        let currentId = req.headers.token.split(".")[2]
        let likeId = req.params.id;
        let result = await userService.pass(currentId,likeId);
        return ReS(res, result, 200)
    } catch (error) {
        return ReE(res, error, 200)
    }
};

module.exports = {
    list,
    detail,
    like,
    pass
};