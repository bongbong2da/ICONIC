import React, {useEffect} from 'react';
import {Layout} from "antd";
import {SideBar} from "./SideBar";
import {Header} from "./Header";
import {Content} from "./Content";
import {Footer} from "./Footer";
import AuthChecker from "../../semantic/user/AuthChecker";
import '../css/style.less';

export const Main = () => {

    AuthChecker();

    useEffect(() => {
    });

    return (
        <Layout>
            <Header/>
            <Layout style={{minHeight : "100vh"}}>
                <SideBar/>
                <Layout>
                    <Content/>
                    <Footer/>
                </Layout>
            </Layout>
        </Layout>
    )

}