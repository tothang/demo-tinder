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
	}

	render() {
		const {error, loaded, list} = this.props.users;
		return (
			loaded && !error ? (
				<div className="row">
					aaaa
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
