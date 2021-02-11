import React, {useEffect, useState} from 'react';
import Picker, {IEmojiData} from "emoji-picker-react";
import {Button, Form, Input, Layout, Modal, Typography} from "antd";
import {Uploader} from "../modules/Uploader";

type PostingCreatorProps = {
    visible: boolean
    setVisible: any
}

const PostingCreator = (props: PostingCreatorProps) => {

    const [pickedEmoji, setEmoji] = useState({} as IEmojiData);
    const [visiblePicker, setVisiblePicker] = useState("block");
    const [imgUrl, setImgUrl] = useState('default.png');

    const handleVisible = () => {
        props.setVisible(!props.visible);
    }

    const handlePickerVisible = () => {
        if (visiblePicker === "none") setVisiblePicker("block")
        else setVisiblePicker("none");
    }

    const onEmojiClick = (e: any, emoji: any) => {
        console.log(`Emoji Picked : ${JSON.stringify(emoji)}`)
        setEmoji(emoji);
    }

    const onFinishHandle = (e: any) => {
        console.log(e)
    }

    useEffect(() => {
    }, [visiblePicker])

    const titleInput = (
        <Form.Item
            name={"posting_title"}
        >
            <Input
                style={{
                    width: "200px"
                }}
                placeholder={"제목을 입력하세요"}
            >

            </Input>
        </Form.Item>
    )

    const onFinish = (e: any) => {
        console.log(JSON.stringify(e));
    }


    return (
        <Modal
            width={"100%"}
            visible={props.visible}
            onCancel={handleVisible}
        >
            <Form
                onFinish={onFinish}
                initialValues={{"posting_emoji": pickedEmoji.emoji, "posting_content" : ""}}
            >
                <Typography.Title level={5}>사진 업로드</Typography.Title>
                <div
                    style={{width: "100%", height: "350px", border: "1px dashed", textAlign: "center"}}
                >
                    <img style={{width: "auto", height: "345px"}}
                         src="http://localhost:8080/images/default.png"
                         alt="default.png"/>
                </div>
                <Uploader url={null} setUrl={setImgUrl}/>
                <Form.Item>
                    <Typography.Title level={5}>
                        포스트 내용
                    </Typography.Title>
                    <Input
                        style={{
                            width: "100%",
                            height: "420px"
                        }}
                    >

                    </Input>
                </Form.Item>
                <Typography.Title level={5}>
                    지금 내 기분은?
                </Typography.Title>
                <Form.Item>
                    <Input
                        style={{width: "100%", height: "100px", fontSize: "40px", textAlign: "center"}}
                    />
                </Form.Item>
                <Layout
                    style={{display: visiblePicker}}
                >
                    <Picker pickerStyle={{width: "100%"}} onEmojiClick={onEmojiClick}/>
                </Layout>
                <Button htmlType={"submit"}>submit</Button>
            </Form>
        </Modal>

    )
}

export default PostingCreator;