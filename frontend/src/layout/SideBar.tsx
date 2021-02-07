import React, {useEffect, useState} from 'react';
import {Layout, Menu} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "../redux/rootReducer";
import axios from "axios";
import ChannelItem from "../channel/ChannelItem";


type ChannelSetTypes = {
    public_list : PublicChannelTypes[]
    created_list : CreatedChannelTypes[]
}

type PublicChannelTypes = {
    pchan_idx : number
    pchan_name : string
    pchan_pop_max : number
    pchan_announce : string
    pchan_manager : string
    pchan_ispublic : string
    pchan_reg : object
}

type CreatedChannelTypes = {
    cchan_idx : number
    cchan_name : string
    cchan_pop_max : number
    cchan_announce : string
    cchan_manager : string
    cchan_ispublic : string
    cchan_reg : object
}

export const SideBar = () => {

    const [collapsed, setCollapsed] = useState(false);
    const [channelList, setChannelList] = useState([] as unknown as ChannelSetTypes);
    const isLogin = useSelector((state : RootState) => state.loginsStatus.isLoggedIn);
    const uid = localStorage.getItem("uid");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if(isLogin) {
            axios("http://localhost:8080/channel/get?username=" + uid, {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(`Channel Data : ${JSON.stringify(res.data)}`);
                    setChannelList(res.data);
                })
            loginTrue = (
                <>
                    {channelList.public_list.map((data : PublicChannelTypes) => {
                        return <ChannelItem key={data.pchan_idx}/>;
                    })}
                </>
            )
        } else {
            loginTrue = (
                <div>
                    data none...
                </div>
            )
        }
    }, []);

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    }

    let loginTrue : JSX.Element = (
        <p>Init State</p>
    );
    const loginFalse = (
        <div>
            plz login...
        </div>
    )

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

            <Menu defaultSelectedKeys={['0']}>
                {/*<MenuItem key={0} icon={<SmileTwoTone/>}>*/}
                {/*    <Badge*/}
                {/*        className="badge-example"*/}
                {/*        count={0}*/}
                {/*        style={{backgroundColor: "red"}}*/}
                {/*    />*/}
                {/*    Public Channel*/}
                {/*</MenuItem>*/}
                {/*<MenuItem key={1} icon={<SmileTwoTone/>}>*/}
                {/*    <Badge*/}
                {/*        className="badge-example"*/}
                {/*        count={23}*/}
                {/*        style={{backgroundColor: "red"}}*/}
                {/*    />*/}
                {/*    Joined Channel 1 (Example)*/}
                {/*</MenuItem>*/}
                {/*<MenuItem key={2} icon={<HeartTwoTone twoToneColor="#eb2f96" />}>*/}
                {/*    <Badge*/}
                {/*        className="badge-example"*/}
                {/*        count={1}*/}
                {/*        style={{backgroundColor: "gray"}}*/}
                {/*    />*/}
                {/*    Joined Channel 1 (Example)*/}
                {/*</MenuItem>*/}
                {/*<MenuItem key={3} icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}>*/}
                {/*    <Badge*/}
                {/*        className="badge-example"*/}
                {/*        count={10}*/}
                {/*        style={{backgroundColor: "green"}}*/}
                {/*    />*/}
                {/*    Joined Channel 1 (Example)*/}
                {/*</MenuItem>*/}
                {isLogin ? loginTrue : loginFalse}
            </Menu>
        </Layout.Sider>
    )
}