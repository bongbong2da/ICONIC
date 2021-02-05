import React, {useEffect} from 'react';
import {Layout} from "antd";
import rootReducer from "../redux/rootReducer";
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from "react-redux";
import {SideBar} from "./SideBar";
import {Header} from "./Header";
import {Content} from "./Content";
import {Footer} from "./Footer";
import AuthChecker from "../user/AuthChecker";

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