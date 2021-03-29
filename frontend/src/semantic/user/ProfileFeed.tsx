import React, {useEffect} from 'react';
import {Feed} from "semantic-ui-react";
import {PostingTypes} from "../posting/Posting";
import {useDispatch} from "react-redux";
import {setPostingCurrent} from "../../redux/reducer/postingReducer";
import {setVisiblePostingModal, setVisibleProfile} from "../../redux/reducer/visibleReducer";

type ProfileFeedProps = {
    posting : PostingTypes
}

const ProfileFeed = ({posting} : ProfileFeedProps) => {

    //Redux
    const dispatcher = useDispatch();

    //Methods
    const setCurrentPosting = () => {
        dispatcher(setPostingCurrent(posting));
        dispatcher(setVisiblePostingModal(true));
        dispatcher(setVisibleProfile(false));
    }

    useEffect(() => {
    }, [posting]);

    return (
        <Feed.Event>
            <Feed.Label image={posting.postingAttach ? `http://localhost:8080/upload/${posting.postingAttach}` : null} />
            <Feed.Content>
                <Feed.Summary>
                    <a onClick={setCurrentPosting}>{posting.postingTitle ? (posting.postingTitle).substring(0,10) : null}</a>
                    <Feed.Date onClick={setCurrentPosting}>{new Date(posting.postingReg).toDateString()}</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                    <Feed.Like>
                    </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    )
}

export default ProfileFeed;