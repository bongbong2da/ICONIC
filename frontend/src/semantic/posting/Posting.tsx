import React, {useEffect, useState} from 'react';
import {Card, Container, Divider, Grid, Image} from "semantic-ui-react";
import {ProfileTypes, setSelectedUser} from "../../redux/reducer/userActions";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setDimmable, setProfileDimming} from "../../redux/reducer/dmmingReducer";

export type PostingTypes = {
    postingIdx: number
    postingCount: number
    postingChanIdx : number
    postingTitle: string
    postingWriter: string
    postingEmoji: string
    postingContent: string
    postingIsAttached: string
    postingAttach: string
    postingReg: string
}

type PostingProps = {
    posting : PostingTypes;
}

const Posting = ({posting} : PostingProps) => {

    //States
    const [post, setPost] = useState(posting as PostingTypes);
    const [writer, setWriter] = useState({} as ProfileTypes);

    //Redux
    const dispatcher = useDispatch();

    //Methods
    const handleClickProfile = (targetUser : string) => {
        dispatcher(setSelectedUser(targetUser));
        dispatcher(setDimmable(true));
        dispatcher(setProfileDimming(true));
    }

    //UseEffect
    useEffect(() => {
        axios.get(`http://localhost:8080/user/getProfile?username=` + decodeURI(posting.postingWriter))
            .then(res => {
                setWriter(res.data);
            })
    },[]);

    return (
        <Card style={{height : "500px",margin : "10px", overflow : "auto"}} key={posting.postingIdx} inverted>
            <Card.Content>
                <Card.Header>
                    {posting.postingTitle}
                </Card.Header>
            </Card.Content>
            {post.postingIsAttached === 'y' ?
            <Image
                as={'a'}
                src={post.postingAttach?
                    `http://localhost:8080/upload/images/${post.postingAttach}`
                    : `http://localhost:8080/upload/images/default.png`
                }
                href={`http://localhost:8080/upload/images/${post.postingAttach}`}
                wrapped
                ui={false}
                size={"medium"}
                rounded
            />
            : null}
            <Divider style={{fontSize : '50px'}} horizontal>{posting.postingEmoji}</Divider>
            <Card.Content>
                <Card.Header as={Container}>
                    <Image src={writer.profileImg ? `http://localhost:8080/upload/images/${writer.profileImg}` : null} avatar/>
                    <a onClick={()=>handleClickProfile(posting.postingWriter)}>{posting.postingWriter}</a>
                </Card.Header>
                <Card.Meta>
                    {new Date(posting.postingReg).toDateString()}
                </Card.Meta>
                <Card.Description>
                        {posting.postingContent}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Posting;