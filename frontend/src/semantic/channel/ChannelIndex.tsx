import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {Container, Header, Loader, Segment} from "semantic-ui-react";
import ChannelPostings from "./ChannelPostings";
import ChannelHeader from "./ChannelHeader";

const ChannelIndex = () => {

    //Redux
    const currentChannelIdx = useSelector((state: RootState) => state.channelIdx.idx);

    useEffect(() => {

    }, [currentChannelIdx]);

    if (currentChannelIdx === 0) {
        return (
            <Container
                textAlign={"center"}
                style={{width:"70vw", height : "70vw"}}
            >
                {/*<Container as={Segment} textAlign={"center"} text inverted>*/}
                <Segment>
                    <Header>📢 개발자 알림 📢</Header>
                    <p>
                        업데이트 내역 <br/>
                        - 0.1v가 배포되었습니다. 🎉 <br/>
                    </p>
                </Segment>
                <Segment>
                    <Header>🥳 돌아오셨군요 🥳</Header>
                    <p>
                        채널을 선택해보세요! <br/>
                        맨 좌측 상단 채널 아이콘을 클릭하여 채널리스트를 연 뒤 <br/>
                        좌측 메뉴에서 채널을 골라 새로운 소식을 확인해보세요.
                    </p>
                </Segment>
            </Container>
        )
    } else {
        return (
            <Container textAlign={"center"} style={{width:"100%", minHeight : "100vh"}}>
                <ChannelHeader/>
                <ChannelPostings channel_idx={currentChannelIdx}/>
            </Container>
        )
    }

}

export default ChannelIndex;