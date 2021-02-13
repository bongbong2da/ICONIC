import React, {useEffect} from 'react';
import {Image, Menu} from "semantic-ui-react";
import {invertSidebarVisible} from "../../redux/reducer/sidebarReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {saveChannelIdx} from "../../redux/reducer/channelRedux";
import {setSelectedUser} from "../../redux/reducer/userActions";
import {setChannelApplyDimming, setProfileDimming} from "../../redux/reducer/dmmingReducer";
import {setLoadingRedirect} from "../../redux/reducer/loadingReducer";

const HeaderMenu = () => {

    //Redux
    const isLoggedIn = useSelector((state: RootState) => state.loginsStatus.isLoggedIn);
    const visibleSidebar = useSelector((state : RootState) => state.sidebar.visible);
    const userInfo = useSelector((state : RootState) => state.userInfo.userInfo);
    const profileDimming = useSelector((state : RootState) => state.dimming.profileDimming);
    const channelApplyDimming = useSelector((state : RootState) => state.dimming.channelApplyDimming);
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
        dispatcher(setProfileDimming(!profileDimming));
    }

    const handleChannelApply = () => {
        dispatcher(setChannelApplyDimming(!channelApplyDimming));
    }

    //Use Effect
    useEffect(() => {

    },[profileDimming]);

    return (
        <Menu inverted size={"huge"} stackable>
            <Menu.Item as={"a"} onClick={()=>dispatcher(invertSidebarVisible())}>
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
            <Menu.Item as={"a"}>
                공개 채널 🌏
            </Menu.Item>
            <Menu.Item as={"a"} onClick={() => dispatcher(setLoadingRedirect(true))}>
                도움말 👨🏻‍🔧
            </Menu.Item>
            <Menu.Menu position={"right"}>
                <Menu.Item as={"a"} onClick={handleChannelApply}>
                    채널 참가 👋🏻
                </Menu.Item>
                <Menu.Item as={"a"} onClick={handleProfile}>
                    <Image src={userInfo.profileImg ? `http://localhost:8080/upload/images/${userInfo.profileImg}` : null} avatar/>
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