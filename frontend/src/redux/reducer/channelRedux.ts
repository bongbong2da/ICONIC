const SAVE_CHANNEL_IDX = "channel/SAVE_CHANNEL_IDX";

export const saveChannelIdx = (idx : number) => ({type: SAVE_CHANNEL_IDX, idx: idx})

const initialChannelIdx = {
    idx : 0
};

export function ChannelIdxReducer(state = initialChannelIdx, action : any) {
    switch (action.type) {
        case SAVE_CHANNEL_IDX:
            console.log(`Set Channel Idx to ${action.idx}`);
            return {
                ...state,
                idx : action.idx
            }
        default:
            return state;
    }
}