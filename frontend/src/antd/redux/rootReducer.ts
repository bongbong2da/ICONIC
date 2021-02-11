import {combineReducers} from "redux";
import {LoginStatusReducer, TokenReducer, UIDReducer} from "../user/userActions";
import {ChannelIdxReducer} from "./reducer/channelRedux";

const rootReducer = combineReducers({
    UID : UIDReducer,
    JWT : TokenReducer,
    loginsStatus : LoginStatusReducer,
    channelIdx : ChannelIdxReducer
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;