import React from 'react';
import {Button, Input} from "antd";

export const ChannelFunction = () => {

    const Search = Input.Search;

    return(
        <div style={{padding : "20px", backgroundColor : "#8f8f8f"}}>
            <Button type="primary" style={{marginRight : "10px"}}>글쓰기</Button>
            <Button type="default" style={{marginRight : "10px"}}>채널 만들기</Button>
            <Button type="dashed" style={{marginRight : "10px"}}>채널 참가하기</Button>
            <Search style={{width : "200px"}} placeholder={"Search Keyword"}/>
        </div>
    )
}