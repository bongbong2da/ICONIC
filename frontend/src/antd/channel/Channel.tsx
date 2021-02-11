import React, {useEffect, useState} from 'react';
import {ChannelFunction} from "./ChannelFunction";
import {PostingPage} from "../posting/PostingPage";
import {ChannelHead} from "./ChannelHaed";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/rootReducer";
import axios from "axios";
import ChannelIndex from "./ChannelIndex";
import {ChannelTypes} from "../layout/SideBar";

type ChannelProps = {
    channel_idx : number | null
}

export const Channel = (props : ChannelProps) => {

    const [channelInfo, setChannelInfo] = useState({} as ChannelTypes);
    const dispatcher = useDispatch();
    let idx = useSelector((state : RootState) => state.channelIdx.idx);
    let isLogin = useSelector((state : RootState) => state.loginsStatus.isLoggedIn);
    const uid = sessionStorage.getItem("uid");
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if(isLogin && idx !==0) {
            // console.log(`http://localhost:8080/channel/getChannelInfo?idx=${idx}`);
            const response = axios.get(`http://localhost:8080/channel/getChannelInfo?idx=${idx}`, {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })
                .then(res => {
                    // console.log(res.data);
                    setChannelInfo(res.data);
                });
        }
    }, [idx]);

    return (
        <div
            id={"display-channel"}
        >
            {isLogin && idx !== 0 ?
                <>
                <ChannelHead
                    channel_data={channelInfo}
                />
                    <ChannelFunction/>
                </>
            : null}
            {idx !== 0 ? <PostingPage channel_idx={idx}/> : <ChannelIndex/>}
        </div>
    )
}