import React, {useEffect, useState} from 'react';
import {Button, Card, Dimmer, Form, Grid, Header, Image, Message, Segment} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {ProfileTypes, UserInfoType} from "../../redux/reducer/userActions";
import axios from "axios";
import {setDimmable, setProfileDimming} from "../../redux/reducer/dmmingReducer";

const Profile = () => {

    //States
    const [user, setUser] = useState({} as ProfileTypes);

    //Redux
    const selectedUser = useSelector((state : RootState) => state.selectedUser.username);
    const dimmable = useSelector((state : RootState) => state.dimming.dimmable);
    const profileDimming = useSelector((state : RootState) => state.dimming.postingCreatorDimming);
    const dispatcher = useDispatch();

    //Methods
    const handleDimmingToClose = () => {
        console.log("handling...")
        dispatcher(setDimmable(false));
        dispatcher(setProfileDimming(false));
    }

    useEffect(() => {
        console.log(`dimmable : ${dimmable}, profileDimming : ${profileDimming}, postingCreatorDimming : `);
       axios.get(`http://localhost:8080/user/getProfile?username=${selectedUser}`)
           .then(res => {
               console.log(res.data);
               setUser(res.data);
           })
    },[selectedUser, dimmable, profileDimming]);

    if(user){
        return (
            <Grid textAlign={"center"} style={{height: "100vh"}} onClick={handleDimmingToClose}>
                <Grid.Column as={Card} style={{maxWidth: 300, maxHeight : 500, marginTop: 50}} textAlign={"center"}>
                    <Card.Header>
                    </Card.Header>
                    <Image src={`http://localhost:8080/upload/images/${user.profileImg}`} size={"medium"} rounded wrapped ui={false}/>
                    <Card.Content>
                        <Card.Description>
                            Username : {user.username}
                        </Card.Description>
                    </Card.Content>
                </Grid.Column>
            </Grid>
        )
    }else return <></>;
}

export default Profile;