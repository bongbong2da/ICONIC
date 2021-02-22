import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Button, Card, DropdownProps, Form, Grid, Segment} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import axios from "axios";
import {setDimmingChannelCreator} from "../../redux/reducer/dmmingReducer";

const ChannelCreator = () => {

    //States
    const [chanType, setChanType] = useState('');

    //Variables
    const axiosConfig = {
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
    }

    const chanTypeOptions = [
        {key : "public", value : "public", text : "모든 사용자에게 공개합니다."},
        {key : "users", value : "users", text : "초대를 받아야만 가입할 수 있습니다."}
    ]

    //Redux
    const dispatcher = useDispatch();
    const userInfo = useSelector((state : RootState) => state.userInfo.userInfo);

    //Methods
    const handleSubmit = () => {
        const source = document.getElementById("channel-create-form") as HTMLFormElement;
        const formData = new FormData(source);
        formData.append("chanType", chanType);
        axios.post("http://localhost:8080/channel/create", formData, axiosConfig)
            .then(res => {
                console.log(res.data);
            })
    }

    const handleClose = () => {
        (document.getElementById("channel-create-form") as HTMLFormElement).reset();
        dispatcher(setDimmingChannelCreator(false));
    }

    const handleChanTypeChange = (e : SyntheticEvent<HTMLElement>, values : DropdownProps) => {setChanType(values.value as string);
        console.log(chanType)};

    //UseEffect
    useEffect(() => {
    }, []);

    return (
        <Form id={"channel-create-form"} style={{width : "50vw"}} onSubmit={handleSubmit}>
            <Grid as={Segment} textAlign={"center"} style={{color: "black"}} >
                <Grid.Column as={Card}>
                    <Card.Header style={{marginBottom: "10px"}}>
                        <a onClick={handleClose}>닫기</a>
                    </Card.Header>
                    <Card.Content>
                        <Card.Description>
                            <p>채널 공개 여부</p>
                            <Form.Select value={chanType} onChange={(e, values) => handleChanTypeChange(e, values)} options={chanTypeOptions} name={"chanType"} fluid/>
                            <p>채널 이름</p>
                            <Form.Input name={"chanName"} fluid/>
                            <p>채널 이모티콘</p>
                            <Form.Input name={"chanEmoji"} fluid/>
                            <p>채널 소개말</p>
                            <Form.TextArea name={"chanAnnounce"}/>
                            <Form.Input type={"hidden"} name={"chanPopMax"} value={50} fluid/>
                            <Form.Input type={"hidden"} name={"chanManager"} value={userInfo.username} fluid/>
                            <Form.Input type={"hidden"} name={"chanIsPublic"} value={'y'} fluid/>
                            <Button content={"만들기"} color={"instagram"} type={"submit"} fluid/>
                        </Card.Description>
                    </Card.Content>

                </Grid.Column>
            </Grid>
        </Form>
    )
}

export default ChannelCreator;