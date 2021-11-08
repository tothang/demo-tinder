import React from 'react'
import {connect} from "react-redux";
import {loadUsers} from "./actions"
import {bindActionCreators} from "redux"
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
		};
	}

	_handleNextOne = async (i, limit, page) => {
		if (i < limit - 1){
			this.setState({
				i: i + 1
			});
		}else {
			await this.props.loadUsers(limit,page + 1);
			this.setState({
				i: 0
			});
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
		const {i} = this.state;
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
						<a className="label label-danger"
						   onClick={(e) => this._handleNextOne(i, limit, currentPage)}>
							Like
						</a>
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
