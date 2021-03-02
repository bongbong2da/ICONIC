
const SET_DIMMING = "dimmer/SET_DIMMING";
const SET_VISIBLE_PROFILE = "dimmer/SET_VISIBLE_PROFILE";
const SET_VISIBLE_POSTING_CREATOR = "dimmer/SET_VISIBLE_POSTING_CREATOR";
const SET_VISIBLE_CHANNEL_APPLY = "dimmer/SET_VISIBLE_CHANNEL_APPLY";
const SET_VISIBLE_POSTING_MODAL = "dimmer/SET_VISIBLE_POSTING_MODAL";
const SET_VISIBLE_CHANNEL_CREATOR = "dimmer/SET_VISIBLE_CHANNEL_CREATOR";

export const setDimming = (dimming : boolean) => ({type : SET_DIMMING, dimmable : dimming});
export const setVisibleProfile = (dimming : boolean) => ({type : SET_VISIBLE_PROFILE, profileDimming : dimming});
export const setVisiblePostingCreator = (dimming : boolean) => ({type : SET_VISIBLE_POSTING_CREATOR, postingCreatorDimming : dimming})
export const setVisibleChannelApply = (dimming : boolean) => ({type : SET_VISIBLE_CHANNEL_APPLY, channelApplyDimming : dimming});
export const setVisiblePostingModal = (dimming : boolean) => ({type : SET_VISIBLE_POSTING_MODAL, postingModalDimming : dimming});
export const setVisibleChannelCreator = (dimming : boolean) => ({type : SET_VISIBLE_CHANNEL_CREATOR, channelCreatorDimming : dimming});

const initialVisibleStates = {
    dimming : false,
    profileVisible : false,
    postingCreatorVisible : false,
    channelApplyVisible : false,
    postingModalVisible : false,
    channelCreatorVisible : false
};

export const VisibleReducer = (state = initialVisibleStates, action : any) => {
    switch (action.type) {
        case SET_DIMMING:
            return {
                ...state,
                dimming: action.dimmable
            }
        case SET_VISIBLE_PROFILE:
            return {
                ...state,
                profileVisible : action.profileDimming
            }
        case SET_VISIBLE_POSTING_CREATOR:
            return {
                ...state,
                postingCreatorVisible: action.postingCreatorDimming
            }
        case SET_VISIBLE_CHANNEL_APPLY:
            return {
                ...state,
                channelApplyVisible : action.channelApplyDimming
            }
        case SET_VISIBLE_POSTING_MODAL:
            return {
                ...state,
                postingModalVisible: action.postingModalDimming
            }
        case SET_VISIBLE_CHANNEL_CREATOR:
            return {
                ...state,
                channelCreatorVisible: action.channelCreatorDimming
            }
        default:
            return state;
    }
};