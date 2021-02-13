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
import {RefreshReducer} from "./reducer/refreshReducer";
import {LoadingReducer} from "./reducer/loadingReducer";

const rootReducer = combineReducers({
    UID : UIDReducer,
    JWT : TokenReducer,
    loginsStatus : LoginStatusReducer,
    channelIdx : ChannelIdxReducer,
    sidebar : SidebarReducer,
    userInfo : UserInfoReducer,
    dimming : DimmingReducer,
    selectedUser : SelectedUserReducer,
    refresh : RefreshReducer,
    loading : LoadingReducer
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;