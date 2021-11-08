import config from "../config/index"
import Cookie from "js-cookie"

export default class Service {
	constructor(domain) {
		this.domain = domain || config.api;
		this.fetch = this.fetch.bind(this);
		this.login = this.login.bind(this);
		this.getProfile = this.getProfile.bind(this);
		console.log('Service Loaded')
	}

	login(email, password) {
		return this.fetch(`${this.domain}/api/user/login`, {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		}).then(res => {
			this.setToken(res.token);
			res.permission = this.getPermission(res.type);
			this.setProfile(res);
			this.setLanguage();
			return res;
		}).catch(e => {
			throw new Error(e.message);
		})
	}

	loggedIn(req) {
		const token = this.getToken(req);
		return !!token
	}

	getPermission(_type) {
		switch (_type) {
			case 0:
				return {
					isListDashboard: true,
					isListUser: false,
					isAddUser: false,
					isDeleteUser: false,
					isListDomain: false,
					isAddDomain: false,
					isDeleteDomain: false,
					isListCampaign: true,
					isAddCampaign: false,
					isDeleteCampaign: false,
					isListSite: false,
					isAddSite: false,
					isDeleteSite: false,
					isListArticle: true,
					isDetailArticle: true,
				};
			case 1:
				return {
					isListDashboard: true,
					isListUser: false,
					isAddUser: false,
					isDeleteUser: false,
					isListDomain: true,
					isAddDomain: true,
					isDeleteDomain: true,
					isListCampaign: true,
					isAddCampaign: true,
					isDeleteCampaign: true,
					isListSite: true,
					isAddSite: true,
					isDeleteSite: true,
					isListArticle: true,
					isDetailArticle: true,
				};
			case 2:
				return {
					isListDashboard: true,
					isListUser: true,
					isAddUser: true,
					isDeleteUser: true,
					isListDomain: true,
					isAddDomain: true,
					isDeleteDomain: true,
					isListCampaign: true,
					isAddCampaign: true,
					isDeleteCampaign: true,
					isListSite: true,
					isAddSite: true,
					isDeleteSite: true,
					isListArticle: true,
					isDetailArticle: true,
				};
		}
	}

	setProfile(profile) {
		Cookie.set('profile', JSON.stringify(profile));
		localStorage.setItem('profile', JSON.stringify(profile))
	}

	getProfile(req) {
		const profile = process.browser ? Cookie.get('profile') : decodeURIComponent(this.getCookieFromServer(req, 'profile'));
		return profile && profile !== "undefined" && typeof profile === "string" ? JSON.parse(profile) : {}
	}

	setToken(idToken) {
		Cookie.set('token', idToken);
		localStorage.setItem('token', idToken)
	}

	setLanguage() {
		Cookie.set('language', 'en');
		localStorage.setItem('language', 'en')
	}

	getToken(req) {
		return process.browser
			? this.getCookieFromBrowser()
			: this.getCookieFromServer(req, 'token')
	}

	getCookieFromBrowser() {
		return Cookie.get('token');
	}


	getCookieFromServer(req, param) {
		if (!req.headers.cookie) {
			return undefined;
		}
		const rawCookie = req.headers.cookie
			.split(";")
			.find(c => c.trim().startsWith(`${param}=`));
		if (!rawCookie) {
			return undefined;
		}

		return rawCookie.split("=")[1];
	}

	logout(_res) {
		if (!_res && process.browser) {
			localStorage.removeItem('token');
			localStorage.removeItem('profile');
		} else {
			_res.clearCookie("token");
			_res.clearCookie("profile");
		}
	}

	_checkStatus(response) {
		if (response.meta.status >= 200 && response.meta.status < 300) {
			return response.response
		} else {
			throw new Error(response.meta.message);
		}
	}

	fetch(url, options) {
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};

		return fetch(url, {
			headers,
			...options
		}).then(response =>
			response.json()
		).then(this._checkStatus)
	}
}
