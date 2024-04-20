import * as type from "app/types/actionTypes"
import { FetchUsrsFailureAction, FetchUsrsRequestAction, FetchUsrsSuccessAction, UpdateProfileFailureAction, UpdateProfileRequestAction, UpdateProfileSuccessAction, User, UserData } from "app/types/types";

export const fetchUsrsRequest = (page?: number, limit?: number): FetchUsrsRequestAction => ({
    type: type.FETCH_USRS_REQUEST,
    payload: { page, limit },
});

export const fetchUsrsSuccess = (users: UserData[], total: number): FetchUsrsSuccessAction => ({
    type: type.FETCH_USRS_SUCCESS,
    payload: { users, total },
});

export const fetchUsrsFailure = (error: string): FetchUsrsFailureAction => ({
    type: type.FETCH_USRS_FAILURE,
    payload: error,
});

export const updateProfileRequest = (userId: string, changes: Partial<User>): UpdateProfileRequestAction => ({
    type: type.UPDATE_PROFILE_REQUEST,
    payload: { userId, changes },
});

export const updateProfileSuccess = (user: User): UpdateProfileSuccessAction => ({
    type: type.UPDATE_PROFILE_SUCCESS,
    payload: user,
});

export const updateProfileFailure = (error: string): UpdateProfileFailureAction => ({
    type: type.UPDATE_PROFILE_FAILURE,
    payload: error,
});