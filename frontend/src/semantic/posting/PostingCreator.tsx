import React, {ChangeEvent, useEffect, useState} from 'react';
import {
    Button,
    Card,
    Container,
    Form,
    FormTextArea,
    Grid,
    Image,
    Input,
    InputOnChangeData,
    Segment,
    TextArea
} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import EmojiPicker, {IEmojiData} from "emoji-picker-react";
import {loginStatus} from "../../redux/reducer/userActions";
import axios from "axios";
import {setDimmable, setPostingCreatorDimming} from "../../redux/reducer/dmmingReducer";

const PostingCreator = () => {

    //States
    const [emoji, setEmoji] = useState('');
    const [profileImg, setProfileImg] = useState("default.png");

    //Redux
    const dimming = useSelector((state: RootState) => state.dimming.postingCreatorDimming);
    const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
    const currentChanIdx = useSelector((state : RootState) => state.channelIdx.idx);
    const dispatcher = useDispatch();

    //Variables
    const token = sessionStorage.getItem("token");

    //UseEffect
    useEffect(() => {

    }, []);

    //Methods
    const onPicked = (e: any, data: IEmojiData) => {
        setEmoji(data.emoji);
        console.log(emoji);
    }

    const onUpload = (e: ChangeEvent<HTMLInputElement>, data : InputOnChangeData) => {
        let formData = new FormData();
        if(e.target.files) {
            console.log(e.target.files[0]);
            formData.append("multipartFile", e.target.files[0]);
            axios.post("http://localhost:8080/upload/uploadImage", formData, {
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
                .then(res=>{
                    console.log(res.data);
                    const imgName = res.data;
                    const fileName = imgName.substring(imgName.lastIndexOf("/") + 1, imgName.length);
                    setProfileImg(fileName);
                });
        }
    }

    const handleSubmit = (e : any) => {
        const form = document.getElementById("posting-form") as HTMLFormElement;
        let formData = new FormData(form);
        console.log(formData);
        axios.post("http://localhost:8080/posting/create", formData, {
            headers : {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        }).then(res => {
            dispatcher(setDimmable(false));
            dispatcher(setPostingCreatorDimming(false));
            console.log(res.data);
        })
    }

    return (
        <div>
            <Input name={"upload"} type={"file"} onChange={onUpload} fluid/>
            <Grid
                textAlign={"center"}
                style={{
                    height: "100vh",
                    width : "100vw"
                }}
                columns={3}
                as={Form}
                onSubmit={handleSubmit}
                id={"posting-form"}
            >
                <Grid.Column as={Card}
                             style={{
                                 maxWidth: "50vw",
                                 maxHeight: "90vh",
                                 marginTop: 50
                             }}
                             textAlign={"center"}>
                    <Card.Content>
                        <Card.Description>
                            <Image as={'a'}
                                   src={`http://localhost:8080/upload/images/${profileImg}`}
                                   href={`http://localhost:8080/upload/images/${profileImg}`}
                            />
                            <p>오늘의 기분은?</p>
                            <Input
                                style={{
                                    width: "70px"
                                }}
                                value={emoji}
                                size={"huge"}
                                name={"posting_emoji"}
                                type={"text"}
                            />
                            <Input name={"posting_chan_idx"} type={"hidden"} value={currentChanIdx}/>
                            <Input name={"posting_attach"} type={"hidden"} id={"posting-attach"} value={profileImg}/>
                            <Input name={"posting_isAttached"} type={"hidden"} id={"posting-isAttached"} value={'y'}/>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Card.Description>
                            <EmojiPicker pickerStyle={{width: "100%"}} onEmojiClick={onPicked}/>
                        </Card.Description>
                    </Card.Content>
                </Grid.Column>
                <Grid.Column as={Card}
                             style={{
                                 maxWidth: "50vw",
                                 maxHeight: "90vh",
                                 marginTop: 50
                             }}
                             textAlign={"center"}>
                    <Card.Content>
                        <Card.Description>
                            <p>글 제목</p>
                            <Input name={"posting_title"} type={"text"} fluid/>
                            <Input name={"posting_writer"} type={"hidden"} value={userInfo.username}/>
                            <br/>
                            <p>글 내용</p>
                            <FormTextArea style={{height: "400px"}} name={"posting_content"}/>
                            <Button type={"submit"} fluid>작성하기</Button>
                        </Card.Description>
                    </Card.Content>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default PostingCreator;