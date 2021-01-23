import React from 'react';
import {ChannelFunction} from "./ChannelFunction";
import {PostPage} from "../posting/PostPage";
import {ChannelHead} from "./ChannelHaed";

export const Channel = () => {
    return (
        <div>
            <ChannelHead/>
            <ChannelFunction/>
            <PostPage/>
        </div>
    )
}