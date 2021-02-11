import React, {FormEvent, useEffect, useState} from 'react';
import {Button, Dimmer, Form, FormProps, Grid, Header, Message, Segment} from "semantic-ui-react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {loginStatus, saveToken, saveUID, saveUserinfo} from "../../redux/reducer/userActions";
import {RootState} from "../../redux/rootReducer";

const SignIn = () => {

    //States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    //Redux
    const dispatcher = useDispatch();
    const isLogin = useSelector((state: RootState) => state.loginsStatus.isLoggedIn);

    //Storage Data
    const uid = sessionStorage.getItem("uid");
    const token = sessionStorage.getItem("token");

    //Login Method
    const login = (e: FormEvent<HTMLFormElement>, values: FormProps) => {
        setLoading(true);
        axios.post("http://localhost:8080/user/signin", {username: username, password: password}, {})
            .then(res => {
                console.log(res.data);
                const uid = res.data.username;
                const token = res.data.token;
                sessionStorage.setItem("uid", uid);
                sessionStorage.setItem("token", token);
                setLoading(false);
                dispatcher(saveUID(uid));
                dispatcher(saveToken(token));
                dispatcher(loginStatus(true));
                dispatcher(saveUserinfo(JSON.stringify(res.data)));
            })
            .catch(e => {
                console.log(e.data);
                alert("LoginFailed");
                setLoading(false);
            });
    }

    //Use Effect
    useEffect(() => {
    }, [isLogin]);

    //Rendering
    if (!isLogin) {
        return (
            <Grid textAlign={"center"} style={{height: "100vh"}}>
                <Grid.Column style={{maxWidth: 450, marginTop: 150}}>
                    <Header>
                        🏄🏻 ICONIC
                    </Header>
                    <Form
                        onSubmit={login}
                        loading={loading}
                    >
                        <Dimmer.Dimmable as={Segment} dimmed={loading} stacked>
                            <Form.Input fluid icon={'user'} iconPosition={"left"} label={"Username"} name="username"
                                        onChange={(e, {value}) => setUsername(value)}>

                            </Form.Input>
                            <Form.Input fluid icon={'lock'} iconPosition={"left"} label={"Password"} type={"password"}
                                        name="password" onChange={(e, {value}) => setPassword(value)}>

                            </Form.Input>
                            <Form.Button size={"large"} type={"submit"} color={"facebook"}>
                                Login
                            </Form.Button>
                        </Dimmer.Dimmable>
                    </Form>
                    <Message style={{width: "100%", textAlign: "right"}}>
                        <Button as={'a'} color={"linkedin"}>
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