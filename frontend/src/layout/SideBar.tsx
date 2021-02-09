import React, {useEffect, useState} from 'react';
import {Avatar, Layout, Menu, Typography} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "../redux/rootReducer";
import axios from "axios";
import ChannelItem from "../channel/ChannelItem";
import MenuItem from "antd/lib/menu/MenuItem";


export type ChannelSetTypes = {
    channel_list : ChannelTypes[]
}

export type ChannelTypes = {
    chanIdx : number
    chanType : string
    chanName : string
    chanEmoji : string
    chanPopMax : number
    chanAnnounce : string
    chanManager : string
    chanIsPublic : string
    chanReg : object
}

let loginTrue = (
    <p>Init State</p>
);
const loginFalse = (
    <Menu.Item>
        로그인이 필요합니다.
    </Menu.Item>
)

export const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [channelList, setChannelList] = useState([] as ChannelTypes[]);
    const isLogin = useSelector((state : RootState) => state.loginsStatus.isLoggedIn);
    const uid = sessionStorage.getItem("uid");
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if(isLogin) {
            // console.log("Checking Channel Data");
            axios("http://localhost:8080/channel/get?username=" + uid, {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })
                .then(res => {
                    // console.log(`Channel Data : ${JSON.stringify(res.data)} \nand Type : ${typeof res.data}`);
                    setChannelList(res.data);
                })

        } else {
            loginTrue = (
                <div>
                    data none...
                </div>
            )
        }
    },[isLogin]);

    loginTrue = (
        <>

        </>
    )

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    }

    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            style={{
            // backgroundColor: "#264653"
        }}
        >
            {/*DB정보를 받아와 채널 목록을 Iterate하여 출력함.*/}
            <Menu defaultSelectedKeys={[`0`]}>
                {isLogin ?
                    <MenuItem
                        style={{height : "150px", textAlign : "center", padding : "10px"}}
                        icon={<Avatar shape={'square'} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={'http://localhost:8080/images/default.png'}/>}
                    >
                        <Typography.Paragraph style={{paddingRight : "8px"}}>{uid}</Typography.Paragraph>
                    </MenuItem>
                : null}
                {ChannelItem({channel_list : channelList})}
                {isLogin ? loginTrue : loginFalse}
            </Menu>
        </Layout.Sider>
    )
}