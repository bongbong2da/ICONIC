import React, {useEffect, useState} from 'react';
import {Menu} from "semantic-ui-react";

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

type ChannelSideProps = {
    channel_list : ChannelTypes[]
}

const ChannelSide = ({channel_list} : ChannelSideProps) => {

    const [channelList, setChannelList] = useState([] as ChannelTypes[] | null);

    useEffect(() => {
        if(channel_list) setChannelList(channel_list);
    });

    return (
        <>
            {channelList ? channelList.map((channel : ChannelTypes, index) => {
                return (
                    <Menu.Item as={'a'} key={channel.chanIdx}>
                        <p>{`${channel.chanEmoji} ${channel.chanName}`}</p>
                    </Menu.Item>
                )
            }) : null}
        </>
    )
}

export default ChannelSide;