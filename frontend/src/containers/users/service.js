import {request} from '../../functions/request'
import Config from '../../config/index'


export default {

	getUserById: (id) => {
		return request(`${Config.api}/api/user/${id}`, null, {
			method: "GET"
		}).then((result) => {
			// if (result.response && typeof result.response.status !== 'undefined') {
			// 	result.response.status = Helpers.formatStatus(_cookies, result.response.status)
			// }
			// if (result.response && typeof result.response.type !== 'undefined') {
			// 	result.response.type = _.find(Config.default.type, {value: result.response.type});
			// }
			return result;
		})
	},

	getUser: (page, limit) => {
		return request(`${Config.api}/user?page=${page}&limit=${limit}`, null, {
			method: "GET"
		}).then(async (result) => {
			let listUsers = []
			await Promise.all(result.data.map(async (item) => {
				let userData = await request(`${Config.api}/user/${item.id}`,null,{method: "GET"});
				listUsers.push(userData)
			}))
			return listUsers;
		})
	}
}
