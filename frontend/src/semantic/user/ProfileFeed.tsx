import React, {useEffect} from 'react';
import {Feed, Icon} from "semantic-ui-react";
import {PostingTypes} from "../posting/Posting";
import {useDispatch} from "react-redux";
import {setPostingCurrent} from "../../redux/reducer/postingReducer";
import {setDimmingPostingModal} from "../../redux/reducer/dmmingReducer";

type ProfileFeedProps = {
    posting : PostingTypes
}

const ProfileFeed = ({posting} : ProfileFeedProps) => {

    //Redux
    const dispatcher = useDispatch();

    //Methods
    const setCurrentPosting = () => {
        dispatcher(setPostingCurrent(posting));
        dispatcher(setDimmingPostingModal(true));
    }

    useEffect(() => {
        console.log("feed")
    }, []);

    return (
        <Feed.Event>
            <Feed.Label image={`http://localhost:8080/upload/images/${posting.postingAttach}`} />
            <Feed.Content>
                <Feed.Summary>
                    <a onClick={setCurrentPosting}>{(posting.postingTitle).substring(0,10)}</a>
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