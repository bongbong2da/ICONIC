import React, {useEffect} from 'react';
import {Button, Card, Divider, Form, Grid, Input} from "semantic-ui-react";
import {setDimmingChannelApply} from "../../redux/reducer/dmmingReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import axios from "axios";
import {refreshChannelList} from "../../redux/reducer/refreshReducer";
import {invertSidebarVisible} from "../../redux/reducer/sidebarReducer";

const ChannelJoin = () => {

    //redux
    const dispatcher = useDispatch();
    const channelApplyDimming = useSelector((state : RootState) => state.dimming.channelApplyDimming);
    const token = useSelector((state : RootState) => state.JWT.token);
    const userInfo = useSelector((state : RootState) => state.userInfo.userInfo);

    //methods
    const handleChannelApply = () => {
        dispatcher(setDimmingChannelApply(!channelApplyDimming));
    }

    const handleJoin = () => {
        const source = document.getElementById("channel-apply-form") as HTMLFormElement;
        let formData = new FormData(source);
        formData.append("username", userInfo.username);
        axios.post("http://localhost:8080/channel/join", formData ,{
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        })
            .then(res=> {
                const msg = res.data;
                if(msg === 'JOINED') {
                    alert("가입되었습니다.");
                    dispatcher(refreshChannelList());
                    dispatcher(setDimmingChannelApply(false));
                    dispatcher(invertSidebarVisible());
                }
                else if (msg === "CHANNEL_DUPLICATED") {
                    alert("이미 가입되어있는 채널입니다.");
                    dispatcher(setDimmingChannelApply(false));
                    dispatcher(invertSidebarVisible());
                } else {
                    alert("실패했습니다.");
                    dispatcher(setDimmingChannelApply(false));
                }
            });
    }

    useEffect(() => {

    });

    return (
        <Grid
            as={Form}
            id={"channel-apply-form"}
            textAlign={"center"}
            style={{height: "100vh", width : "50vw"}}
            onSubmit={handleJoin}
        >
            <Grid.Column as={Card} style={{maxWidth: 300, maxHeight : 300, marginTop: 50}} textAlign={"center"}>
                <Card.Header style={{marginBottom : "10px"}}>
                    <a onClick={handleChannelApply}>닫기</a>
                </Card.Header>
                <Card.Content>
                    <Card.Description>
                        <p style={{fontSize : "40px"}}>👋🏻</p>
                        <span>참가 코드를 입력하세요 ! </span>
                        <Divider/>
                        <Input name={"code"} fluid={true}/>
                        <Button color={"google plus"} type={"submit"} style={{margin : "10px"}}>참가하기</Button>
                    </Card.Description>
                </Card.Content>
            </Grid.Column>
        </Grid>
    )
}

export default ChannelJoin;