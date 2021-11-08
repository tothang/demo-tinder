import React from 'react'
import {Provider} from "react-redux";
import withSaga from "next-redux-saga";
import App from "next/app";
import flowRight from 'lodash.flowright'
import withRedux from "next-redux-wrapper";
import Store from "../store";
import User from '../containers/users';


class MyApp extends App {

	render() {
		const { store} = this.props;
		return (
			<Provider store={store}>
				<User/>
			</Provider>
		);
	}

}

export default flowRight([withRedux(Store), withSaga])(MyApp);
