import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Form, Header, Image, Input, InputOnChangeData, Modal} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import EmojiPicker, {IEmojiData} from "emoji-picker-react";
import axios from "axios";
import {setVisiblePostingCreator} from "../../redux/reducer/visibleReducer";
import {refreshChannel, refreshChannelList} from "../../redux/reducer/refreshReducer";
import CheckMediaType from "../../util/CheckMediaType";

const PostingCreator = () => {

    //States
    const [emoji, setEmoji] = useState('');
    const [profileImg, setProfileImg] = useState("default.png");
    const [visiblePicker, setVisiblePicker] = useState(false);

    //Redux
    const dispatcher = useDispatch();
    const visible = useSelector((state: RootState) => state.dimming.postingCreatorVisible);
    const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
    const currentChanIdx = useSelector((state: RootState) => state.channelIdx.idx);

    //Variables
    const token = sessionStorage.getItem("token");

    //UseEffect
    useEffect(() => {

    }, [emoji, visible]);

    //Methods
    const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        (document.getElementById("posting-form") as HTMLFormElement).reset();
        setProfileImg('default.png');
        setEmoji('');
        setVisiblePicker(false);
        dispatcher(setVisiblePostingCreator(false));
    }

    const onPicked = (e: any, data: IEmojiData) => {
        setEmoji(data.emoji);
    }

    const onUpload = async (e: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        let formData = new FormData();
        if (e.target.files) {
            console.log(e.target.files[0]);
            formData.append("multipartFile", e.target.files[0]);
            await axios.post("/upload/uploadImage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(res => {
                    console.log(res.data);
                    const checked = CheckMediaType(res.data);
                    if(!checked) {
                        const target = document.getElementById('fileInput') as HTMLInputElement;
                        target.value = "default.png";
                    }
                    const imgName = res.data;
                    const fileName = imgName.substring(imgName.lastIndexOf("/") + 1, imgName.length);
                    setProfileImg(fileName);
                });
        }
    }

    const handleSubmit = async (e: any) => {
        const form = document.getElementById("posting-form") as HTMLFormElement;
        let formData = new FormData(form);
        // formData.append("posting_emoji", emoji)
        await axios.post("/posting/create", formData, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            handleClose(e);
            dispatcher(refreshChannel());
            dispatcher(refreshChannelList());
            console.log(res.data);
        })
        form.reset();
        setProfileImg("default.png");
        setEmoji('');
    }

    const handlePickerVisible = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setVisiblePicker(!visiblePicker);
    }

    return (
        <Modal
            open={visible}
            as={Form}
            onSubmit={handleSubmit}
            id={"posting-form"}
        >
                    <Modal.Header>
                        글쓰기
                    </Modal.Header>
            <Modal.Content image>
                {profileImg !== 'default.png' ? <Image style={{display : "inline-block"}} src={`http://localhost:8080/${profileImg}`} fluid/> : null}
            </Modal.Content>
            <Modal.Content>
                <Modal.Description style={{textAlign : "center"}}>
                    <Input id={"fileInput"} name={"upload"} type={"file"} onChange={onUpload} fluid/>
                    <Input name={"posting_chan_idx"} type={"hidden"} value={currentChanIdx}/>
                    <Input name={"posting_attach"} type={"hidden"} id={"posting-attach"} value={profileImg}/>
                    <Input name={"posting_isAttached"} type={"hidden"} id={"posting-isAttached"} value={'y'}/>
                    <Button color={"google plus"} onClick={(event => handlePickerVisible(event))} fluid>{!visiblePicker ? `이모티콘 선택하기` : '접기'}</Button>
                    <p>외부에서 이모티콘 데이터를 받아와, 다소 시간이 걸릴 수 있습니다.</p>
                    {visiblePicker ?
                        <>
                            <Header size={"medium"}>오늘의 기분은?</Header>
                            <Form.Input
                                value={emoji}
                                size={"massive"}
                                name={"posting_emoji"}
                                type={"text"}
                                fluid
                            />
                        <EmojiPicker preload={true} onEmojiClick={onPicked}/>
                        </>
                        : null}
                    <Form.Input name={"posting_writer"} type={"hidden"} value={userInfo.username}/>
                    <br/>
                    <p>글 내용</p>
                    <Form.TextArea required style={{height: "400px"}} name={"posting_content"}/>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button type={"submit"} color={"facebook"}>작성하기</Button>
                <Button onClick={(e) => handleClose(e)}>닫기</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default PostingCreator;