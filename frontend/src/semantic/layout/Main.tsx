import React, {useEffect} from 'react';
import {Dimmer, Sidebar} from "semantic-ui-react";
import "../style.less";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import SideMenu from "./SideMenu";
import ChannelIndex from "../channel/ChannelIndex";
import HeaderMenu from './HeaderMenu';
import Profile from "../user/Profile";
import PostingCreator from "../posting/PostingCreator";
import ChannelJoin from "../channel/ChannelJoin";
import PostingModal from "../posting/PostingModal";
import {invertSidebarVisible} from "../../redux/reducer/sidebarReducer";
import ChannelCreator from "../channel/ChannelCreator";
import axios from "axios";

const Main = () => {

    //Redux
    const dispatcher = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.loginsStatus.isLoggedIn);
    const visibleSidebar = useSelector((state: RootState) => state.sidebar.visible);
    const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
    const dimmable = useSelector((state : RootState) => state.dimming.dimmable);
    const profileDimming = useSelector((state : RootState) => state.dimming.profileDimming);
    const postingCreatorDimming = useSelector((state : RootState) => state.dimming.postingCreatorDimming);
    const channelApplyDimming = useSelector((state : RootState) => state.dimming.channelApplyDimming);
    const postingModalDimming = useSelector((state : RootState) => state.dimming.postingModalDimming);
    const channelCreatorDimming = useSelector((state : RootState) => state.dimming.channelCreatorDimming);

    //Methods
    const handleDimming = () => {
        if(!visibleSidebar) return;
        dispatcher(invertSidebarVisible());
    }

    //Use Effect
    useEffect(() => {

    },[profileDimming, postingCreatorDimming, dimmable]);

    //Rendering
    if (isLoggedIn)
        return (
            <>
                <Dimmer.Dimmable dimmed={dimmable}>
                    <Dimmer active={channelCreatorDimming}>
                        <ChannelCreator/>
                    </Dimmer>
                    <Dimmer active={postingModalDimming}>
                        <PostingModal/>
                    </Dimmer>
                    <Dimmer active={profileDimming}>
                        <Profile/>
                    </Dimmer>
                    <Dimmer active={postingCreatorDimming}>
                        <PostingCreator/>
                    </Dimmer>
                    <Dimmer active={channelApplyDimming}>
                        <ChannelJoin/>
                    </Dimmer>
                    <Sidebar.Pushable>
                        <SideMenu/>
                        <Sidebar.Pusher onClick={handleDimming} dimmed={visibleSidebar}>
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