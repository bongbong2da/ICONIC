import React from 'react';
import {Button, Input} from "antd";

export const ChannelFunction = () => {

    const Search = Input.Search;

    return(
        <div style={{padding : "20px", backgroundColor : "#8f8f8f"}}>
            <Button type="primary" style={{marginRight : "10px"}}>Create Post</Button>
            <Button type="default" style={{marginRight : "10px"}}>Make Channel</Button>
            <Button type="dashed" style={{marginRight : "10px"}}>Join Channel</Button>
            <Search style={{width : "200px"}} placeholder={"Search Keyword"}/>
        </div>
    )
}