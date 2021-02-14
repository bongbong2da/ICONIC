
const SET_DIMMABLE = "dimmer/SET_DIMMABLE";
const SET_DIMMING_PROFILE = "dimmer/SET_DIMMING_PROFILE";
const SET_DIMMING_POSTING_CREATOR = "dimmer/SET_DIMMING_POSTING_CREATOR";
const SET_DIMMING_CHANNEL_APPLY = "dimmer/SET_DIMMING_CHANNEL_APPLY";
const SET_DIMMING_POSTING_MODAL = "dimmer/SET_DIMMING_POSTING_MODAL";
const SET_DIMMING_CHANNEL_CREATOR = "dimmer/SET_DIMMING_CHANNEL_CREATOR";

export const setDimmingProfile = (dimming : boolean) => ({type : SET_DIMMING_PROFILE, profileDimming : dimming});
export const setDimmingPostingCreator = (dimming : boolean) => ({type : SET_DIMMING_POSTING_CREATOR, postingCreatorDimming : dimming})
export const setDimmable = (dimming : boolean) => ({type : SET_DIMMABLE, dimmable : dimming});
export const setDimmingChannelApply = (dimming : boolean) => ({type : SET_DIMMING_CHANNEL_APPLY, channelApplyDimming : dimming});
export const setDimmingPostingModal = (dimming : boolean) => ({type : SET_DIMMING_POSTING_MODAL, postingModalDimming : dimming});
export const setDimmingChannelCreator = (dimming : boolean) => ({type : SET_DIMMING_CHANNEL_CREATOR, channelCreatorDimming : dimming});

const initialDimmingVisible = {
    dimmable : false,
    profileDimming : false,
    postingCreatorDimming : false,
    channelApplyDimming : false,
    postingModalDimming : false,
    channelCreatorDimming : false
};

export const DimmingReducer = (state = initialDimmingVisible, action : any) => {
    switch (action.type) {
        case SET_DIMMABLE:
            return {
                ...state,
                dimmable: action.dimmable
            }
        case SET_DIMMING_PROFILE:
            return {
                ...state,
                profileDimming : action.profileDimming
            }
        case SET_DIMMING_POSTING_CREATOR:
            return {
                ...state,
                postingCreatorDimming: action.postingCreatorDimming
            }
        case SET_DIMMING_CHANNEL_APPLY:
            return {
                ...state,
                channelApplyDimming : action.channelApplyDimming
            }
        case SET_DIMMING_POSTING_MODAL:
            return {
                ...state,
                postingModalDimming: action.postingModalDimming
            }
        case SET_DIMMING_CHANNEL_CREATOR:
            return {
                ...state,
                channelCreatorDimming: action.channelCreatorDimming
            }
        default:
            return state;
    }
};