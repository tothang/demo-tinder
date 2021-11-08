import Cookie from "js-cookie"
import 'isomorphic-fetch'

function filterGet(_filter) {
	return `?filters=${encodeURI(JSON.stringify(_filter))}`
}

function request(url, token, options) {
	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	} else if (typeof localStorage !== "undefined" && localStorage.getItem('token')) {
		headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
	} else if (typeof Cookie !== "undefined" && Cookie.get('token')) {
		headers['Authorization'] = `Bearer ${Cookie.get('token')}`;
	}
	return fetch(url, {
		headers,
		...options
	}).then(response => response.json())
		.then(data => {
			//console.log(data);
			if (typeof data.meta !== 'undefined' && data.meta.status !== 200) {
				throw new Error(data.meta.message);
			}

			return data;
		})

}

export {filterGet, request};
