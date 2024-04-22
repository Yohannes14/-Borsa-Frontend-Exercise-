import * as type from "app/types/actionTypes";
import {
    LoginFailureAction,
    LoginRequestAction,
    LoginSuccessAction,
    SignupFailureAction,
    SignupRequestAction,
    SignupSuccessAction, User
} from 'app/types/types';


export const signupRequest = (userData: User): SignupRequestAction => ({
    type: type.SIGNUP_REQUEST,
    payload: userData,
});

export const signupSuccess = (user: User): SignupSuccessAction => ({
    type: type.SIGNUP_SUCCESS,
    payload: user
});

export const signupFailure = (error: string): SignupFailureAction => ({
    type: type.SIGNUP_FAILURE,
    payload: error,
});

export const loginRequest = (credentials: { email: string; password: string }): LoginRequestAction => ({
    type: type.LOGIN_REQUEST,
    payload: credentials,
});

export const loginSuccess = (user: User): LoginSuccessAction => ({
    type: type.LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error: string): LoginFailureAction => ({
    type: type.LOGIN_FAILURE,
    payload: error,
});
