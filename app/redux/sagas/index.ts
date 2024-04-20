import { all } from "redux-saga/effects";
import { loginSaga, signupSaga } from "./authSaga";
import { fetchUsersSaga, updateProfileSaga } from "./userSaga";


export default function* rootSaga() {
    yield all([
        loginSaga(),
        signupSaga(),
        fetchUsersSaga(),
        updateProfileSaga(),

    ]);
}
