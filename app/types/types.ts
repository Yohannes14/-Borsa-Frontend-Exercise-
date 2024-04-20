import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    FETCH_USRS_FAILURE,
    FETCH_USRS_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    FETCH_USRS_REQUEST,
} from 'app/types/actionTypes';


export interface Colors {
    primary: string;
    "gray-100": string;
    "gray-200": string;
    secondary: string;
    white: string;
    "gray-300": string;
    "grey-700": string;
}

export interface CustomButtonProps {
    title: string,
    onPress: () => void,
    isLoading: boolean

}

export interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    isBuyer: boolean;
    address: string;
    profilePic: string;
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    userName: string;
    isBuyer: boolean;
    address: string;
    profilePic?: string;
}

export interface UserInputProps {
    fullName: string,
    email: string,
    userName: string,
    password: string,
    confirmPassword?: string,
    isBuyer: boolean,
    address: string,
    profilePic: string
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}


////

export interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
    payload: {
        email: string;
        password: string;
    };
}

export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: User;
}

export interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: string;
}

export interface SignupRequestAction {
    type: typeof SIGNUP_REQUEST;
    payload: User;
}

export interface SignupSuccessAction {
    type: typeof SIGNUP_SUCCESS;
    payload: User
}

export interface SignupFailureAction {
    type: typeof SIGNUP_FAILURE;
    payload: string;
}

export type AuthAction =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | SignupRequestAction
    | SignupSuccessAction
    | SignupFailureAction;


///////////
export interface FetchUsrsRequestAction {
    type: typeof FETCH_USRS_REQUEST;
    payload?: {
        page?: number;
        limit?: number;
    };
}

export interface FetchUsrsSuccessAction {
    type: typeof FETCH_USRS_SUCCESS;
    payload: { users: UserData[], total: number }
}

export interface FetchUsrsFailureAction {
    type: typeof FETCH_USRS_FAILURE;
    payload: string;
}

export interface UpdateProfileRequestAction {
    type: typeof UPDATE_PROFILE_REQUEST;
    payload: {
        userId: string;
        changes: Partial<User>;
    };
}

export interface UpdateProfileSuccessAction {
    type: typeof UPDATE_PROFILE_SUCCESS;
    payload: User;
}

export interface UpdateProfileFailureAction {
    type: typeof UPDATE_PROFILE_FAILURE;
    payload: string;
}

export type FetchActionTypes =
    | FetchUsrsRequestAction
    | FetchUsrsSuccessAction
    | FetchUsrsFailureAction;

export type ProfileActionTypes =
    | UpdateProfileRequestAction
    | UpdateProfileSuccessAction
    | UpdateProfileFailureAction;