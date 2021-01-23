import React from 'react';
import {Layout, Menu, Typography} from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import {SignUp} from "../user/SignUp";
import ReactDOM from 'react-dom';
import {Channel} from "../channel/Channel";

export const Header = () => {

    const Header = Layout.Header;

    const Title = Typography;

    const mainContent = document.getElementById("main-content");

    const goMain = () => {
        ReactDOM.render(<Channel/>,mainContent);
    }

    const goSignUp = () => {
        SignUp.bind({visible : true});
    }

    return (
        <Header>
            <Menu
                theme={"dark"}
                mode="horizontal"
                defaultSelectedKeys={['0']}
            >
                <MenuItem key="0" style={{fontSize: "20px"}} onClick={goMain}>
                    {"🏄🏻ICONIC"}
                </MenuItem>
                <MenuItem key="1">My Friends</MenuItem>
                <MenuItem key="2">Public Channels</MenuItem>
                <MenuItem key="3">HELP!</MenuItem>

                <MenuItem style={{float : "right"}} key="5" onClick={goSignUp}>
                    Sign-Up
                    <SignUp visible={false}/>
                </MenuItem>
                <MenuItem style={{float : "right"}} key="4">
                    Sign-In
                </MenuItem>
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
