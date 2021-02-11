import React, {useEffect, useState} from 'react';
import {Avatar, Divider, Layout, Menu, Modal, Typography} from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import {SignUp} from "../user/SignUp";
import SignIn from "../user/SignIn";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {saveChannelIdx} from "../../redux/reducer/channelRedux";

export const Header = () => {

    const Header = Layout.Header;
    const Title = Typography;
    const mainContent = document.getElementById("main-content");
    const isLoggedIn : boolean = useSelector((state : RootState) => state.loginsStatus.isLoggedIn);
    const uid = sessionStorage.getItem("uid");
    const dispatcher = useDispatch();

    useEffect(() => {
    });

    const goMain = () => {
        dispatcher(saveChannelIdx(0));
    }

    const [isSignUpVisible, setIsSignUpVisible] = useState(false);
    const handleSignUpVisible = () => {
        if (isSignUpVisible) return;
        setIsSignUpVisible(!isSignUpVisible);
    }

    const [isSignInVisible, setIsSignInVisible] = useState(false);
    const handleSigInVisible = () => {
        if (isSignInVisible) return;
        setIsSignInVisible(!isSignInVisible);
    }

    const [isLogoutVisible, setIsLogoutVisible] = useState(false);
    const handleLogoutVisible = () => {
        setIsLogoutVisible(!isLogoutVisible);
    }

    const logout = () => {
        sessionStorage.removeItem("uid");
        sessionStorage.removeItem("token");
        window.location.reload();
    }

    const logoutModal = (
        <Modal
            visible={isLogoutVisible}
            onOk={logout}
            onCancel={handleLogoutVisible}
        >
            <h2>로그아웃</h2>
            <Divider/>
            로그아웃 하시겠습니까?
        </Modal>
    )

    return (
        <Header
            style={{width : "100%"}}
        >
            {logoutModal}
            <Menu
                theme={"dark"}
                mode="horizontal"
                defaultSelectedKeys={['0']}
            >
                <MenuItem key="0" style={{fontSize: "20px"}} onClick={goMain}>
                    {"🏄🏻ICONIC"}
                </MenuItem>

                {isLoggedIn ?
                    <>
                        <MenuItem key="1">친구 🙋🏾</MenuItem>
                        <MenuItem key="2">공개 채널 🌏</MenuItem>
                        <MenuItem key="3">도움말 👨🏻‍🔧</MenuItem>
                    </> : null
                }
                {!isLoggedIn ?
                    <>
                        <MenuItem style={{float : "right"}} key="5" onClick={handleSignUpVisible}>
                            회원가입 📝
                            <SignUp visible={isSignUpVisible} setIsSignUpVisible={setIsSignUpVisible}/>
                        </MenuItem>
                        <MenuItem style={{float : "right"}} key="4" onClick={handleSigInVisible}>
                            로그인 ✔️
                            <SignIn visible={isSignInVisible} setIsSignInVisible={setIsSignInVisible} state={null}/>
                        </MenuItem>
                    </>
                    :
                    <>
                        <MenuItem style={{float : "right"}}>
                            <Avatar src={'http://localhost:8080/images/default.png'}/>  {uid}
                        </MenuItem>
                        <MenuItem style={{float:"right"}} onClick={handleLogoutVisible}>
                            로그아웃 📴
                        </MenuItem>
                    </>
                }

            </Menu>

            <Menu
                theme={"light"}
                mode={"horizontal"}
                defaultSelectedKeys={['1']}
            >

            </Menu>
        </Header>
    )
}
