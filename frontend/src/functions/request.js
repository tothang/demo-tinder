import 'isomorphic-fetch'

function request(url, token, options) {
	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'app-id': '61866d3f941a77c3945a76ce'
	};


	return fetch(url, {
		headers,
		...options
	}).then(response => response.json())
		.then(data => {
			if (typeof data.meta !== 'undefined' && data.meta.status !== 200) {
				console.log(data.meta.message)
				throw new Error(data.meta.message);
			}
			return data;
		})
}

export {request};
