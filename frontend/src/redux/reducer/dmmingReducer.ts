
const SET_DIMMABLE = "dimmer/SET_DIMMABLE"
const SET_PROFILE_DIMMING = "dimmer/SET_PROFILE_DIMMING";
const SET_POSTING_CREATOR_DIMMING = "dimmer/SET_POSTING_CREATOR_DIMMING"
const SET_CHANNEL_APPLY_DIMMING = "dimmer/SET_CHANNEL_APPLY_DIMMING"

export const setProfileDimming = (dimming : boolean) => ({type : SET_PROFILE_DIMMING, profileDimming : dimming});
export const setPostingCreatorDimming = (dimming : boolean) => ({type : SET_POSTING_CREATOR_DIMMING, postingCreatorDimming : dimming})
export const setDimmable = (dimming : boolean) => ({type : SET_DIMMABLE, dimmable : dimming});
export const setChannelApplyDimming = (dimming : boolean) => ({type : SET_CHANNEL_APPLY_DIMMING, channelApplyDimming : dimming});

const initialDimmingVisible = {
    dimmable : false,
    profileDimming : false,
    postingCreatorDimming : false,
    channelApplyDimming : false
};

export const DimmingReducer = (state = initialDimmingVisible, action : any) => {
    switch (action.type) {
        case SET_DIMMABLE:
            return {
                ...state,
                dimmable: action.dimmable
            }
        case SET_PROFILE_DIMMING:
            return {
                ...state,
                profileDimming : action.profileDimming
            }
        case SET_POSTING_CREATOR_DIMMING:
            return {
                ...state,
                postingCreatorDimming: action.postingCreatorDimming
            }
        case SET_CHANNEL_APPLY_DIMMING:
            return {
                ...state,
                channelApplyDimming : action.channelApplyDimming
            }
        default:
            return state;
    }
};