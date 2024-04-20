import { ProfileActionTypes, User } from "app/types/types";
import * as type from "app/types/actionTypes";


interface ProfileState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    user: null,
    loading: false,
    error: null,
};

const profileReducer = (state = initialState, action: ProfileActionTypes): ProfileState => {
    switch (action.type) {
        case type.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case type.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null,
            };
        case type.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default profileReducer;