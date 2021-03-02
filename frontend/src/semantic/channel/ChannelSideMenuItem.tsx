import React, {useEffect, useState} from 'react';
import {Label, Menu} from "semantic-ui-react";
import {ChannelTypes} from "./ChannelSideMenu";
import {invertSidebarVisible} from "../../redux/reducer/sidebarReducer";
import {saveChannelIdx} from "../../redux/reducer/channelRedux";
import {useDispatch} from "react-redux";
import axios from "axios";

type ChannelSideMenuItemProps = {
    channel : ChannelTypes
}

const ChannelSideMenuItem = ({channel} : ChannelSideMenuItemProps) => {

    //States
    const [newPostingsCount, setNewPostingsCount] = useState();

    //Redux
    const dispatcher = useDispatch();

    //Methods
    const handleChannelIdx = (idx : number) => {
        dispatcher(invertSidebarVisible());
        dispatcher(saveChannelIdx(idx));
    }

    const getNewPostingsCount = async (idx : number) => {
        await axios.get(`/posting/getNewPostingCount?idx=${idx}`, {
            headers : {
                "Authorization" : `Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then(res => {
                setNewPostingsCount(res.data);
                return res.data;
            })
    }

    //useEffect
    useEffect(() => {
        getNewPostingsCount(channel.chanIdx);
    }, []);

    return (
        <Menu.Item as={'a'} onClick={()=>handleChannelIdx(channel.chanIdx)}>
            <span>{`${channel.chanEmoji} ${channel.chanName}`}</span>
            {newPostingsCount !== 0 ? <Label color={"red"}> {newPostingsCount}</Label> : null}
        </Menu.Item>
    )

}

export default ChannelSideMenuItem;