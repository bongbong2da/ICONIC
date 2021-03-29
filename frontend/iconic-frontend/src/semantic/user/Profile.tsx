import React, {useEffect, useState} from 'react';
import {Button, Feed, Image, Modal} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {ProfileTypes} from "../../redux/reducer/userActions";
import axios from "axios";
import {setDimming, setVisibleProfile} from "../../redux/reducer/visibleReducer";
import {PostingTypes} from "../posting/Posting";
import ProfileFeed from "./ProfileFeed";

const Profile = () => {

    //States
    const [user, setUser] = useState({} as ProfileTypes);
    const [postingFeeds, setPostingFeeds] = useState([] as PostingTypes[]);

    //Redux
    const selectedUser = useSelector((state: RootState) => state.selectedUser.username);
    const visible = useSelector((state: RootState) => state.dimming.profileVisible);
    const currentChannel = useSelector((state : RootState) => state.channelIdx.idx);
    const dispatcher = useDispatch();

    //Methods
    const handleDimmingToClose = () => {
        dispatcher(setDimming(false));
        dispatcher(setVisibleProfile(false));
    }

    const getProfileUser = async () => {
        await axios.get(`/user/getProfile?username=${selectedUser}`)
            .then(res => {
                setUser(res.data);
            });
    }

    const getPostingFeeds = async () => {
        if(currentChannel === 0) {
            return;
        }
        await axios.get(`/posting/getById/${currentChannel}/${selectedUser}`,
            {
                headers : {
                    "Authorization" : "Bearer " + sessionStorage.getItem("token")
                }
            })
            .then(res => {
                // console.log(res.data);
                setPostingFeeds(res.data.content);
            })
    }

    useEffect(() => {
        if(selectedUser) {
            getProfileUser();
            getPostingFeeds();
        }
    }, [selectedUser, currentChannel, visible]);

    if (user) {
        return (
            <Modal open={visible}>
                <Modal.Content image>
                    <Image wrapped src={user.profileImg ? `http://iconic-backend.herokuapp.com/upload/${user.profileImg}` : null}/>
                    <Modal.Description>
                            <p>Username : {user.username}</p>
                            <p>Last Login : {new Date(user.logindate).toString()}</p>
                        <Feed>
                            {postingFeeds && currentChannel !== 0 ?
                                postingFeeds.map((feed, index) => {
                                    return (
                                        <ProfileFeed key={index} posting={feed}/>
                                    )
                                }) : <></>}
                        </Feed>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={handleDimmingToClose} fluid>닫기</Button>
                </Modal.Actions>
            </Modal>
        )
    } else return <></>;
}

export default Profile;