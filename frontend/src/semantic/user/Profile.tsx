import React, {useEffect, useState} from 'react';
import {Button, Card, Dimmer, Form, Grid, Header, Image, Message, Segment} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {ProfileTypes, UserInfoType} from "../../redux/reducer/userActions";
import axios from "axios";
import {setDimmable, setDimmingProfile} from "../../redux/reducer/dmmingReducer";

const Profile = () => {

    //States
    const [user, setUser] = useState({} as ProfileTypes);

    //Redux
    const selectedUser = useSelector((state: RootState) => state.selectedUser.username);
    const dimmable = useSelector((state: RootState) => state.dimming.dimmable);
    const profileDimming = useSelector((state: RootState) => state.dimming.postingCreatorDimming);
    const dispatcher = useDispatch();

    //Methods
    const handleDimmingToClose = () => {
        console.log("handling...")
        dispatcher(setDimmable(false));
        dispatcher(setDimmingProfile(false));
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/user/getProfile?username=${selectedUser}`)
            .then(res => {
                setUser(res.data);
            })
    }, [selectedUser]);

    if (user) {
        return (
            <Grid textAlign={"center"} style={{height: "100vh"}} onClick={handleDimmingToClose}>
                <Grid.Column as={Card} style={{maxWidth: 300, maxHeight: 500, marginTop: 50}} textAlign={"center"}>
                    <Card.Header>
                    </Card.Header>
                    <Image src={user.profileImg ? `http://localhost:8080/upload/images/${user.profileImg}` : null} size={"medium"} rounded
                           wrapped ui={false}/>
                    <Card.Content>
                        <Card.Description>
                            <p>Username : {user.username}</p>
                            <p>Last Login : {new Date(user.logindate).toString()}</p>
                        </Card.Description>
                    </Card.Content>
                </Grid.Column>
            </Grid>
        )
    } else return <></>;
}

export default Profile;