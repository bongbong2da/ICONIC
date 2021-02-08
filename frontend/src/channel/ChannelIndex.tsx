import React from 'react';
import {Divider, Typography} from "antd";

const ChannelIndex = () => {
    return (
        <div
            style={{
                margin : "20px",
                padding : "20px",
                borderRadius : "5px",
                backgroundColor : "white"
            }}
        >
            <Typography.Title>🥳 환영합니다 🥳</Typography.Title>
            <Divider/>
            <Typography.Title level={2}>채널을 선택해보세요!</Typography.Title>
            <Typography.Text>좌측 메뉴에서 채널을 골라 새로운 소식을 확인해보세요.</Typography.Text>
        </div>
    )
}

export default ChannelIndex;