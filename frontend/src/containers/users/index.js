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
			isShow: false,
			isListLike: false,
			isListPass: false,
			arrLiked: [],
			arrPass: [],
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
		let arrLiked = this.state.arrLiked;
		arrLiked.push(user);
		this.setState({
			arrLiked : arrLiked
		})
	};

	_handleSkip = async (i, limit, page, user) => {
		notify.show(`No`, 'success',1000);
		this._handleNextOne(i, limit, page);
		let arrPass = this.state.arrPass;
		arrPass.push(user);
		this.setState({
			arrPass : arrPass
		})
	};

	_showListLiked =  () => {
		this.setState({
			isShow : true,
			isListLike: true,
			isListPass: false,
		})
	};

	_showListPass =  () => {
		this.setState({
			isShow : true,
			isListPass: true,
			isListLike: false,
		})
	};

	_hideListLiked =  () => {
		this.setState({
			isShow : false
		})
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
		const {i , arrLiked, arrPass, isListLike, isShow} = this.state || 0;
		const user = list[i];
		return (
			loaded && !error ? (
				<div className="row">
					{
						!isShow ?
							(
								<div>
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
										   onClick={(e) => this._handleSkip(i, limit, currentPage, user)}>
											<img src="https://cdn-icons-png.flaticon.com/512/458/458594.png"/>
										</a>
										<a className="label"
										   onClick={(e) => this._handleLike(i, limit, currentPage, user)}>
											<img src="https://findicons.com/files/icons/734/phuzion/128/fav_heart.png"/>
										</a>
									</div>
								</div>
							)
							:(
								<div className="list-like">
									{
										isListLike ? (

											arrLiked.map((item, index) => {
												return (
													<div key={index}>
														<img src={item.picture}/>
														<span>
														{item.firstName} {item.lastName}, {this.getAge(user.dateOfBirth)}
														</span>

													</div>
												)
											})
										):(
												arrPass.map((item, index) => {
													return (
														<div key={index}>
															<img src={item.picture}/>
															<span>
															{item.firstName} {item.lastName}, {this.getAge(user.dateOfBirth)}
															</span>
														</div>
													)
												})
											)

									}
								</div>
							)
					}
					<div className="group-action">
						<div>
							<a onClick={(e) => this._showListLiked()} >
								Like
							</a>

						</div>
						<div>
							<a onClick={(e) => this._hideListLiked()}>
								Discover
							</a>
						</div>
						<div>
							<a onClick={(e) => this._showListPass()}>
								Pass
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
