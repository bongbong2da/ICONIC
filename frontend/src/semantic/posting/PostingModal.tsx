import React, {useEffect, useState} from 'react';
import {Button, Comment, Container, Form, Grid, Header, Image, Label, Segment} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {setVisiblePostingModal, setVisibleProfile} from "../../redux/reducer/visibleReducer";
import axios from "axios";
import PostingComment, {CommentTypes} from "./PostingComment";
import {refreshChannel, refreshPostingModal} from "../../redux/reducer/refreshReducer";
import {setSelectedUser} from "../../redux/reducer/userActions";

'use strict';

const PostingModal = () => {

    //Variables
    const axiosConfig = {
        headers : {
            "Authorization" : `Bearer ${sessionStorage.getItem("token")}`
        }
    }

    //States
    const [comments, setComments] = useState([] as CommentTypes[]);
    const [modifyMode, setModifyMode] = useState(false);

    //Redux
    const dispatcher = useDispatch();
    const currentPosting = useSelector((state : RootState) => state.posting.postingCurrent);
    const currentPostingIdx = useSelector((state : RootState) => state.channelIdx.idx);
    const currentWriter = useSelector((state : RootState) => state.posting.postingWriter);
    const userInfo = useSelector((state : RootState) => state.userInfo.userInfo);
    const refresh = useSelector((state : RootState) => state.refresh.refreshPostingModal);

    //Methods
    const handleClose = () => {
        dispatcher(setVisiblePostingModal(false));
    }

    const handleSubmit = async () => {
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

    const getComments = async () => {
        if(currentPostingIdx === 0) return;
        console.log("GET_COMMENTS");
        // if(comments.length === 0) return;
        await axios.get(`/comment/getComments?idx=${currentPosting.postingIdx}`,axiosConfig)
            .then(res => {
                setComments(res.data);
            })
    }

    const handleProfile = (writer : string) => {
        dispatcher(setSelectedUser(writer));
        dispatcher(setVisibleProfile(true));
    }

    const handleDelete = async () => {
        const q = confirm("게시물을 삭제하시겠습니까?\n댓글을 포함해 모든 작업은 되돌릴 수 없습니다.");

        if(q) {
            await axios.post(`/posting/delete/${currentPosting.postingIdx}`,null,axiosConfig)
                .then(res => {
                    console.log(res);
                    dispatcher(setVisiblePostingModal(false));
                    dispatcher(refreshChannel());
                })
        }
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
        getComments();
    },[currentPosting, currentWriter, refresh]);

    if(modifyMode)
        return (
            <Grid as={Segment} textAlign={"left"} style={{width : "70vw", color : "black"}}>
                <Grid.Row>
                    <Grid.Column style={{width : "50%", height : "100%"}}>
                        <Segment>
                            <Form.Input value={currentPosting.postingTitle} fluid/>
                        </Segment>
                        <Segment>
                            <Image style={{width : "100%"}} src={`/upload/images/${currentPosting.postingAttach}`} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column textAlign={"center"} style={{width : "50%", height : "100%"}}>
                        <Segment>
                            <span>{new Date(currentPosting.postingReg).toDateString()}</span>
                            <Segment style={{marginBottom : "10px"}}>
                                <p style={{fontSize : "80px"}}>{currentPosting.postingEmoji}</p>
                                <Label onClick={()=>handleProfile(currentWriter.username)} as={'a'} size={"massive"}>
                                    <Image src={`/upload/images/${currentWriter.profileImg}`} avatar/>
                                    {currentPosting.postingWriter}
                                </Label>
                            </Segment>
                            <Form.TextArea style={{width : "100%", overflow : "auto", whiteSpace : "pre-line", fontSize : "16px", textAlign : "left"}}>
                                {currentPosting.postingContent}
                            </Form.TextArea>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Segment style={{width : "100%", padding: "10px"}}>
                        <Comment.Group as={Container}>
                            <Header>댓글</Header>
                            {comments?
                                comments.map((comment, index) => {
                                    return (
                                        <PostingComment key={index} comment={comment}/>
                                    )
                                }) : ifNull}
                            <Form id={"comment-form"} reply onSubmit={handleSubmit}>
                                <Form.TextArea name={"commentContent"} required/>
                                <Button type={"submit"} content='댓글 남기기' labelPosition='left' icon='edit' primary fluid/>
                            </Form>
                            <Button style={{marginTop : "40px"}} color={"red"} onClick={handleClose} fluid>닫기</Button>
                            <Button style={{marginTop : "40px"}} color={"red"} onClick={handleDelete} fluid>변경</Button>
                        </Comment.Group>
                    </Segment>
                </Grid.Row>
            </Grid>
        )

    if(!modifyMode)
        return (
            <Grid as={Segment} textAlign={"left"} style={{width : "70vw", color : "black"}}>
                <Grid.Row>
                    <Grid.Column style={{width : "50%", height : "100%"}}>
                        <Segment>
                            <Header>{currentPosting.postingTitle}</Header>
                        </Segment>
                        <Segment>
                            <Image style={{width : "100%"}} src={`/upload/images/${currentPosting.postingAttach}`} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column textAlign={"center"} style={{width : "50%", height : "100%"}}>
                        <Segment>
                            <span>{new Date(currentPosting.postingReg).toDateString()}</span>
                            <Segment style={{marginBottom : "10px"}}>
                                <p style={{fontSize : "80px"}}>{currentPosting.postingEmoji}</p>
                                <Label onClick={()=>handleProfile(currentWriter.username)} as={'a'} size={"massive"}>
                                    <Image src={`/upload/images/${currentWriter.profileImg}`} avatar/>
                                    {currentPosting.postingWriter}
                                </Label>
                            </Segment>
                            <Segment style={{width : "100%", overflow : "auto", whiteSpace : "pre-line", fontSize : "16px", textAlign : "left"}}>
                                {currentPosting.postingContent}
                            </Segment>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Segment style={{width : "100%", padding: "10px"}}>
                    <Comment.Group as={Container}>
                        <Header>댓글</Header>
                        {comments?
                        comments.map((comment, index) => {
                            return (
                                <PostingComment key={index} comment={comment}/>
                            )
                        }) : ifNull}
                        <Form id={"comment-form"} reply onSubmit={handleSubmit}>
                            <Form.TextArea name={"commentContent"} required/>
                            <Button type={"submit"} content='댓글 남기기' labelPosition='left' icon='edit' primary fluid/>
                        </Form>
                        <Button style={{marginTop : "40px"}} color={"grey"} onClick={handleClose} fluid>닫기</Button>
                        {userInfo.username === currentPosting.postingWriter ?
                            <Button style={{marginTop: "40px"}} color={"red"} onClick={handleDelete} fluid>삭제</Button>
                        : null}
                    </Comment.Group>
                    </Segment>
                </Grid.Row>
            </Grid>
        )
    else return <></> as JSX.Element
}

export default PostingModal;