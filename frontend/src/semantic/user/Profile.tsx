import React, {useEffect, useState} from 'react';
import {Button, Card, Feed, Grid, Image} from "semantic-ui-react";
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
    const dimmable = useSelector((state: RootState) => state.dimming.dimming);
    const profileDimming = useSelector((state: RootState) => state.dimming.postingCreatorVisible);
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
            console.log("GET_PROFILE_DATA");
            getProfileUser();
            getPostingFeeds();
            console.log("GET_PROFILE_DATA_DONE");
        }
    }, [selectedUser, currentChannel]);

    if (user) {
        return (
            <Grid textAlign={"center"} style={{height: "100vh"}}>
                <Grid.Column as={Card} style={{width: "400px", height: "100%", overflow : "auto"}} textAlign={"center"}>
                    <Card.Header>
                    </Card.Header>
                    <Image src={user.profileImg ? `/upload/images/${user.profileImg}` : null}
                           size={"medium"} rounded
                           wrapped ui={false}/>
                    <Card.Content>
                        <Card.Description>
                            <p>Username : {user.username}</p>
                            <p>Last Login : {new Date(user.logindate).toString()}</p>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra={true}>
                        <Feed>
                            {postingFeeds && currentChannel !== 0 ?
                                postingFeeds.map((feed, index) => {
                                    return (
                                        <ProfileFeed key={index} posting={feed}/>
                                    )
                                }) : <></>}
                        </Feed>
                    </Card.Content>
                    <Card.Content extra>
                        <Card.Description>
                            <Button onClick={handleDimmingToClose} fluid>닫기</Button>
                        </Card.Description>
                    </Card.Content>
                </Grid.Column>
            </Grid>
        )
    } else return <></>;
}

export default Profile;