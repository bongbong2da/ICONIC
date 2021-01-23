import React from 'react';
import {Layout} from "antd";
import {PostPage} from "../posting/PostPage";
import {Channel} from "../channel/Channel";

export const Content = () => {

    const Content = Layout.Content;

    return (
            <Content
                id={"main-content"}
                style={{
                    backgroundColor : "lightgray",
                }}
            >
                <Channel/>
            </Content>
    )
}