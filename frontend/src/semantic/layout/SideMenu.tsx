import React, {useEffect, useState} from 'react';
import {Container, Divider, Icon, Menu, Sidebar} from "semantic-ui-react";
import ChannelSideMenu, {ChannelTypes} from "../channel/ChannelSideMenu";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {invertSidebarVisible} from "../../redux/reducer/sidebarReducer";
import {setLoadingRedirect} from "../../redux/reducer/loadingReducer";

const SideMenu = () => {

    //States
    const [channelList, setChannelList] = useState([] as ChannelTypes[]);
    const [loading, setLoading] = useState(false);

    //Redux
    // const uid = useSelector((state : RootState) => state.UID.username);
    // const token = useSelector((state : RootState) => state.JWT.token);
    const visibleSidebar = useSelector((state : RootState) => state.sidebar.visible);
    const refreshChannelList = useSelector((state : RootState) => state.refresh.refreshChannelList);
    const dispatcher = useDispatch();

    //Variables
    const uid = sessionStorage.getItem("uid");
    const token = sessionStorage.getItem("token");

    //Mehotds
    const handleSidebarClose = () => {
        dispatcher(invertSidebarVisible());
    }

    const getChannelList = async  () => {
        dispatcher(setLoadingRedirect(true));
        await axios.get(`/channel/get?username=${uid}`, {
        }).then(res => {
            const data = res.data;
            setChannelList(data);
        })
        dispatcher(setLoadingRedirect(false));
    }

    //Use Effect
    useEffect(() => {
        getChannelList();
    },[uid, token, refreshChannelList]);

    return (
        <Sidebar as={Menu}
                 style={{padding: 20, marginRight: "10px"}}
                 visible={visibleSidebar}
                 animation={"push"}
                 inverted
                 vertical
        >
            <Container fluid textAlign={"center"}>
                <Icon name={'window close'} rotated={"clockwise"} inverted onClick={handleSidebarClose}/>
            </Container>
            <Divider/>
            <ChannelSideMenu channel_list={channelList}/>
        </Sidebar>
    )
}

export default SideMenu;