import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {Container, Header, Segment} from "semantic-ui-react";
import {Typography} from "antd";

const ChannelIndex = () => {

    const currentChannelIdx = useSelector((state: RootState) => state.channelIdx.idx);

    useEffect(() => {

    }, [currentChannelIdx]);

    if (currentChannelIdx === 0) {
        return (
            <>
                <Container as={Segment} textAlign={"center"} text>
                    <Header>📢 개발자 알림 📢</Header>
                    <p>
                        업데이트 내역 <br/>
                        - 0.1v가 배포되었습니다. 🎉 <br/>
                    </p>
                </Container>
                <Container as={Segment} text>
                    <Header>🥳 돌아오셨군요 🥳</Header>
                    <p>
                        채널을 선택해보세요! <br/>
                        맨 좌측 상단 채널 아이콘을 클릭하여 채널리스트를 연 뒤 <br/>
                        좌측 메뉴에서 채널을 골라 새로운 소식을 확인해보세요.
                    </p>
                </Container>
            </>
        )
    } else {
        return (
            <div>
                채널 페이지
            </div>
        )
    }

}

export default ChannelIndex;