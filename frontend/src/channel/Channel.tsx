import React, {useEffect, useState} from 'react';
import {ChannelFunction} from "./ChannelFunction";
import {PostingPage} from "../posting/PostingPage";
import {ChannelHead} from "./ChannelHaed";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/rootReducer";
import axios from "axios";
import ChannelIndex from "./ChannelIndex";

type ChannelProps = {
    channel_idx : number | null
}

export const Channel = (props : ChannelProps) => {

    const [channelInfo, setChannelInfo] = useState({} as {channel : any, type : string});
    const dispatcher = useDispatch();
    let idx = useSelector((state : RootState) => state.channelIdx.idx);
    const uid = localStorage.getItem("uid");
    const token = localStorage.getItem("token");




    useEffect(() => {
        console.log(`http://localhost:8080/channel/getChannelInfo?idx=${idx}`);
        const response = axios.get(`http://localhost:8080/channel/getChannelInfo?idx=${idx}`, {
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                setChannelInfo(res.data);
            });
    }, [idx]);

    return (
        <div
            id={"display-channel"}
        >
            <ChannelHead
                pchannel_info={channelInfo.type === 'public' ? channelInfo.channel : null}
                cchannel_info={channelInfo.type === 'created' ? channelInfo.channel : null}
            />
            <ChannelFunction/>
            {idx !== 0 ? <PostingPage channel_idx={idx}/> : <ChannelIndex/>}
        </div>
    )
}