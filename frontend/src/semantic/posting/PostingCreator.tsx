import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Form, Grid, Header, Image, Input, InputOnChangeData, Segment} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import EmojiPicker, {IEmojiData} from "emoji-picker-react";
import axios from "axios";
import {setVisiblePostingCreator} from "../../redux/reducer/visibleReducer";
import {refreshChannel} from "../../redux/reducer/refreshReducer";
import CheckMediaType from "../../util/CheckMediaType";

const PostingCreator = () => {

    //States
    const [emoji, setEmoji] = useState('');
    const [profileImg, setProfileImg] = useState("default.png");

    //Redux
    const creatorDimming = useSelector((state: RootState) => state.dimming.postingCreatorVisible);
    const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
    const currentChanIdx = useSelector((state: RootState) => state.channelIdx.idx);
    const dispatcher = useDispatch();

    //Variables
    const token = sessionStorage.getItem("token");

    //UseEffect
    useEffect(() => {

    }, [emoji]);

    //Methods
    const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
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
        formData.append("posting_emoji", emoji)
        await axios.post("/posting/create", formData, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            handleClose(e);
            dispatcher(refreshChannel());
            console.log(res.data);
        })
        form.reset();
        setProfileImg("default.png");
        setEmoji('');
    }

    return (
        <Grid
            textAlign={"center"}
            style={{
                height: "100vh",
                width: "75vw"
            }}
            columns={2}
            as={Form}
            onSubmit={handleSubmit}
            id={"posting-form"}
            stackable
        >
            <Grid.Column
                textAlign={"center"}>
                <Segment inverted>
                    <Header>
                        글쓰기
                    </Header>
                    <Image style={{display : "inline-block"}} src={`/upload/images/${profileImg}`} fluid/>
                    <Input id={"fileInput"} name={"upload"} type={"file"} onChange={onUpload} fluid/>
                    <Header size={"medium"}>오늘의 기분은?</Header>
                    <Form.Input
                        // style={{
                        //     display : "inline-block"
                        // }}
                        value={emoji}
                        size={"massive"}
                        name={"posting_emoji"}
                        type={"text"}
                        disabled
                        fluid
                    />
                    <Input name={"posting_chan_idx"} type={"hidden"} value={currentChanIdx}/>
                    <Input name={"posting_attach"} type={"hidden"} id={"posting-attach"} value={profileImg}/>
                    <Input name={"posting_isAttached"} type={"hidden"} id={"posting-isAttached"} value={'y'}/>
                    <EmojiPicker preload={true} pickerStyle={{width: "100%"}} onEmojiClick={onPicked}/>
                </Segment>
            </Grid.Column>
            <Grid.Column
                // style={{
                //     maxWidth: "50vw",
                //     maxHeight: "90vh",
                //     marginTop: 50,
                //     color: "black"
                // }}
                textAlign={"center"}>
                <Segment inverted>
                    {/*<p>글 제목</p>*/}
                    {/*<Form.Input name={"posting_title"} type={"text"} fluid/>*/}
                    <Form.Input name={"posting_writer"} type={"hidden"} value={userInfo.username}/>
                    <br/>
                    <p>글 내용</p>
                    <Form.TextArea required style={{height: "400px"}} name={"posting_content"}/>
                    <Button type={"submit"} color={"facebook"} fluid>작성하기</Button>
                    <Button onClick={(e) => handleClose(e)} fluid>닫기</Button>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default PostingCreator;