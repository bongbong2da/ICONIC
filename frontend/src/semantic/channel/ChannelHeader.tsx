import React, {useEffect, useState} from 'react';
import {Button, Form, Header, Input, Menu, Segment} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {setVisiblePostingCreator} from "../../redux/reducer/visibleReducer";
import {RootState} from "../../redux/rootReducer";
import {refreshChannel, refreshChannelList} from "../../redux/reducer/refreshReducer";
import {ChannelTypes} from "./ChannelSideMenu";
import axios from "axios";
import {saveChannelIdx} from "../../redux/reducer/channelRedux";

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
        dispatcher(setVisiblePostingCreator(true));
    }

    const handleRefresh = () => {
        console.log("handle refresh...")
        dispatcher(refreshChannel());
    }

    const getChannelInfo = () => {
        setLoading(true);
        axios.get(`/channel/getChannelInfo?idx=${currentChanIdx}`)
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
            axios.post(`/channel/exit`, formData)
                .then(res => {
                dispatcher(saveChannelIdx(0));
                dispatcher(refreshChannelList());
            })
        }
        setLoading(false);
    }

    const handleSearch = () => {
        console.log("handleSearch...");
        const keyword = document.getElementById("keyword") as HTMLInputElement;
        axios.post(`/posting/search/${currentChanIdx}/${keyword.value}/1`, null, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                console.log(res.data);
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
            <Menu compact inverted stackable>
                <Menu.Item size={"mini"} onClick={handleRefresh}>새로고침 🔄</Menu.Item>
                <Menu.Item size={"mini"} onClick={handleCreator}>글쓰기 ✍</Menu.Item>
                <Menu.Item>
                <Form style={{display: "inline"}}
                      id={"posting-search-form"}
                      onSubmit={handleSearch}
                >
                    <Input id={"keyword"} size={"mini"} icon={"search"} type={"text"}/>
                    <Button type={"submit"} size={"mini"}>검색</Button>
                </Form>
                </Menu.Item>
                {channelInfo.chanManager === userInfo.username ?
                    <Menu.Item
                        size={"mini"}
                        onClick={handleExit}

                    >채널 탈퇴</Menu.Item>
                    : null}

            </Menu>

            {
                channelInfo.chanManager === userInfo.username ?
                <>
                    <p>초대 코드 : {channelInfo.chanCode}</p>
                </>
                : null
            }
        </Segment>
    )
}

export default ChannelHeader;