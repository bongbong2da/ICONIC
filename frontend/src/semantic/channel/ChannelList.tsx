import React, {useEffect, useState} from 'react';
import axios from "axios";
import Posting, {PostingTypes} from "../posting/Posting";
import {Card, Container, Grid, Header, Segment} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";

type ChannelListProps = {
    channel_idx : number
}

const ChannelList = (props : ChannelListProps) => {

    //States
    const [postingList, setPostingList] = useState([] as PostingTypes[] | null);

    //Variables
    const token = sessionStorage.getItem("token");

    //Redux
    const postingCreatorDimming = useSelector((state : RootState) => state.dimming.postingCreatorDimming);

    //Render
    const ifNull = (
        <Segment style={{marginTop : "30vh"}} basic>
            <Header>아무것도...없네요? 😱</Header>
            <p>첫 게시자가 되어보세요</p>
        </Segment>
    )

    //Use Effect
    useEffect(() => {
       axios.get(`http://localhost:8080/posting/get?idx=${props.channel_idx}`, {
           headers : {
               "Authorization" : `Bearer ${token}`
           }
       }).then(res => {
           setPostingList(res.data);
       })
    },[props.channel_idx, postingCreatorDimming]);

    return (
        <Grid
            as={Card.Group}
            style={{
                width : "100vw",
                height : "100vh",
                overflow : "auto",
            }}
            textAlign={"center"}
            centered
        >
            {postingList ? postingList.map((posting : PostingTypes, index) => {
                return (
                    <Posting key={index} posting={posting}/>
                )
            }):ifNull}
        </Grid>
    )
}

export default ChannelList;