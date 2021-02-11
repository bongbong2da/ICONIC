import React, {useEffect} from 'react';
import {Avatar, Card, Col, Divider, Modal, Row, Typography} from 'antd';
import {PostingTypes} from "./Posting";

type PostingModalProps = {
    posting : PostingTypes
    isVisible : boolean
    setVisible : any
}

export const PostingModal = (props: PostingModalProps) => {

    useEffect(() => {

    }, []);

    const handleVisible = () => {
        props.setVisible(!props.isVisible);
    }

    return (
        <Modal
            width={1000}
            title={`${props.posting.emoji} ${props.posting.title}`}
            visible={props.isVisible}
            onCancel={handleVisible}
            cancelText={"닫기"}
            okButtonProps={{style : {display : "none"}}}
        >
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
                        width : "100%"
                    }}
                         src={`http://localhost:8080/images/${props.posting.attach}`} alt={props.posting.attach}/>
                    <Card
                        style={{width : "100%", height : "65px", display : "block", textAlign : "center"}}
                    >
                        <Avatar src={'http://localhost:8080/images/default.png'}/>
                        <Typography.Paragraph style={{display : "inline-block", marginLeft : "10px"}}>{props.posting.writer}</Typography.Paragraph>
                    </Card>
                </Col>

                <Divider dashed type="vertical"/>
                <Col
                    span={7}
                    style={{
                        padding : "10px",
                        overflow : "auto",
                        textAlign : "center",
                        letterSpacing : "2px"
                    }}
                >

                    <Divider style={{fontSize : "40px"}} orientation={"center"}>{props.posting.emoji}</Divider>
                    {props.posting.content}
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