import React, {useEffect, useState} from 'react';
import {Button, Input, Layout} from "antd";
import PostingCreator from "../posting/PostingCreator";

export const ChannelFunction = () => {

    const Search = Input.Search;

    const [visiblePostingCreator, setVisiblePostingCreator] = useState(false);

    const handlePostingCreatorDisplay = () => {
        setVisiblePostingCreator(!visiblePostingCreator);
        console.log(`Creator Visible : ${visiblePostingCreator}`);
    }

    useEffect(() => {

    }, [visiblePostingCreator]);

    return(
        <Layout className={"channel-function"} color={"grey"} style={{padding : "20px"}}>
            <PostingCreator visible={visiblePostingCreator} setVisible={setVisiblePostingCreator}/>
            <Button type="primary" style={{marginRight : "10px"}} onClick={handlePostingCreatorDisplay}>글쓰기</Button>
            <Button type="default" style={{marginRight : "10px"}}>채널 만들기</Button>
            <Button type="dashed" style={{marginRight : "10px"}}>채널 참가하기</Button>
            <Search style={{width : "200px"}} placeholder={"Search Keyword"}/>
        </Layout>
    )
}