import React, {useEffect} from 'react';
import {Divider, Typography} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "../redux/rootReducer";

const ChannelIndex = () => {

    const isLogin = useSelector((state : RootState) => state.loginsStatus.isLoggedIn);

    const devAnnounce = (
        <div
            style={{
                margin : "20px",
                padding : "20px",
                borderRadius : "5px",
                textAlign : "center",
            }}
        >
            <Typography.Title>📢 개발자 알림 📢</Typography.Title>
            <Divider/>
            <Typography.Title level={2}>업데이트 내역</Typography.Title>
            <Typography.Text>- 0.1v가 배포되었습니다. 🎉</Typography.Text>
        </div>
    )

    useEffect(() => {

    });

    const loginTrue = (
        <>
        <div
            style={{
                margin : "20px",
                padding : "20px",
                borderRadius : "5px",
                textAlign : "center"
            }}
        >
            <Typography.Title>🥳 돌아오셨군요 🥳</Typography.Title>
            <Divider/>
            <Typography.Title level={2}>채널을 선택해보세요!</Typography.Title>
            <Typography.Text>좌측 메뉴에서 채널을 골라 새로운 소식을 확인해보세요.</Typography.Text>
        </div>
            {devAnnounce}
        </>
    )

    const loginFalse = (
        <>
        <div
            style={{
                margin : "20px",
                padding : "20px",
                borderRadius : "5px",
                backgroundColor : "white",
                textAlign : "center"
            }}
        >
            <Typography.Title>🥳 환영합니다 🥳</Typography.Title>
            <Divider/>
            <Typography.Title level={2}>우측 상단 메뉴를 통해 회원가입을 해보세요!</Typography.Title>
            <Typography.Text>모든 비밀번호는 암호화되어 저장됩니다.</Typography.Text>
        </div>
            {devAnnounce}
    </>
    )

    return (
        <>
            {isLogin ? loginTrue : loginFalse}
        </>
    )
}

export default ChannelIndex;