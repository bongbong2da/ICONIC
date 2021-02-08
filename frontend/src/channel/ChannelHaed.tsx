import React from 'react';
import {CreatedChannelTypes, PublicChannelTypes} from "../layout/SideBar";

type ChannelHaedProps = {
    pchannel_info : PublicChannelTypes | null;
    cchannel_info : CreatedChannelTypes| null;
}

export const ChannelHead = (props : ChannelHaedProps) => {
    return (
        <div
            style={{
                width : "80%",
                margin : "20px",
                padding : "10px",
                backgroundColor : "white",
                borderRadius : "10px",
            }}
        >
            <h2>
                {props.pchannel_info ? props.pchannel_info.pchanName : props.cchannel_info?.cchanName}
            </h2>
            <strong>Manager</strong> : {props.pchannel_info ? props.pchannel_info.pchanAnnounce : props.cchannel_info?.cchanAnnounce}
        </div>
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