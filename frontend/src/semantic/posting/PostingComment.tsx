import React from 'react';
import {Comment} from "semantic-ui-react";

type PostingCommentProps = {
    comment : CommentTypes
}

export type CommentTypes = {
    commentIdx : number
    postingIdx : number
    commentWriter : string
    commentEmoji : string
    commentContent : string
    commentReg : object
}

const PostingComment = ({comment} : PostingCommentProps) => {
    return (
        <Comment>
            <Comment.Avatar src={`http://localhost:8080/upload/images/default.png`}/>
            <Comment.Content>
                <Comment.Author>{comment.commentWriter}</Comment.Author>
                <Comment.Text>
                    {comment.commentContent}
                </Comment.Text>
            </Comment.Content>
        </Comment>
    )
}

export default PostingComment;