import React, {useEffect} from 'react';
import {Image, Menu} from "semantic-ui-react";
import {invertSidebarVisible} from "../../redux/reducer/sidebarReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {saveChannelIdx} from "../../redux/reducer/channelRedux";
import {setSelectedUser} from "../../redux/reducer/userActions";
import {setVisibleChannelApply, setVisibleChannelCreator, setVisibleProfile} from "../../redux/reducer/visibleReducer";

const HeaderMenu = () => {

    //Redux
    const isLoggedIn = useSelector((state: RootState) => state.loginsStatus.isLoggedIn);
    const visibleSidebar = useSelector((state : RootState) => state.sidebar.visible);
    const userInfo = useSelector((state : RootState) => state.userInfo.userInfo);
    const profileDimming = useSelector((state : RootState) => state.dimming.profileVisible);
    const channelApplyDimming = useSelector((state : RootState) => state.dimming.channelApplyVisible);
    const dispatcher = useDispatch();

    //Methods
    const logout = () => {
        const q = confirm("로그아웃 하시겠습니까?");
        if(q){
            sessionStorage.removeItem("uid");
            sessionStorage.removeItem("token");
            window.location.reload();
        }
    };

    const handleProfile = () => {
        dispatcher(setSelectedUser(userInfo.username));
        dispatcher(setVisibleProfile(!profileDimming));
    }

    const handleChannelApply = () => {
        dispatcher(setVisibleChannelApply(!channelApplyDimming));
    }

    const handleChannelCreator = () => {
        dispatcher(setVisibleChannelCreator(true));
    }

    //Use Effect
    useEffect(() => {
    },[profileDimming]);

    return (
        <Menu inverted size={"huge"} pointing>
            <Menu.Item header as={"a"} onClick={()=>dispatcher(invertSidebarVisible())}>
                📃채널
            </Menu.Item>
            <Menu.Item>

            </Menu.Item>
            <Menu.Item as={"a"} onClick={() => {
                dispatcher(saveChannelIdx(0));
            }}>
                🏄🏻ICONIC
            </Menu.Item>
            <Menu.Item as={"a"}>
                친구 🙋🏾
            </Menu.Item>
            <Menu.Item as={"a"} onClick={handleChannelCreator}>
                채널 만들기 🌏
            </Menu.Item>
            <Menu.Item as={"a"}>
                도움말 👨🏻‍🔧
            </Menu.Item>
            <Menu.Menu position={"right"}>
                <Menu.Item as={"a"} onClick={handleChannelApply}>
                    채널 참가 👋🏻
                </Menu.Item>
                <Menu.Item as={"a"} onClick={handleProfile}>
                    <Image src={userInfo.profileImg ? `http://localhost:8080/${userInfo.profileImg}` : null} avatar/>
                    <span>{userInfo.username}</span>
                </Menu.Item>
                <Menu.Item as={"a"} onClick={logout}>
                    Logout 💣
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default HeaderMenu;