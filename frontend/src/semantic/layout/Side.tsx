import React, {useEffect, useState} from 'react';
import {Menu, Sidebar} from "semantic-ui-react";
import ChannelSide, {ChannelTypes} from "../channel/ChannelSide";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";

type SideProps = {
    visible : boolean
    setVisible : any
}

const Side = () => {

    //States
    const [channelList, setChannelList] = useState([] as ChannelTypes[]);
    const [loading, setLoading] = useState(false);

    //Redux
    // const uid = useSelector((state : RootState) => state.UID.username);
    // const token = useSelector((state : RootState) => state.JWT.token);
    const visibleSidebar = useSelector((state : RootState) => state.sidebar.visible);
    const dispatcher = useDispatch();

    //Variables
    const uid = sessionStorage.getItem("uid");
    const token = sessionStorage.getItem("token");

    //Use Effect
    useEffect(() => {
       axios.get(`http://localhost:8080/channel/get?username=${uid}`, {
           headers : {
               "Authorization" : token
           }
       }).then(res => {
           const data = res.data;
           setChannelList(data);
       })
    },[uid, token]);

    return (
        <Sidebar as={Menu}
                 style={{padding: 20, marginRight: "10px"}}
                 visible={visibleSidebar}
                 animation={"push"}
                 inverted
                 vertical
        >
            <ChannelSide channel_list={channelList}/>
        </Sidebar>
    )
}

export default Side;