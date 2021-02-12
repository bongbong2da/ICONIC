
const SET_DIMMABLE = "dimmer/SET_DIMMABLE"
const SET_PROFILE_DIMMING = "dimmer/SET_PROFILE_DIMMING";
const SET_POSTING_CREATOR_DIMMING = "dimmer/SET_POSTING_CREATOR_DIMMING"

export const setProfileDimming = (dimming : boolean) => ({type : SET_PROFILE_DIMMING, profileDimming : dimming});
export const setPostingCreatorDimming = (dimming : boolean) => ({type : SET_POSTING_CREATOR_DIMMING, postingCreatorDimming : dimming})
export const setDimmable = (dimming : boolean) => ({type : SET_DIMMABLE, dimmable : dimming});

const initialDimmingVisible = {
    dimmable : false,
    profileDimming : false,
    postingCreatorDimming : false
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
        default:
            return state;
    }
};