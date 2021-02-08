import {combineReducers} from "redux";
import {UIDReducer, TokenReducer, LoginStatusReducer} from "../user/userActions";
import {ChannelIdxReducer} from "./reducer/channelRedux";

const rootReducer = combineReducers({
    UID : UIDReducer,
    JWT : TokenReducer,
    loginsStatus : LoginStatusReducer,
    channelIdx : ChannelIdxReducer
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;