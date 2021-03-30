
const SET_DIMMING = "visible/SET_DIMMING";
const SET_VISIBLE_PROFILE = "visible/SET_VISIBLE_PROFILE";
const SET_VISIBLE_POSTING_CREATOR = "visible/SET_VISIBLE_POSTING_CREATOR";
const SET_VISIBLE_CHANNEL_APPLY = "visible/SET_VISIBLE_CHANNEL_APPLY";
const SET_VISIBLE_POSTING_MODAL = "visible/SET_VISIBLE_POSTING_MODAL";
const SET_VISIBLE_CHANNEL_CREATOR = "visible/SET_VISIBLE_CHANNEL_CREATOR";

export const setDimming = (visible : boolean) => ({type : SET_DIMMING, dimmable : visible});
export const setVisibleProfile = (visible : boolean) => ({type : SET_VISIBLE_PROFILE, profileDimming : visible});
export const setVisiblePostingCreator = (visible : boolean) => ({type : SET_VISIBLE_POSTING_CREATOR, postingCreatorDimming : visible})
export const setVisibleChannelApply = (visible : boolean) => ({type : SET_VISIBLE_CHANNEL_APPLY, channelApplyDimming : visible});
export const setVisiblePostingModal = (visible : boolean) => ({type : SET_VISIBLE_POSTING_MODAL, postingModalDimming : visible});
export const setVisibleChannelCreator = (visible : boolean) => ({type : SET_VISIBLE_CHANNEL_CREATOR, channelCreatorDimming : visible});

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