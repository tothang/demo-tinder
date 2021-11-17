const { ReS, ReE } = require('../library/response');
const userService = require('../service/user');
const { QueryTypes } = require('sequelize');
const list = async (req, res) => {
    try {
        let result = await userService.notifyVerifyEmail(max_page, limit);
        return ReS(res, [], 200)
    } catch (error) {
        return ReE(res, error, 200)
    }
};

module.exports = {
    list
};