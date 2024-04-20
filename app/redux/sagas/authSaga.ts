
import { takeLatest, put, call } from 'redux-saga/effects';

import { LoginRequestAction, SignupRequestAction } from 'app/types/types';
import { loginFailure, loginSuccess, signupFailure, signupSuccess } from '../actions/authAction';
import { BASE_URL } from 'app/utils/baseUri';
import axios, { AxiosError } from 'axios';



function* handleSignup(action: SignupRequestAction): Generator<any, void, any> {

    try {
        // Make the API call using Axios instance
        const res = yield call(axios.post, `${BASE_URL}/register/v2`, action.payload)
        yield put(signupSuccess(res.data));

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError<any> = error;
            if (axiosError.response) {
                const { data } = axiosError?.response;
                yield put(signupFailure(data.message));
            } else {
                yield put(signupFailure('Network error. Please try again later.'));
            }
        } else {
            yield put(signupFailure(error?.response?.data?.message));
        }
    }
}

function* handleLogin(action: LoginRequestAction): Generator<any, void, any> {
    try {
        const res = yield call(axios.post, `${BASE_URL}/login`, action.payload)
        yield put(loginSuccess(res.data));


    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError<any> = error;
            if (axiosError.response) {
                const { data } = axiosError?.response;
                yield put(loginFailure(data.message));
            } else {
                yield put(loginFailure('Network error. Please try again later.'));
            }
        } else {
            yield put(loginFailure(error?.response?.data?.message));
        }
    }
}
function* signupSaga() {
    yield takeLatest("SIGNUP_REQUEST", handleSignup);
}

function* loginSaga() {
    yield takeLatest("LOGIN_REQUEST", handleLogin);
}


export {
    loginSaga,
    signupSaga
}