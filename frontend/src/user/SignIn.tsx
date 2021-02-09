import React, {useEffect} from 'react';
import {Divider, Form, Input, Modal} from 'antd';
import axios from "axios";

type SignInTypes = {
    visible : boolean;
    setIsSignInVisible : any;
    state : any;
}

const SignIn = ({visible, setIsSignInVisible, state} : SignInTypes) => {

    const handleVisible = () => {
        let username = document.getElementById("signInUsername") as any;
        let password = document.getElementById("signInPassword") as any;
        if(username.value) username.value = "";
        if(password.value) password.value = "";
        setIsSignInVisible(!visible);
    }

    useEffect(() => {
    }, []);

    function confirmSignIn() {
        const idNode = document.getElementById("signInUsername")as any;
        const passNode = document.getElementById("signInPassword")as any;

        let query = {username : idNode.value,
                    password : passNode.value
        }
        const response = axios.post("http://localhost:8080/user/signin", query)
            .then(res => {
                const data = res.data;
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("uid", idNode.value);
                console.log("Login Success");
                window.location.reload();
            });
    }

    /* Upload Configuration */

    return (
        <Modal
            visible={visible}
            onCancel={handleVisible}
            okText={"Sign-In"}
            onOk={confirmSignIn}
            okButtonProps={{htmlType : "submit"}}
        >
            <Form
                style={{
                }}
            >
                <h2>Sign-In</h2>
                <Divider/>
                <Form.Item
                    label={"Username"}
                    name={"username"}
                    rules={[{required : true, message : "Enter your username(ID)"}]}
                >
                    <Input
                        id={"signInUsername"}
                    />
                </Form.Item>
                <Form.Item
                    label={"Password"}
                    name={"password"}
                    rules={[{required : true, message : "Enter your username(ID)"}]}
                >
                    <Input.Password
                        id={"signInPassword"}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

const mapStateToProps = (state : any) => {
    return {
        value : state.UPDATE_LOGIN_STATUS.value
    }
}

export default SignIn;