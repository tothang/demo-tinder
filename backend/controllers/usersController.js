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

module.exports = {
    list,
    detail
};