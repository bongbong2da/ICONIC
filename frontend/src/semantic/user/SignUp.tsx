import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Button, Dimmer, Form, FormProps, Grid, Header, Message, Segment} from "semantic-ui-react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {loginStatus} from "../../redux/reducer/userActions";
import {RootState} from "../../redux/rootReducer";
import CheckMediaType from "../../util/CheckMediaType";

const SignUp = () => {

    //States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profileImg, setProfileImg] = useState('default.png');
    const [loading, setLoading] = useState(false);

    //Redux
    const dispatcher = useDispatch();
    const isLogin = useSelector((state: RootState) => state.loginsStatus.isLoggedIn);

    //Storage Data
    const uid = sessionStorage.getItem("uid");
    const token = sessionStorage.getItem("token");

    //Method
    const signUp = (e: FormEvent<HTMLFormElement>, values: FormProps) => {
        const passwordCheck = validatingPassword();
        if(!passwordCheck) return;
        setLoading(true);
        axios.put("/user/signup", {username: username, password: password, profile_img : profileImg}, {})
            .then(res => {
                console.log(res.data)
                alert("회원가입이 완료되었습니다.");
                window.location.href = "http://218.154.12.199:3000";
            })
            .catch(e => {
                console.log(e.data);
                alert("SIGN_UP_FAILED");
                setLoading(false);
            });
    }

    const handleUpload = (e : ChangeEvent<HTMLInputElement>, values : any) => {
        let formData = new FormData();
        if(e.target.files) {
            formData.append("multipartFile", e.target.files[0]);
            axios.post("/upload/uploadImage", formData, {
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
                .then(res=>{
                    const imgName = res.data;
                    const checked = CheckMediaType(res.data);
                    if(!checked) {
                        const target = document.getElementById("uploadInput") as HTMLInputElement;
                        target.value = "";
                        setProfileImg("default.png");
                    }
                    setProfileImg(imgName.substring(imgName.lastIndexOf("/") + 1, imgName.length));
                    loginStatus(res.data);
                });
        }
    };

    const validatingPassword = () => {
        const first = (document.getElementById("password") as HTMLInputElement);
        const second = (document.getElementById("password-check") as HTMLInputElement);

        if(first.value !== second.value) {
            alert("입력하신 비밀번호가 다릅니다.");
            first.value = '';
            second.value = '';
            first.focus();
            return false;
        }
        return true;
    }

    //Use Effect
    useEffect(() => {
    }, [isLogin, profileImg]);

    //Rendering
    if (!isLogin) {
        return (
            <Grid textAlign={"center"} style={{height: "100vh"}}>
                <Grid.Column style={{maxWidth: 450, marginTop: 150}}>
                    <Header as={'a'} href={"http://218.154.12.199:3000"} color={"teal"}>
                        🏄🏻 ICONIC
                    </Header>
                    <Form
                        onSubmit={signUp}
                        loading={loading}
                    >
                        <Dimmer.Dimmable as={Segment} dimmed={loading} stacked>
                            <Form.Input fluid
                                        icon={'user'}
                                        iconPosition={"left"}
                                        label={"Username"}
                                        name="username"
                                        onChange={(e, {value}) => setUsername(value)}
                                        required
                                        minLength="4"
                            >

                            </Form.Input>
                            <Form.Input fluid
                                        icon={'lock'}
                                        id={'password'}
                                        iconPosition={"left"}
                                        label={"Password"}
                                        type={"password"}
                                        name="password"
                                        onChange={(e, {value}) => setPassword(value)}
                                        required
                                        minLength="4"
                            />
                            <Form.Input fluid
                                        id={'password-check'}
                                        icon={'lock'}
                                        iconPosition={"left"}
                                        label={"Check Again"}
                                        type={"password"}
                                        onChange={(e, {value}) => setPassword(value)}
                                        required
                            />
                            <Form.Input fluid icon={'lock'}
                                        iconPosition={"left"}
                                        label={"Password"}
                                        type={"file"}
                                        name="password"
                                        onChange={handleUpload}
                                        id={"uploadInput"}
                            >

                            </Form.Input>
                            <Form.Button size={"large"} type={"submit"} color={"facebook"}>
                                Sign-Up
                            </Form.Button>
                        </Dimmer.Dimmable>
                    </Form>
                    <Message style={{width: "100%", textAlign: "right"}}>
                        <Button as={'a'} color={"linkedin"} href={'http://218.154.12.199:3000'}>
                            Go Back
                        </Button>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    } else {
        return null as JSX.Element | null;
    }
}

export default SignUp;