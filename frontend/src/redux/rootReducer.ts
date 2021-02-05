import {combineReducers} from "redux";
import {UIDReducer, TokenReducer, LoginStatusReducer} from "../user/userActions";

const rootReducer = combineReducers({
    UID : UIDReducer,
    JWT : TokenReducer,
    loginsStatus : LoginStatusReducer
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;