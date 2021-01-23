import React, {useEffect} from 'react';
import {Col, Divider, Modal, Row} from 'antd';

type PostingModalTypes = {
    idx: number,
    isVisible: boolean,
    setVisible: any
}

export const PostingModal = ({idx, isVisible, setVisible}: PostingModalTypes) => {

    useEffect(() => {

    }, []);

    const handleVisible = () => {
        console.log(isVisible);
        setVisible(!isVisible);
    }

    return (
        <Modal width={1000} title={"Hi! This is my first posting :)"} visible={isVisible} onOk={handleVisible}>
            <Row
                style={{
                    width : "100%",
                }}
            >
                <Col span={7} style={{
                    padding: "5px",
                    display : "block",
                }}>
                    <img style={{
                    }}
                         src="http://localhost:3000/logo.svg" alt=""/>
                </Col>
                <Divider dashed type="vertical"/>
                <Col
                    span={7}
                    style={{
                        padding : "10px",
                        overflow : "auto"
                    }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et
                    dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint
                    occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et
                    dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint
                    occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Col>
                <Col
                    style={{
                        justifyContent : "center",
                        overflow : "auto"
                    }}
                >
                    <span>😲 user1 : Hi! nice to meet you</span>
                    <br/>
                    <span>🙌 someperson2 : Hi! nice to meet you</span>
                </Col>
            </Row>
        </Modal>
    )
}