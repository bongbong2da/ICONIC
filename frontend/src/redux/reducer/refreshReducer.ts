const REFRESH_CHANNEL = "refresh/REFRESH_CHANNEL";
const REFRESH_CHANNEL_LIST = "refresh/REFRESH_CHANNEL_LIST";

export const refreshChannel = () => ({type : REFRESH_CHANNEL});
export const refreshChannelList = () => ({type : REFRESH_CHANNEL_LIST});

const initialRefresh = {
    refreshChannel : false,
    refreshChannelList : false
}

export const RefreshReducer = (state = initialRefresh, action : any) => {
    switch (action.type) {
        case REFRESH_CHANNEL:
            return {
                ...state,
                refreshChannel : !state.refreshChannel
            }
        case REFRESH_CHANNEL_LIST:
            return {
                ...state,
                refreshChannelList : !state.refreshChannelList
            }
        default:
            return state;
    }
}