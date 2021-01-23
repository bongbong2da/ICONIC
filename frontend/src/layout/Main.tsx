import React from 'react';
import {Header} from "./Header";
import {SideBar} from "./SideBar";
import {Content} from "./Content";
import {Layout} from "antd";
import {Footer} from "./Footer";

type MainProps = {}

export const Main = ({}: MainProps) => {

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