import React, {useEffect, useState} from 'react';
import {Comment, Segment} from "semantic-ui-react";
import AxiosCustomConfig from "../../configuration/AxiosCustomConfig";
import axios from "axios";
import {ProfileTypes} from "../../redux/reducer/userActions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {refreshPostingModal} from "../../redux/reducer/refreshReducer";

type PostingCommentProps = {
    comment : CommentTypes
}

export type CommentTypes = {
    commentIdx : number
    postingIdx : number
    commentWriter : string
    commentEmoji : string
    commentContent : string
    commentReg : string
}

const PostingComment = ({comment} : PostingCommentProps) => {

    //States
    const [commentWriter, setCommentWriter] = useState({} as ProfileTypes);

    //Redux
    const dispatcher = useDispatch();
    const userInfo = useSelector((state : RootState) => state.userInfo.userInfo);

    //Methods
    const getCommentWriterData = () => {
        axios.get(`/user/getProfile?username=${comment.commentWriter}`)
            .then(res => {
                // console.log(res.data);
                setCommentWriter(res.data);
            })
    }

    const handleDelete = () => {
        const q = confirm("댓글을 삭제하시겠습니까?");

        if (q) {
            axios.post(`/comment/delete/${comment.commentIdx}`,null,{headers:{"Authorization":"Bearer " + sessionStorage.getItem("token")}})
                .then(res => {
                    console.log(res.data);
                    dispatcher(refreshPostingModal());
                })
        }
    }

    //UseEffect
    useEffect(() => {
       getCommentWriterData();
    },[userInfo]);

    return (
        <Comment as={Segment}>
            <Comment.Avatar as={'a'} src={commentWriter.profileImg? `/upload/images/${commentWriter.profileImg}` : '/upload/images/default.png'}/>
            <Comment.Content>
                <Comment.Author as={'a'} content={comment.commentWriter}/>
                <Comment.Metadata content={new Date(comment.commentReg).toDateString()}/>
                <Comment.Text>
                    <p>{comment.commentContent}</p>
                </Comment.Text>
                <Comment.Actions>
                    {comment.commentWriter === userInfo.username ?
                        <Comment.Action onClick={handleDelete}>DELETE</Comment.Action>
                    : null}
                </Comment.Actions>
            </Comment.Content>
        </Comment>
    )
}

export default PostingComment;