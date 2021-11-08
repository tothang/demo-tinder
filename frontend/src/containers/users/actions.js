import {LOAD_USERS} from './constants'


export function loadUsers(limit, page) {
	return {
		type: LOAD_USERS,
		page: page || 1,
		limit: limit || 10
	}
}
