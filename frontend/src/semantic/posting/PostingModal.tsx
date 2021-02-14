import React, {useEffect, useState} from 'react';
import {Button, Comment, Container, Form, Grid, Header, Image, Label, Segment, TextArea} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {setDimmingPostingModal} from "../../redux/reducer/dmmingReducer";
import axios from "axios";
import PostingComment, {CommentTypes} from "./PostingComment";
import {refreshPostingModal} from "../../redux/reducer/refreshReducer";

const PostingModal = () => {

    //Variables
    const axiosConfig = {
        headers : {
            "Authorization" : `Bearer ${sessionStorage.getItem("token")}`
        }
    }

    //States
    const [comments, setComments] = useState([] as CommentTypes[]);

    //Redux
    const dispatcher = useDispatch();
    const postingModalDimming = useSelector((state : RootState) => state.dimming.postingModalDimming);
    const currentPosting = useSelector((state : RootState) => state.posting.postingCurrent);
    const currentWriter = useSelector((state : RootState) => state.posting.postingWriter);
    const userInfo = useSelector((state : RootState) => state.userInfo.userInfo);
    const refresh = useSelector((state : RootState) => state.refresh.refreshPostingModal);

    //Methods
    const handleClose = () => {
        dispatcher(setDimmingPostingModal(false));
    }

    const handleSubmit = () => {
        const source = document.getElementById("comment-form") as HTMLFormElement;
        const formData = new FormData(source);
        formData.append("commentWriter", userInfo.username);
        formData.append("postingIdx", currentPosting.postingIdx);
        formData.append("commentEmoji", "*");

        axios.post("http://localhost:8080/comment/create", formData, axiosConfig).then(res => {
            console.log(res.data);
            source.reset();
            dispatcher(refreshPostingModal());
        })
    }

    const getComments = () => {
        axios.get(`http://localhost:8080/comment/getComments?idx=${currentPosting.postingIdx}`,axiosConfig)
            .then(res => {
                console.log(res.data);
                setComments(res.data);
            })
    }

    //UseEffect
    useEffect(() => {
        console.log(currentPosting);
        console.log(currentWriter);
        getComments();
    },[currentPosting, currentWriter, refresh]);

    return (
        <Grid as={Segment} textAlign={"left"} style={{color : "black"}}>
            <Grid.Row>
                <Grid.Column style={{width : "50%", height : "100%"}}>
                    <Segment>
                        <Header>{currentPosting.postingTitle}</Header>
                    </Segment>
                    <Segment>
                        <Image style={{width : "100%"}} src={`http://localhost:8080/upload/images/${currentPosting.postingAttach}`} />

                    </Segment>

                </Grid.Column>
                <Grid.Column textAlign={"center"} style={{width : "50%", height : "100%"}}>
                    <Segment>
                        <span>{new Date(currentPosting.postingReg).toDateString()}</span>
                        <Segment style={{marginBottom : "10px"}}>
                            <p style={{fontSize : "80px"}}>{currentPosting.postingEmoji}</p>
                            <Label size={"massive"}>
                                <Image src={`http://localhost:8080/upload/images/${currentWriter.profileImg}`} avatar/>
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
                <Comment.Group as={Container}>
                    <Header>댓글</Header>
                    {comments?
                    comments.map((comment, index) => {
                        return (
                            <PostingComment key={index} comment={comment}/>
                        )
                    }) : null}
                    <Form id={"comment-form"} reply onSubmit={handleSubmit}>
                        <Form.TextArea name={"commentContent"} required/>
                        <Button type={"submit"} content='댓글 남기기' labelPosition='left' icon='edit' primary fluid/>
                    </Form>
                    <Button style={{marginTop : "40px"}} color={"red"} onClick={handleClose} fluid>닫기</Button>
                </Comment.Group>
            </Grid.Row>
        </Grid>
    )
}

export default PostingModal;