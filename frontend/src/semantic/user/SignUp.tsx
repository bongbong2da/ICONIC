import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Button, Dimmer, Form, FormProps, Grid, Header, Message, Segment} from "semantic-ui-react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {loginStatus, saveToken, saveUID, saveUserinfo} from "../../redux/reducer/userActions";
import {RootState} from "../../redux/rootReducer";

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
        setLoading(true);
        axios.put("/user/signup", {username: username, password: password, profile_img : profileImg}, {})
            .then(res => {
                console.log(res.data)
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
            console.log(e.target.files[0]);
            formData.append("multipartFile", e.target.files[0]);
            axios.post("/upload/uploadImage", formData, {
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
                .then(res=>{
                    const imgName = res.data;
                    setProfileImg(imgName.substring(imgName.lastIndexOf("/") + 1, imgName.length));
                    loginStatus(res.data);
                });
        }
    };
    //Use Effect
    useEffect(() => {
    }, [isLogin, profileImg]);

    //Rendering
    if (!isLogin) {
        return (
            <Grid textAlign={"center"} style={{height: "100vh"}}>
                <Grid.Column style={{maxWidth: 450, marginTop: 150}}>
                    <Header>
                        🏄🏻 ICONIC
                    </Header>
                    <Form
                        onSubmit={signUp}
                        loading={loading}
                    >
                        <Dimmer.Dimmable as={Segment} dimmed={loading} stacked>
                            <Form.Input fluid icon={'user'} iconPosition={"left"} label={"Username"} name="username"
                                        onChange={(e, {value}) => setUsername(value)}>

                            </Form.Input>
                            <Form.Input fluid icon={'lock'} iconPosition={"left"} label={"Password"} type={"password"}
                                        name="password" onChange={(e, {value}) => setPassword(value)}>

                            </Form.Input>
                            <Form.Input fluid icon={'lock'}
                                        iconPosition={"left"}
                                        label={"Password"}
                                        type={"file"}
                                        name="password"
                                        onChange={handleUpload}
                            >

                            </Form.Input>
                            <Form.Button size={"large"} type={"submit"} color={"facebook"}>
                                Sign-Up
                            </Form.Button>
                        </Dimmer.Dimmable>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    } else {
        return null as JSX.Element | null;
    }
}

export default SignUp;