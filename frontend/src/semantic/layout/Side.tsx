import React, {useEffect, useState} from 'react';
import {Menu, Sidebar} from "semantic-ui-react";
import ChannelSide, {ChannelTypes} from "../channel/ChannelSide";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import axios from "axios";

type SideProps = {
    visible : boolean
    setVisible : any
}

const Side = ({visible, setVisible} : SideProps) => {

    //States
    const [channelList, setChannelList] = useState([] as ChannelTypes[]);

    //Redux
    // const uid = useSelector((state : RootState) => state.UID.username);
    // const token = useSelector((state : RootState) => state.JWT.token);

    const uid = sessionStorage.getItem("uid");
    const token = sessionStorage.getItem("token");

    //Use Effect
    useEffect(() => {
       axios.get(`http://localhost:8080/channel/get?username=${uid}`, {
           headers : {
               "Authorization" : token
           }
       }).then(res => {
           console.log('Channel data received');
           console.log('Channel data received');
           const data = res.data;
           console.log(data);
           setChannelList(data);
       })
    },[uid, token]);

    return (
        <Sidebar as={Menu}
                 style={{padding: 20, marginRight: "10px"}}
                 visible={visible}
                 animation={"push"}
                 inverted
                 vertical
        >
            {/*<Menu.Item as={'a'} onClick={() => setVisible(!visible)}>*/}
            {/*    sidebar menu*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item as={'a'}>*/}
            {/*    sidebar menu 2*/}
            {/*</Menu.Item>*/}
            <ChannelSide channel_list={channelList}/>
        </Sidebar>
    )
}

export default Side;