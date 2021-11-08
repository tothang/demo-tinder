import {call, fork, put, takeLatest} from "redux-saga/effects";
import Services from './service';
import {LOADED_USERS, LOAD_USERS} from "./constants";

function* fetchPosts(action) {
	try {
		// Get date from Api
		const users = yield call(Services.getUser,action.page,action.limit);
		yield put({
			type: LOADED_USERS,
			payload: {
				list: users,
				loaded: true,
			}
		});
	} catch (e) {
		console.log(e)
		yield put({type: LOADED_USERS, payload: {list: {}, loaded: false, error: true}});
	}

}

function* watchFetchUsers() {
	yield takeLatest(LOAD_USERS, fetchPosts);
}

export default function* postsSagas() {
	yield fork(watchFetchUsers);
}

