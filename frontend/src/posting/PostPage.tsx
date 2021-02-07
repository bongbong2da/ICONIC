import React, {useEffect, useState} from 'react';
import {Input, Row} from 'antd';
import {Posting, PostingTypes} from "./Posting";
import axios from "axios";
import {useSelector} from "react-redux";
import {parsingPost} from './PostingHandler';

export const PostPage = () => {

    const [list , setList] = useState([] as PostingTypes[]);

    useEffect(() => {
        const dbData = axios.get("http://localhost:8080/post/get", {
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res=> {
            let parsedData = parsingPost(res.data);
            setList(parsedData);
        });
        console.log(`List : ${list}`);
    }, []);

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

    return (
        <div>
            <div id="modalPoint">

            </div>
            <Row
                style={{
                    justifyContent : "center"
                }}
            >
                {list.map(data => {
                    console.log(`Rendering Data : ${data}`)
                    return (
                        <Posting key={data.idx} posting={data}/>
                    )
                })}
            </Row>
        </div>
    )
}