import React, {useEffect, useState} from 'react';
import {Container, Grid, Header, Menu, Segment, Sidebar} from "semantic-ui-react";
import "../style.less";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import Side from "./Side";
import ChannelIndex from "../channel/ChannelIndex";

const Main = () => {

    //States
    const [visible, setVisible] = useState(false);

    //Redux
    const isLoggedIn = useSelector((state: RootState) => state.loginsStatus.isLoggedIn);

    //Methods
    const logout = () => {
        const q = confirm("로그아웃 하시겠습니까?");
        if(q){
            sessionStorage.removeItem("uid");
            sessionStorage.removeItem("token");
            window.location.reload();
        }
    }

    //Use Effect
    useEffect(() => {

    });

    //Rendering
    if(isLoggedIn)
    return (
        <Container textAlign={"center"}>
            <Menu style={{margin: "20px"}} inverted size={"huge"}>
                <Menu.Item as={"a"} onClick={()=>setVisible(!visible)}>
                    📃
                </Menu.Item>
                <Menu.Item as={"a"}>
                    🏄🏻ICONIC
                </Menu.Item>
                <Menu.Item as={"a"}>
                    친구 🙋🏾
                </Menu.Item>
                <Menu.Item as={"a"}>
                    공개 채널 🌏
                </Menu.Item>
                <Menu.Item as={"a"}>
                    도움말 👨🏻‍🔧
                </Menu.Item>
                <Menu.Menu position={"right"}>
                    <Menu.Item as={"a"} onClick={logout}>
                        Logout 💣
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Sidebar.Pushable as={Container} style={{width: "100%"}}>
                <Side visible={visible} setVisible={setVisible}/>
                <Sidebar.Pusher dimmed={visible}>
                    <ChannelIndex/>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Container>
    )
    else return null as JSX.Element | null;
}

export default Main;