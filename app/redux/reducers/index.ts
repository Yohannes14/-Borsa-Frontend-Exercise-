import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    profile: profileReducer

});
export default rootReducer;