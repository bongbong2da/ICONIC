import React from 'react';
import {ChannelTypes} from "../layout/SideBar";
import {useSelector} from "react-redux";
import {RootState} from "../redux/rootReducer";
import {Layout} from "antd";

type ChannelHaedProps = {
    channel_data : ChannelTypes
}

export const ChannelHead = (props : ChannelHaedProps) => {
    return (
        <Layout
            className={"channel-header"}
            style={{
                width : "95%",
                margin : "20px",
                padding : "10px",
                borderRadius : "10px",
            }}
        >
            <h2>
            {props.channel_data ? `${props.channel_data.chanEmoji} ${props.channel_data.chanName}` : null}
            </h2>
            <strong>Manager</strong> {props.channel_data ? props.channel_data.chanAnnounce : null}
        </Layout>
        // <div
        //     style={{
        //         width : "80%",
        //         margin : "20px",
        //         padding : "10px",
        //         backgroundColor : "white",
        //         borderRadius : "10px",
        //     }}
        // >
        //     <h2>🎉 Announcement</h2>
        //     <strong>Manager</strong> : Welcome to my new channel. please post a lot.
        // </div>
    )
}