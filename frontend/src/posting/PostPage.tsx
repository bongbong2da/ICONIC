import React from 'react';
import {Input, Row} from 'antd';
import {Posting} from "./Posting";

export const PostPage = () => {

    console.log("PostPage Called...")

    const Search = Input.Search;

    return (
        <div>
            <div id="modalPoint">

            </div>
            <Row
                style={{
                    justifyContent : "center"
                }}
            >
                <Posting idx={1}/>
                <Posting idx={2}/>
                <Posting idx={3}/>
                <Posting idx={4}/>
                <Posting idx={5}/>
                <Posting idx={6}/>
                <Posting idx={7}/>
            </Row>
        </div>
    )
}