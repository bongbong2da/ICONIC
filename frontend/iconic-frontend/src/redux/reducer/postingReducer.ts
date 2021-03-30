import {PostingTypes} from "../../semantic/posting/Posting";
import {ProfileTypes} from "./userActions";

const SET_POSTING_CURRENT = "posting/SET_POSTING_CURRENT";
const SET_POSTING_WRITER = "posting/SET_POSTING_WRITER";

export const setPostingCurrent = (posting : PostingTypes) => ({type : SET_POSTING_CURRENT, postingCurrent : posting});
export const setPostingWriter = (writer : ProfileTypes) => ({type : SET_POSTING_WRITER, postingWriter : writer});

const initialPostingStates = {
    postingCurrent : {} as PostingTypes,
    postingWriter : {} as ProfileTypes
}

export const PostingReducer = (state = initialPostingStates, action : any) => {
    switch (action.type) {
        case SET_POSTING_CURRENT:
            return {
                ...state,
                postingCurrent: action.postingCurrent
            }
        case SET_POSTING_WRITER:
            return {
                ...state,
                postingWriter: action.postingWriter
            }
        default:
            return state;
    }
}