import React, {FormEvent, useEffect, useState} from 'react';
import {Button, Dimmer, Form, FormProps, Grid, Header, Message, Segment} from "semantic-ui-react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {loginStatus, saveToken, saveUID, saveUserinfo, UserInfoType} from "../../redux/reducer/userActions";
import {RootState} from "../../redux/rootReducer";
import {setLoadingRedirect} from "../../redux/reducer/loadingReducer";

const SignIn = () => {

    axios.defaults.baseURL="http://iconic-backend.herokuapp.com"

    //States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    //Redux
    const dispatcher = useDispatch();
    const isLogin = useSelector((state : RootState) => state.loginsStatus.isLoggedIn);
    const loadingRedirect = useSelector((state : RootState) => state.loading.redirect);

    //Storage Data
    const uid = sessionStorage.getItem("uid");
    const token = sessionStorage.getItem("token");

    //Login Method
    const login = (e: FormEvent<HTMLFormElement>, values: FormProps) => {
        dispatcher(setLoadingRedirect(true));
        axios.post("/user/signin", {username: username, password: password}, {})
            .then(res => {
                console.log(res.data);
                const uid = res.data.username;
                const token = res.data.token;
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                sessionStorage.setItem("uid", uid);
                sessionStorage.setItem("token", token);
                setLoading(false);
                dispatcher(saveUID(uid));
                dispatcher(saveToken(token));
                dispatcher(loginStatus(true));
                dispatcher(saveUserinfo(res.data as UserInfoType));
                dispatcher(setLoadingRedirect(false));
            })
            .catch(e => {
                console.log(e.data);
                alert("LoginFailed");
                dispatcher(setLoadingRedirect(false));
            });
    }

    const handleSignUp = () => {
        window.location.href = "http://iconic-frontend.herokuapp.com/signup";
    }

    //Use Effect
    useEffect(() => {
    }, []);

    //Rendering
    if (!isLogin) {
        return (
            <Grid textAlign={"center"} style={{height: "100vh"}}>
                <Grid.Column style={{maxWidth: 450, marginTop: 150}}>
                    <Header as={'a'} color={"teal"}>
                        🏄🏻 ICONIC
                    </Header>
                    <Form
                        onSubmit={login}
                    >
                        <Dimmer.Dimmable as={Segment} stacked>
                            <Form.Input fluid icon={'user'}
                                        iconPosition={"left"}
                                        label={"Username"}
                                        name="username"
                                        onChange={(e, {value}) => setUsername(value)}
                                        type={"text"}
                                        required
                                        placeholder={'아이디를 입력하세요'}
                                        minLength={4}
                            />
                            <Form.Input fluid icon={'lock'}
                                        iconPosition={"left"}
                                        label={"Password"}
                                        type={"password"}
                                        name="password"
                                        onChange={(e, {value}) => setPassword(value)}
                                        minLength={4}
                                        required
                                        placeholder={'비밀번호를 입력하세요'}
                            />
                            <Form.Button fluid size={"large"} type={"submit"} color={"facebook"}>
                                Login
                            </Form.Button>
                        </Dimmer.Dimmable>
                    </Form>
                    <Message style={{width: "100%", textAlign: "right"}}>
                        <Button as={'a'} color={"linkedin"} onClick={handleSignUp}>
                            Sign-Up
                        </Button>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    } else {
        return null as JSX.Element | null;
    }
}

export default SignIn;