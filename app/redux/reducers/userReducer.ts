import { FetchActionTypes, User, UserData } from "app/types/types";
import * as type from "app/types/actionTypes";

interface FetchState {
    users: UserData[];
    loading: boolean;
    error: string | null;
    total: number
}

const initialState: FetchState = {
    users: [],
    loading: false,
    error: null,
    total: 0,
};

const userReducer = (state = initialState, action: FetchActionTypes): FetchState => {
    switch (action.type) {
        case type.FETCH_USRS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case type.FETCH_USRS_SUCCESS:
            return {
                ...state,
                users: [...state.users, ...action.payload.users],
                total: action.payload.total,
                loading: false,
                error: null,
            };
        case type.FETCH_USRS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;