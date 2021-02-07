import React, {useEffect} from 'react';
import {Col, Divider, Modal, Row} from 'antd';
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
        console.log(props.isVisible);
        props.setVisible(!props.isVisible);
    }

    return (
        <Modal
            width={1000}
            title={props.posting.title}
            visible={props.isVisible}
            onCancel={handleVisible}
            cancelButtonProps={{disabled : true}}
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
                    }}
                         src={`http://localhost:3000/images/${props.posting.attach}`} alt=""/>
                </Col>
                <Divider dashed type="vertical"/>
                <Col
                    span={7}
                    style={{
                        padding : "10px",
                        overflow : "auto"
                    }}
                >
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