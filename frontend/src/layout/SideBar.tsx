import React, {useEffect, useState} from 'react';
import {Layout, Menu} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "../redux/rootReducer";
import axios from "axios";
import ChannelItem from "../channel/ChannelItem";


export type ChannelSetTypes = {
    public_list : PublicChannelTypes[]
    created_list : CreatedChannelTypes[]
}

export type PublicChannelTypes = {
    pchanIdx : number
    pchanName : string
    pchanPopMax : number
    pchanAnnounce : string
    pcChanManager : string
    pchanIsPublic : string
    pchanReg : object
}

export type CreatedChannelTypes = {
    cchanIdx : number
    cchanName : string
    cchanMaxPop : number
    cchanAnnounce : string
    cchanManager : string
    cchanIsPublic : string
    cchanReg : object
}

let loginTrue = (
    <p>Init State</p>
);
const loginFalse = (
    <Menu.Item>
        plz login...
    </Menu.Item>
)

export const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [publicChannelList, setPublicChannelList] = useState([] as PublicChannelTypes[]);
    const [createdChannelList, setCreatedChannelList] = useState([] as CreatedChannelTypes[]);
    const isLogin = useSelector((state : RootState) => state.loginsStatus.isLoggedIn);
    const uid = localStorage.getItem("uid");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if(isLogin) {
            console.log("Checking Channel Data");
            axios("http://localhost:8080/channel/get?username=" + uid, {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(`Channel Data : ${JSON.stringify(res.data)} \nand Type : ${typeof res.data}`);
                    setPublicChannelList(res.data.public_list);
                    setCreatedChannelList(res.data.created_list);
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
            backgroundColor: "#264653"
        }}
        >
            {/*DB정보를 받아와 채널 목록을 Iterate하여 출력함.*/}
            <Menu defaultSelectedKeys={[`0`]}>
                {ChannelItem({publicchannellist : publicChannelList, createdchannellist : createdChannelList})}
                {isLogin ? loginTrue : loginFalse}
            </Menu>
        </Layout.Sider>
    )
}