/* UID Redux Define */

const SAVE_UID = 'user/SAVE_UID';
const DELETE_UID = 'user/DELETE_UID';

export const saveUID = (username : string) => ({type : SAVE_UID, username : username});
export const deleteUID = () => ({type : DELETE_UID});

const initialUIDState = {
    username : 'initial data'
}

export function UIDReducer(state = initialUIDState, action : any) {
    switch (action?.type) {
        case SAVE_UID:
            return {
                ...state,
                username: action?.username
            }
        case DELETE_UID:
            return {
                ...state,
                username : ''
            }
        default:
            return state;
    }
}

/* JWT Token Redux Define */

//Action Naming
const SAVE_TOKEN = 'user/SAVE_TOKEN';
const DELETE_TOKEN = 'user/DELETE_TOKEN';

//Action Creator
export const saveToken = (token : string) => ({type : SAVE_TOKEN, token : token});
export const deleteToken = () => ({type : DELETE_TOKEN});

//Initial State Define
const initialTokenState = {
    token : 'initial token'
}

//Token Reducer Define
export function TokenReducer(state = initialTokenState, action : any) {
    switch (action.type) {
        case SAVE_TOKEN:
            return {
                ...state,
                token : action.token
            }
        case DELETE_TOKEN:
            return {
                ...state,
                token : ''
            }
        default:
            return state;
    }
}

/* isLoggedIn Boolean Redux Define */
const LOGIN_STATUS = "user/LOGIN_STATUS";

export const loginStatus = (status : boolean) => ({type : LOGIN_STATUS, payload : status});

const initialLoginStatus = {
    isLoggedIn : false
}

export const LoginStatusReducer = (state= initialLoginStatus, action : any) => {
    switch (action.type) {
        case LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: action.payload
            }
        default:
            return state;
    }
}

// User Info

const SAVE_USERINFO = 'user/SAVE_USERINFO';

export const saveUserinfo = (state : string) => {
    console.log(`saving : ${state}`);
    return ({type : SAVE_USERINFO, payload : state});
}

const initialUserInfo = {
    userInfo : ''
}

export const UserInfoReducer = (state = initialLoginStatus, action : any) => {
    switch (action.type) {
        case SAVE_USERINFO:
            return {
                ...state,
                userInfo : action.userInfo
            }
    }
}