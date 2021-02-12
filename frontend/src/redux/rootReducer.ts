import {combineReducers} from "redux";
import {
    LoginStatusReducer,
    SelectedUserReducer,
    TokenReducer,
    UIDReducer,
    UserInfoReducer
} from "./reducer/userActions";
import {ChannelIdxReducer} from "./reducer/channelRedux";
import {SidebarReducer} from "./reducer/sidebarReducer";
import {DimmingReducer} from "./reducer/dmmingReducer";

const rootReducer = combineReducers({
    UID : UIDReducer,
    JWT : TokenReducer,
    loginsStatus : LoginStatusReducer,
    channelIdx : ChannelIdxReducer,
    sidebar : SidebarReducer,
    userInfo : UserInfoReducer,
    dimming : DimmingReducer,
    selectedUser : SelectedUserReducer
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;