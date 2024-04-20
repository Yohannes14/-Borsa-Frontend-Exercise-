
import { FetchUsrsRequestAction, UpdateProfileRequestAction } from 'app/types/types';
import { BASE_URL } from 'app/utils/baseUri';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUsrsFailure, fetchUsrsSuccess, updateProfileFailure, updateProfileSuccess } from '../actions/userAction';


function* fetchUsers(action: FetchUsrsRequestAction): Generator<any, void, any> {
    try {
        const { page, limit } = action.payload || {};
        const res = yield call(axios.get, `${BASE_URL}/fetch/dummy/user-v2`, { params: { page, limit } });
        const { data, total } = res.data;
        yield put(fetchUsrsSuccess(data, total));
    } catch (error: any) {
        // If there's a specific error response from the server, handle it here
        if (error.response && error.response.data && error.response.data.message) {
            yield put(fetchUsrsFailure(error.response.data.message));
        } else {
            // If there's network issue, provide a default message
            yield put(fetchUsrsFailure('Failed to fetch users. Please try again later.'));
        }
    }
};


function* updateProfileRequest(action: UpdateProfileRequestAction): Generator<any, void, any> {
    try {
        const { userId, changes } = action.payload;
        const res = yield call(axios.put, `${BASE_URL}/profile?id=${userId}`, changes);
        yield put(updateProfileSuccess(res.data));
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            yield put(updateProfileFailure(error.response.data.message));
        } else {
            // If there's network issue, provide a default message
            yield put(updateProfileFailure('Failed to update profile. Please try again later.'));
        }
    }
}

function* updateProfileSaga() {
    yield takeLatest("UPDATE_PROFILE_REQUEST", updateProfileRequest);
}

function* fetchUsersSaga() {
    yield takeLatest("FETCH_USRS_REQUEST", fetchUsers);
}

export { fetchUsersSaga, updateProfileSaga };