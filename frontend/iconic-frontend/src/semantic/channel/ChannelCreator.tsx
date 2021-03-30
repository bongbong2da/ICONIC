import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Button, Divider, DropdownProps, Form, Header, Modal} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import axios from "axios";
import {setVisibleChannelCreator} from "../../redux/reducer/visibleReducer";
import {invertSidebarVisible} from "../../redux/reducer/sidebarReducer";
import {refreshChannelList} from "../../redux/reducer/refreshReducer";

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
        {key: "public", value: "public", text: "모든 사용자에게 공개합니다."},
        {key: "users", value: "users", text: "초대를 받아야만 가입할 수 있습니다."}
    ]

    //Redux
    const dispatcher = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
    const visible = useSelector((state: RootState) => state.dimming.channelCreatorVisible);

    //Methods
    const handleSubmit = () => {
        const source = document.getElementById("channel-create-form") as HTMLFormElement;
        const formData = new FormData(source);
        formData.append("chanType", chanType);
        axios.post("/channel/create", formData, axiosConfig)
            .then(res => {
                console.log(res.data);
                source.reset();
                dispatcher(refreshChannelList());
                dispatcher(setVisibleChannelCreator(false));
                dispatcher(invertSidebarVisible());
            })
    }

    const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        (document.getElementById("channel-create-form") as HTMLFormElement).reset();
        dispatcher(setVisibleChannelCreator(false));
    }

    const handleChanTypeChange = (e: SyntheticEvent<HTMLElement>, values: DropdownProps) => {
        setChanType(values.value as string);
        console.log(chanType)
    };

    //UseEffect
    useEffect(() => {
    }, [visible]);

    return (
        <Modal as={Form} id={"channel-create-form"} open={visible} onSubmit={handleSubmit}>
            <Modal.Header>
                <Header>채널 만들기</Header>
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <p>채널 공개 여부</p>
                    <Form.Select value={chanType}
                                 onChange={(e, values) => handleChanTypeChange(e, values)}
                                 options={chanTypeOptions} name={"chanType"} fluid/>
                    <p>채널 이름</p>
                    <Form.Input name={"chanName"} fluid/>
                    <p>채널 이모티콘</p>
                    <Form.Input name={"chanEmoji"} max={1} fluid/>
                    <p>채널 소개말</p>
                    <Form.TextArea name={"chanAnnounce"}/>
                    <Form.Input type={"hidden"} name={"chanPopMax"} value={50} fluid/>
                    <Form.Input type={"hidden"} name={"chanManager"} value={userInfo.username}
                                fluid/>
                    <Form.Input type={"hidden"} name={"chanIsPublic"} value={'y'} fluid/>
                    <Button content={"만들기"} color={"instagram"} type={"submit"} fluid/>
                    <Divider/>
                    <Button onClick={(e) => handleClose(e)} fluid>닫기</Button>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default ChannelCreator;