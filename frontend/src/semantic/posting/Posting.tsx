import React, {useEffect, useState} from 'react';
import {Card, Divider, Grid, Image, Label} from "semantic-ui-react";
import {ProfileTypes, setSelectedUser} from "../../redux/reducer/userActions";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setDimming, setVisiblePostingModal, setVisibleProfile} from "../../redux/reducer/visibleReducer";
import {setPostingCurrent, setPostingWriter} from "../../redux/reducer/postingReducer";

export type PostingTypes = {
    postingIdx: number
    postingCount: number
    postingChanIdx: number
    postingTitle: string
    postingWriter: string
    postingEmoji: string
    postingContent: string
    postingIsAttached: string
    postingAttach: string
    postingReg: string
}

type PostingProps = {
    posting: PostingTypes;
}

const Posting = ({posting}: PostingProps) => {

    //States
    const [post, setPost] = useState(posting as PostingTypes);
    const [writer, setWriter] = useState({} as ProfileTypes);
    const [isNew, setIsNew] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0);

    //Redux
    const dispatcher = useDispatch();

    //Methods
    const handleClickProfile = (targetUser: string) => {
        dispatcher(setSelectedUser(targetUser));
        dispatcher(setDimming(true));
        dispatcher(setVisibleProfile(true));
    }

    const handleClickPosting = () => {
        dispatcher(setPostingCurrent(posting));
        dispatcher(setPostingWriter(writer));
        dispatcher(setVisiblePostingModal(true));
    }

    const getCommentCounts = () => {
        axios.get(`comment/getCommentsCount?idx=${posting.postingIdx}`)
            .then(res => {
                setCommentsCount(res.data);
            })
    }

    //UseEffect
    useEffect(() => {
        axios.get(`/user/getProfile?username=` + decodeURI(posting.postingWriter))
            .then(res => {
                setWriter(res.data);
            })

        let yesterday = new Date();
        yesterday = new Date(yesterday.getTime() + (1000 * 60 * 60 * 24 * -1));
        const regDate = new Date(posting.postingReg);

        if (regDate > yesterday) setIsNew(true);

        getCommentCounts();

    }, [post]);

    return (
        <Card style={{height: "400px", margin: "10px", overflow: "auto"}} key={posting.postingIdx}
              onClick={handleClickPosting}>
            {post.postingIsAttached === 'y' && post.postingAttach !== "default.png" ?
                <>
                    <Image
                        src={posting.postingAttach ?
                            `/upload/images/${posting.postingAttach}`
                            : `/upload/images/default.png`
                        }
                        wrapped
                        ui={false}
                        size={"medium"}
                        rounded
                    />
                </>
                : null}
            <Card.Content>
                <Card.Header>
                    {posting.postingEmoji ? <p style={{fontSize: '50px'}}>{posting.postingEmoji}</p> : <p/>}
                    <Grid columns={commentsCount !== 0 && isNew ? 2 : 1} stackable>
                            {isNew ?
                                <Grid.Column>
                                <Label style={{width : "100%"}} color={"red"}>NEW 🌟</Label>
                                </Grid.Column>
                                : null}
                            {commentsCount !== 0 ?
                                <Grid.Column>
                                <Label style={{width : "100%"}} color={"teal"}>댓글 {commentsCount}개 🦜</Label>
                                </Grid.Column>
                                : null}
                    </Grid>
                </Card.Header>
                    <Card.Meta>
                        <Label style={{width : "100%", marginBottom : "10px", marginTop : "10px"}} size={"large"} color={"purple"}>
                            <Image src={writer.profileImg ? `/upload/images/${writer.profileImg}` : null} avatar/>
                            <span onClick={() => handleClickProfile(posting.postingWriter)}>{posting.postingWriter}</span>
                        </Label>
                        <br/>
                        {new Date(posting.postingReg).toDateString()}
                    </Card.Meta>
                <Divider/>
                <Card.Description style={{fontSize : "20px", whiteSpace : "pre-line"}}>
                    {posting.postingContent}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Posting;