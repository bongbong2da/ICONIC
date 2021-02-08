import React from 'react';
import {Layout} from "antd";
import {Channel} from "../channel/Channel";

export const Content = () => {

    return (
            <Layout.Content
                id={"main-content"}
                style={{
                    backgroundColor : "lightgray",
                }}
            >
                <Channel channel_idx={0}/>
            </Layout.Content>
    )
}