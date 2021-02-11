import React, {useEffect, useState} from 'react';
import {Row, Typography} from 'antd';
import {Posting, PostingTypes} from "./Posting";
import axios from "axios";
import {parsingPost} from './PostingHandler';

type PostingPageProps = {
    channel_idx : number
}

export const PostingPage = (props : PostingPageProps) => {

    const [list , setList] = useState([] as PostingTypes[]);

    useEffect(() => {
        // console.log(`http://localhost:8080/post/get?idx=${props.channel_idx}`);
        const dbData = axios.get(`http://localhost:8080/post/get?idx=${props.channel_idx}`, {
            headers : {
                "Authorization" : `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(res=> {
            let parsedData = parsingPost(res.data);
            setList(parsedData);
            // console.log(`Postings Received...`);
        });
        // console.log(`List : ${list}`);
    }, [props.channel_idx]);

    const sampleData = {
        idx : 1,
        count : 30,
        chan_idx : 1,
        title : '  Hi! This is my first posting :)',
        writer : 'test writer',
        emoji : '😈',
        content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\n' +
            '                dolore magna aliqua.\n' +
            '                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n' +
            '                consequat. Duis aute irure\n' +
            '                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint\n' +
            '                occaecat cupidatat non proident,\n' +
            '                sunt in culpa qui officia deserunt mollit anim id est laborum.',
        isAttached : '1',
        attach : '',
        reg : new Date()
    }


    const sampleArr = [
        {...sampleData},
        {...sampleData},
        {...sampleData},
        {...sampleData},
        {...sampleData},
    ];

    const emptyChannel = (
        <div
            style={{
                margin : "20px",
                padding : "20px",
                borderRadius : "10px",
                backgroundColor : "white",
                fontSize : "20px"
            }}
        >
            <Typography.Paragraph strong >아무것도...없네요? 😱</Typography.Paragraph>
            <Typography.Paragraph style={{fontSize : "13px"}} >첫 게시자가 되어보세요</Typography.Paragraph>
            
        </div>
    )

    return (
        <div>
            <div id="modalPoint">

            </div>
            <Row
                style={{
                    justifyContent : "center"
                }}
            >
                {list.length !== 0 ? list.map(data => {
                    // console.log(`Rendering Data : ${data}`)
                    return (
                        <Posting key={data.idx} posting={data}/>
                    )
                }) : emptyChannel}
            </Row>
        </div>
    )
}