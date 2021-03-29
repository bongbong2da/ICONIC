import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import ChannelSideMenuItem from "./ChannelSideMenuItem";

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
    chanCode : string
}

type ChannelSideProps = {
    channel_list : ChannelTypes[]
}

const ChannelSideMenu = ({channel_list} : ChannelSideProps) => {

    //States
    const [channelList, setChannelList] = useState([] as ChannelTypes[] | null);

    //Redux
    const visibleSidebar = useSelector((state : RootState) => state.sidebar.visible);
    const chanIdx = useSelector((state : RootState) => state.channelIdx.idx);
    const dispatcher = useDispatch();

    useEffect(() => {
        if(channel_list) setChannelList(channel_list);
    },[channel_list]);

    return (
        <>
            {channelList ? channelList.map((channel : ChannelTypes, index) => {
                return (
                        // <Menu.Item key={index} as={'a'} onClick={()=>handleChannelIdx(channel.chanIdx)}>
                        //     <p>{`${channel.chanEmoji} ${channel.chanName}`}</p>
                        // </Menu.Item>
                        <ChannelSideMenuItem channel={channel} key={index}/>
                )
            }) : null}
        </>
    )
}

export default ChannelSideMenu;