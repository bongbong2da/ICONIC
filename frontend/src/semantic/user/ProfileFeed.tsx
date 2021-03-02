import React, {useEffect} from 'react';
import {Feed, Icon} from "semantic-ui-react";
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
        console.log("feed")
    }, [posting]);

    return (
        <Feed.Event>
            <Feed.Label image={posting.postingAttach ? `/upload/images/${posting.postingAttach}` : null} />
            <Feed.Content>
                <Feed.Summary>
                    <a onClick={setCurrentPosting}>{posting.postingTitle ? (posting.postingTitle).substring(0,10) : null}</a>
                    <Feed.Date>{new Date(posting.postingReg).toDateString()}</Feed.Date>
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