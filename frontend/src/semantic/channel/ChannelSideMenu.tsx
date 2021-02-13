import React, {useEffect, useState} from 'react';
import {Grid, Menu} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {saveChannelIdx} from "../../redux/reducer/channelRedux";
import {invertSidebarVisible} from "../../redux/reducer/sidebarReducer";

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

    const handleChannelIdx = (idx : number) => {
        dispatcher(invertSidebarVisible());
        dispatcher(saveChannelIdx(idx));
    }

    useEffect(() => {
        if(channel_list) setChannelList(channel_list);
    });

    return (
        <>
            {channelList ? channelList.map((channel : ChannelTypes, index) => {
                return (
                        <Menu.Item key={index} as={'a'} onClick={()=>handleChannelIdx(channel.chanIdx)}>
                            <p>{`${channel.chanEmoji} ${channel.chanName}`}</p>
                        </Menu.Item>
                )
            }) : null}
        </>
    )
}

export default ChannelSideMenu;