const REFRESH_CHANNEL = "refresh/REFRESH_CHANNEL";
const REFRESH_CHANNEL_LIST = "refresh/REFRESH_CHANNEL_LIST";
const REFRESH_POSTING_MODAL = "refresh/REFRESH_POSTING_MODAL"

export const refreshChannel = () => ({type : REFRESH_CHANNEL});
export const refreshChannelList = () => ({type : REFRESH_CHANNEL_LIST});
export const refreshPostingModal = () => ({type : REFRESH_POSTING_MODAL})

const initialRefresh = {
    refreshChannel : false,
    refreshChannelList : false,
    refreshPostingModal : false
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
        case REFRESH_POSTING_MODAL:
            return {
                ...state,
                refreshPostingModal: !state.refreshPostingModal
            }
        default:
            return state;
    }
}