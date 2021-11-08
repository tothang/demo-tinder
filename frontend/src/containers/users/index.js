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

	render() {
		const {error, loaded, list, currentPage, limit} = this.props.users;
		const {i} = this.state;
		return (
			loaded && !error ? (
				<div className="row">
					<div className="user-image">
						<img src={list[i].picture}/>
					</div>
					<a className="label label-danger"
					   onClick={(e) => this._handleNextOne(i, limit, currentPage)}>Bỏ</a>
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
