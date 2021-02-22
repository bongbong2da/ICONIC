import React, {useEffect, useState} from 'react';
import {Button, Form, Header, Input, Segment} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {setDimmingPostingCreator} from "../../redux/reducer/dmmingReducer";
import {RootState} from "../../redux/rootReducer";
import {refreshChannel, refreshChannelList} from "../../redux/reducer/refreshReducer";
import {ChannelTypes} from "./ChannelSideMenu";
import axios from "axios";
import {saveChannelIdx} from "../../redux/reducer/channelRedux";
import {setLoadingRedirect} from "../../redux/reducer/loadingReducer";

const ChannelHeader = () => {

    //States
    const [channelInfo, setChannelInfo] = useState({} as ChannelTypes);
    const [loading, setLoading] = useState(false);

    //Redux
    const dispatcher = useDispatch();
    const currentChanIdx = useSelector((state: RootState) => state.channelIdx.idx);
    const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
    const token = useSelector((state: RootState) => state.JWT.token);

    //Methods
    const handleCreator = () => {
        dispatcher(setDimmingPostingCreator(true));
    }

    const handleRefresh = () => {
        console.log("handle refresh...")
        dispatcher(refreshChannel());
    }

    const getChannelInfo = () => {
        setLoading(true);
        axios.get(`http://localhost:8080/channel/getChannelInfo?idx=${currentChanIdx}`)
            .then(res => {
            setChannelInfo(res.data);
        })
        setLoading(false);
    }

    const handleExit = () => {
        setLoading(true);
        const q = confirm("정말로 탈퇴하시겠습니까?");
        if (q) {
            const formData = new FormData();
            formData.append("username", userInfo.username);
            formData.append("idx", currentChanIdx);
            axios.post(`http://localhost:8080/channel/exit`, formData)
                .then(res => {
                dispatcher(saveChannelIdx(0));
                dispatcher(refreshChannelList());
            })
        }
        setLoading(false);
    }

    const handleSearch = () => {
        dispatcher(setLoadingRedirect(true));
        console.log("handleSearch...");
        const keyword = document.getElementById("keyword") as HTMLInputElement;
        axios.post(`http://localhost:8080/posting/search/${currentChanIdx}/${keyword.value}/1`, null, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                console.log(res.data);
                dispatcher(setLoadingRedirect(false));
            })
    }

    useEffect(() => {
        getChannelInfo();
    }, [currentChanIdx]);

    return (
        <Segment inverted>
            <Header>{channelInfo.chanEmoji} {channelInfo.chanName}</Header>
            <Segment inverted>
                <Header>📢 공지사항</Header>
                {channelInfo.chanAnnounce}
            </Segment>

            <Button style={{marginRight: "20px"}} size={"mini"} color={"facebook"} onClick={handleRefresh}>새로고침</Button>
            <Button style={{marginRight: "20px"}} size={"mini"} color={"facebook"} onClick={handleCreator}>글쓰기</Button>
            <Form style={{display: "inline"}}
                  id={"posting-search-form"}
                  onSubmit={handleSearch}
            >
                <Input id={"keyword"} size={"mini"} icon={"search"} type={"text"}/>
                <Button type={"submit"} size={"mini"}>검색</Button>
            </Form>
            <Button
                style={{marginRight: "20px"}}
                size={"mini"}
                color={"red"}
                onClick={handleExit}
                {...channelInfo.chanManager === userInfo.username ? {disabled: true} : null}
            >채널 탈퇴</Button>
            {
                channelInfo.chanManager === userInfo.username ?
                <>
                    <p>매니저로 접속했습니다.</p>
                    <p>초대 코드 : {channelInfo.chanCode}</p>
                </>
                : null
            }
        </Segment>
    )
}

export default ChannelHeader;