import React, {useEffect, useState} from 'react';
import {Button, Container, Dimmer, Segment, Sidebar} from "semantic-ui-react";
import "../style.less";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import SideMenu from "./SideMenu";
import ChannelIndex from "../channel/ChannelIndex";
import HeaderMenu from './HeaderMenu';
import Profile from "../user/Profile";
import PostingCreator from "../posting/PostingCreator";
import axios from "axios";
import ChannelApply from "../channel/ChannelApply";

const Main = () => {

    //Redux
    const isLoggedIn = useSelector((state: RootState) => state.loginsStatus.isLoggedIn);
    const visibleSidebar = useSelector((state: RootState) => state.sidebar.visible);
    const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
    const dimmable = useSelector((state : RootState) => state.dimming.dimmable);
    const profileDimming = useSelector((state : RootState) => state.dimming.profileDimming);
    const postingCreatorDimming = useSelector((state : RootState) => state.dimming.postingCreatorDimming);
    const channelApplyDimming = useSelector((state : RootState) => state.dimming.channelApplyDimming);



    //Use Effect
    useEffect(() => {

    },[profileDimming, postingCreatorDimming, dimmable]);

    //Rendering
    if (isLoggedIn)
        return (
            <>
                <Dimmer.Dimmable dimmed={dimmable}>
                    <Dimmer active={profileDimming}>
                        <Profile/>
                    </Dimmer>
                    <Dimmer active={postingCreatorDimming}>
                        <PostingCreator/>
                    </Dimmer>
                    <Dimmer active={channelApplyDimming}>
                        <ChannelApply/>
                    </Dimmer>
                    <Sidebar.Pushable>
                        <SideMenu/>
                        <Sidebar.Pusher dimmed={visibleSidebar}>
                            <HeaderMenu/>
                            <ChannelIndex/>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </Dimmer.Dimmable>
            </>
        )
    else return null as JSX.Element | null;
}

export default Main;