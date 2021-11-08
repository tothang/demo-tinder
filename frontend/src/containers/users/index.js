import React from 'react'
import {connect} from "react-redux";
import {loadUsers} from "./actions"
import {bindActionCreators} from "redux"
import {notify} from "react-notify-toast"
import './style.scss';

class Index extends React.Component {
	// static getInitialProps({req, store, isServer}) {
	// 	// Check If Server request
	// 	if (req && req.headers && isServer) {
	// 		const cookies = req.headers.cookie;
	// 		if (typeof cookies === 'string') {
	// 			store.dispatch(loadUsers());
	// 		}
	// 	} else {
	// 		store.dispatch(loadUsers());
	// 	}
	// }

	componentDidMount() {
		this.props.loadUsers(10,1);
	}

	constructor(props) {
		super(props);
		this.state = {
			i: 0,
			isShow: false
		};
	}

	_handleNextOne = async (i, limit, page) => {
		if (i < limit - 1){
			setTimeout(() => {
				this.setState({
					i: i + 1
				});
			}, 1200);

		}else {
			await this.props.loadUsers(limit,page + 1);
			this.setState({
				i: 0
			});
		}
	};

	_handleLike = async (i, limit, page, user) => {
		notify.show(`You Like ${user.firstName}`, 'success',1000);
		this._handleNextOne(i, limit, page);
		let arrLiked = localStorage.getItem('arrLiked');
		//localStorage.setItem('arrLiked', JSON.stringify(user));
	};

	_handleSkip = async (i, limit, page) => {
		if (i < limit - 1){
			this.setState({
				i: i + 1
			});
		}else {
			this.setState({
				i: 0
			});
			await this.props.loadUsers(limit,page + 1);
		}
	};

	getAge = (dateString) => {
		let today = new Date();
		let birthDate = new Date(dateString);
		let age = today.getFullYear() - birthDate.getFullYear();
		let m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	render() {
		const {error, loaded, list, currentPage, limit} = this.props.users;
		const {i} = this.state || 0;
		const user = list[i];
		return (
			loaded && !error ? (
				<div className="row">
					<div className="user-image">
						<img src={user.picture}/>
					</div>
					<div className="user-infor">
						<h3>
							<span>{user.firstName} {user.lastName}, {this.getAge(user.dateOfBirth)}</span>
						</h3>
					</div>
					<div className="group-btn">
						<a className="label"
						   onClick={(e) => this._handleNextOne(i, limit, currentPage)}>
							<img src="https://cdn-icons-png.flaticon.com/512/458/458594.png"/>
						</a>
						<a className="label"
						   onClick={(e) => this._handleLike(i, limit, currentPage, user)}>
							<img src="https://findicons.com/files/icons/734/phuzion/128/fav_heart.png"/>
						</a>
					</div>
					<div className="group-action">
						<div>
							<a>
								Like
							</a>

						</div>
						<div>
							<a>
								Discover
							</a>
						</div>
						<div>
							<a>
								Match
							</a>
						</div>
					</div>

				</div>

			) : (
				<div className="row">
					<h2>Loading</h2>
				</div>
			)
		)
	}
}

const mapStateToProps = state => ({
	users: state.users
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({loadUsers}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Index);
