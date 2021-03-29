import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Comment, Container, Form, Header, Image, InputOnChangeData, Label, Modal} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {setVisiblePostingModal, setVisibleProfile} from "../../redux/reducer/visibleReducer";
import axios from "axios";
import PostingComment, {CommentTypes} from "./PostingComment";
import {refreshChannel, refreshPostingModal} from "../../redux/reducer/refreshReducer";
import {setSelectedUser} from "../../redux/reducer/userActions";
import EmojiPicker, {IEmojiData} from "emoji-picker-react";
import CheckMediaType from "../../util/CheckMediaType";

'use strict';

const PostingModal = () => {

    //Variables
    const axiosConfig = {
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
    }

    //States
    const [comments, setComments] = useState([] as CommentTypes[]);
    const [modifyMode, setModifyMode] = useState(false);
    const [emoji, setEmoji] = useState('');
    const [profileImg, setProfileImg] = useState("default.png");

    //Redux
    const dispatcher = useDispatch();
    const visible = useSelector((state : RootState) => state.dimming.postingModalVisible);
    const currentPosting = useSelector((state: RootState) => state.posting.postingCurrent);
    const currentChanIdx = useSelector((state: RootState) => state.channelIdx.idx);
    const currentWriter = useSelector((state: RootState) => state.posting.postingWriter);
    const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
    const refresh = useSelector((state: RootState) => state.refresh.refreshPostingModal);

    //Methods
    const handleClose = () => {
        dispatcher(setVisiblePostingModal(false));
    }

    const handleCommentSubmit = async () => {
        const source = document.getElementById("comment-form") as HTMLFormElement;
        const formData = new FormData(source);
        formData.append("commentWriter", userInfo.username);
        formData.append("postingIdx", currentPosting.postingIdx);
        formData.append("commentEmoji", "*");

        await axios.post("/comment/create", formData, axiosConfig).then(res => {
            console.log(res.data);
            source.reset();
            dispatcher(refreshPostingModal());
        })
    }

    const handleSubmit = async () => {
        const form = document.getElementById("posting-form") as HTMLFormElement;
        let formData = new FormData(form);
        formData.append("posting_emoji", emoji)
        await axios.post("/posting/create", formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            // handleClose(e);
            dispatcher(refreshChannel());
        })
        form.reset();
        setProfileImg("default.png");
        setEmoji('');
    }

    const getComments = async () => {
        if (currentChanIdx === 0) return;
        // if(comments.length === 0) return;
        await axios.get(`/comment/getComments?idx=${currentPosting.postingIdx}`, axiosConfig)
            .then(res => {
                setComments(res.data);
            })
    }

    const handleProfile = (writer: string) => {
        dispatcher(setSelectedUser(writer));
        dispatcher(setVisibleProfile(true));
    }

    const handleDelete = async () => {
        const q = confirm("게시물을 삭제하시겠습니까?\n댓글을 포함해 모든 작업은 되돌릴 수 없습니다.");

        if (q) {
            await axios.post(`/posting/delete/${currentPosting.postingIdx}`, null, axiosConfig)
                .then(res => {
                    console.log(res);
                    dispatcher(setVisiblePostingModal(false));
                    dispatcher(refreshChannel());
                })
        }
    }

    const onUpload = async (e: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        console.log("submitting...")
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

    const onPicked = (e: any, data: IEmojiData) => {
        setEmoji(data.emoji);
    }

    //Renders
    const ifNull = (
        <div>
            등록된 댓글이 없습니다.
        </div>
    )

    //UseEffect
    useEffect(() => {
        setModifyMode(false);
        setProfileImg(currentPosting.postingAttach);
        setEmoji(currentPosting.postingEmoji);
        getComments();
    }, [currentPosting, currentWriter, refresh, visible]);

    if (modifyMode)
        return (
            <Modal id={'posting-form'} as={Form} open={visible} style={{textAlign : "center"}} onSubmit={handleSubmit}>
                <Modal.Content image>
                    <Image wrapped src={`http://localhost:8080/upload/${profileImg}`} fluid/>
                </Modal.Content>
                <Modal.Content>
                    <Modal.Description>
                        <Form.Input type={'file'} onChange={onUpload}/>
                        <Form.Input name={'posting_idx'} type={'hidden'} value={currentPosting.postingIdx}/>
                        <Form.Input
                            value={emoji}
                            size={"massive"}
                            name={"posting_emoji"}
                            type={"text"}
                            fluid
                        />
                        <EmojiPicker preload={true} onEmojiClick={onPicked}/>
                        <Form.TextArea
                            name={'posting_content'}
                        >
                            {currentPosting.postingContent}
                        </Form.TextArea>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button type={"submit"}>수정</Button>
                    <Button fluid onClick={()=>setModifyMode(false)}>취소</Button>
                </Modal.Actions>
            </Modal>
        )

    if (!modifyMode)
        return (
            <Modal open={visible} style={{textAlign : "center"}}>
                <Modal.Content image>
                    {currentPosting.postingAttach !== 'default.png' ? <Image wrapped src={`http://localhost:8080/upload/${currentPosting.postingAttach}`}fluid/> : null}
                </Modal.Content>
                <Modal.Content
                    style={{
                        overflow: "auto",
                        whiteSpace: "pre-line",
                        fontSize: "30px",
                    }}
                >
                    {currentPosting.postingContent}
                </Modal.Content>
                <Modal.Header>
                    <span style={{fontSize : "12px"}}>{new Date(currentPosting.postingReg).toDateString()}</span>
                    <span style={{fontSize: "40px", display : "inline-block"}}>{currentPosting.postingEmoji}</span>
                    <Label style={{width : "100%"}} onClick={() => handleProfile(currentWriter.username)} as={'a'} size={"massive"}>
                        <Image src={`http://localhost:8080/upload/${currentWriter.profileImg}`} avatar/>
                        {currentPosting.postingWriter}
                    </Label>
                </Modal.Header>

                <Modal.Content style={{textAlign : "left"}}>
                    <Comment.Group as={Container}>
                        <Header>댓글</Header>
                        {comments ?
                            comments.map((comment, index) => {
                                return (
                                    <PostingComment key={index} comment={comment}/>
                                )
                            }) : ifNull}
                        <Form id={"comment-form"} reply onSubmit={handleCommentSubmit}>
                            <Form.TextArea name={"commentContent"} required/>
                            <Button type={"submit"} content='댓글 남기기' labelPosition='left' icon='edit' primary fluid/>
                        </Form>
                        <Button style={{marginTop: "40px"}} color={"grey"} onClick={handleClose} fluid>닫기</Button>
                        {userInfo.username === currentPosting.postingWriter ?
                            <Button style={{marginTop: "40px"}} color={"red"} onClick={handleDelete} fluid>삭제</Button>
                            : null}
                    </Comment.Group>
                </Modal.Content>
                {/*{userInfo.username === currentPosting.postingWriter ?*/}
                {/*    <Modal.Actions>*/}
                {/*        <Button onClick={()=>setModifyMode(true)}>수정하기</Button>*/}
                {/*    </Modal.Actions>*/}
                {/*: null}*/}
            </Modal>
        )
    else return <></> as JSX.Element
}

export default PostingModal;