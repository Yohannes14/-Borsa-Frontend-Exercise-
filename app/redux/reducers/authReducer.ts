import { AuthAction, AuthState } from "app/types/types";
import * as type from "app/types/actionTypes";


const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case type.LOGIN_REQUEST:
        case type.SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case type.LOGIN_SUCCESS:
        case type.SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false,
            };
        case type.LOGIN_FAILURE:
        case type.SIGNUP_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
                error: action.payload,
            };
        // case type.SIGNUP_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         isAuthenticated: true,
        //     };
        default:
            return state;
    }
};

export default authReducer;