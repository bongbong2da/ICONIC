import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Card, Form, FormTextArea, Grid, Icon, Image, Input, InputOnChangeData} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import EmojiPicker, {IEmojiData} from "emoji-picker-react";
import axios from "axios";
import {setDimmable, setDimmingPostingCreator} from "../../redux/reducer/dmmingReducer";
import {refreshChannel} from "../../redux/reducer/refreshReducer";
import {setLoadingRedirect} from "../../redux/reducer/loadingReducer";

const PostingCreator = () => {

    //States
    const [emoji, setEmoji] = useState('');
    const [profileImg, setProfileImg] = useState("default.png");

    //Redux
    const creatorDimming = useSelector((state: RootState) => state.dimming.postingCreatorDimming);
    const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
    const currentChanIdx = useSelector((state : RootState) => state.channelIdx.idx);
    const dispatcher = useDispatch();

    //Variables
    const token = sessionStorage.getItem("token");

    //UseEffect
    useEffect(() => {

    },[emoji]);

    //Methods
    const handleClose = () => {
        dispatcher(setDimmingPostingCreator(false));
    }

    const onPicked = (e: any, data: IEmojiData) => {
        setEmoji(data.emoji);
    }

    const onUpload = async (e: ChangeEvent<HTMLInputElement>, data : InputOnChangeData) => {
        let formData = new FormData();
        if(e.target.files) {
            console.log(e.target.files[0]);
            formData.append("multipartFile", e.target.files[0]);
            await axios.post("/upload/uploadImage", formData, {
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

    const handleSubmit = async (e : any) => {
        const form = document.getElementById("posting-form") as HTMLFormElement;
        let formData = new FormData(form);
        formData.append("posting_emoji", emoji)
        await axios.post("/posting/create", formData, {
            headers : {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        }).then(res => {
            handleClose();
            dispatcher(refreshChannel());
            console.log(res.data);
        })
        form.reset();
        setProfileImg("default.png");
        setEmoji('');
    }

    return (
        <div>

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
                    <Card.Header>
                    </Card.Header>
                    <Card.Content>
                        <Card.Description>
                            <Image src={`/upload/images/${profileImg}`}/>
                            <Input name={"upload"} type={"file"} onChange={onUpload}/>
                            <p>오늘의 기분은?</p>
                            <Input
                                style={{
                                    width: "70px"
                                }}
                                value={emoji}
                                size={"huge"}
                                name={"posting_emoji"}
                                type={"text"}
                                disabled
                            />
                            <Input name={"posting_chan_idx"} type={"hidden"} value={currentChanIdx}/>
                            <Input name={"posting_attach"} type={"hidden"} id={"posting-attach"} value={profileImg}/>
                            <Input name={"posting_isAttached"} type={"hidden"} id={"posting-isAttached"} value={'y'}/>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Card.Description>
                            <EmojiPicker preload={true} pickerStyle={{width: "100%"}} onEmojiClick={onPicked}/>
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
                    <Card.Content extra>
                        <Button onClick={()=>handleClose()}>닫기</Button>
                    </Card.Content>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default PostingCreator;