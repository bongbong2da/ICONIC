import React, {useEffect, useState} from 'react';
import {Container, Dimmer, Segment, Sidebar} from "semantic-ui-react";
import "../style.less";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import Side from "./Side";
import ChannelIndex from "../channel/ChannelIndex";
import HeaderMenu from './HeaderMenu';
import Profile from "../user/Profile";
import PostingCreator from "../posting/PostingCreator";

const Main = () => {

    //Redux
    const isLoggedIn = useSelector((state: RootState) => state.loginsStatus.isLoggedIn);
    const visibleSidebar = useSelector((state: RootState) => state.sidebar.visible);
    const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
    const dimmable = useSelector((state : RootState) => state.dimming.dimmable);
    const profileDimming = useSelector((state : RootState) => state.dimming.profileDimming);
    const postingCreatorDimming = useSelector((state : RootState) => state.dimming.postingCreatorDimming);



    //Use Effect
    useEffect(() => {

    },[profileDimming, postingCreatorDimming, dimmable]);

    //Rendering
    if (isLoggedIn)
        return (
            <>
                <HeaderMenu/>
                <Dimmer.Dimmable dimmed={dimmable}>
                    <Dimmer active={profileDimming}>
                        <Profile/>
                    </Dimmer>
                    <Dimmer active={postingCreatorDimming}>
                        <PostingCreator/>
                    </Dimmer>
                    <Sidebar.Pushable>
                        <Side/>
                        <Sidebar.Pusher dimmed={visibleSidebar}>
                            <ChannelIndex/>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </Dimmer.Dimmable>
            </>
        )
    else return null as JSX.Element | null;
}

export default Main;