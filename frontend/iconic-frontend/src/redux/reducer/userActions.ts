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

export const saveUserinfo = (state : UserInfoType) => ({type : SAVE_USERINFO, userInfo : state});


export type UserInfoType = {
    id : number,
    username : string,
    type : string,
    token : string,
    email : string,
    roles : string[],
    profileImg : string
}

const initialUserInfo = {
    userInfo : {
        id : 0,
        username : '',
        type : '',
        token : '',
        email : '',
        roles : [] as string[],
        profileImg : ''
    }
}

export const UserInfoReducer = (state = initialUserInfo, action : any) => {
    switch (action.type) {
        case SAVE_USERINFO:
            return {
                ...state,
                userInfo : action.userInfo
            }
        default :
            return state;
    }
}

const SET_SELECTED_USER = 'user/SET_SELECTED_USER';

export const setSelectedUser = (username : string) => ({type : SET_SELECTED_USER, username : username});

export type ProfileTypes = {
    id : number,
    username : string,
    profileImg : string,
    regdate : string,
    logindate : string,
    roles : string[]
}

const initialSelectedUser = {
    username : ''
}

export const SelectedUserReducer = (state = initialSelectedUser, action : any) => {
    switch (action.type) {
        case SET_SELECTED_USER:
            return {
                ...state,
                username : action.username
            }
        default:
            return state;
    }

}