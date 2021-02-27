import React, {useEffect, useState} from 'react';
import {Card, Feed, Grid, Image} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {ProfileTypes} from "../../redux/reducer/userActions";
import axios from "axios";
import {setDimmable, setDimmingProfile} from "../../redux/reducer/dmmingReducer";
import {PostingTypes} from "../posting/Posting";
import ProfileFeed from "./ProfileFeed";

const Profile = () => {

    //States
    const [user, setUser] = useState({} as ProfileTypes);
    const [postingFeeds, setPostingFeeds] = useState([] as PostingTypes[]);

    //Redux
    const selectedUser = useSelector((state: RootState) => state.selectedUser.username);
    const dimmable = useSelector((state: RootState) => state.dimming.dimmable);
    const profileDimming = useSelector((state: RootState) => state.dimming.postingCreatorDimming);
    const currentChannel = useSelector((state : RootState) => state.channelIdx.idx);
    const dispatcher = useDispatch();

    //Methods
    const handleDimmingToClose = () => {
        console.log("handling...")
        dispatcher(setDimmable(false));
        dispatcher(setDimmingProfile(false));
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
        getProfileUser();
        getPostingFeeds();
    }, [selectedUser, currentChannel]);

    if (user) {
        return (
            <Grid textAlign={"center"} style={{height: "100vh"}} onClick={handleDimmingToClose}>
                <Grid.Column as={Card} style={{maxWidth: 500, maxHeight: "100vh", overflow : "auto"}} textAlign={"center"}>
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
                </Grid.Column>
            </Grid>
        )
    } else return <></>;
}

export default Profile;