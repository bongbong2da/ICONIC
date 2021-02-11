import React, {useEffect, useState} from 'react';
import {Button, Divider, Form, Input, Modal} from 'antd';
import {Uploader} from "../modules/Uploader";
import axios from "axios";

type SignUpTypes = {
    visible : boolean;
    setIsSignUpVisible : any;
}

export const SignUp = ({visible, setIsSignUpVisible} : SignUpTypes) => {

    const handleVisible = () => {
        let username = document.getElementById("signUpUsername") as any;
        let password = document.getElementById("signUpPassword") as any;
        if(username.value) username.value = "";
        if(password.value) password.value = "";
        setIsSignUpVisible(!visible);
    }

    useEffect(() => {
    }, []);

    const [profileImg, setProfileImg] = useState('default.png');

    function confirmSignUp() {
        setIsSignUpVisible(!visible);

        const source = document.getElementById("signUpForm") as HTMLFormElement;

        let formData = new FormData(source);

        if(profileImg) formData.append("profile_img", profileImg);

        let query = {};

        formData.forEach((value, key) => {
            console.log(`value : ${value} , key : ${key}`);
            // @ts-ignore
            query[key] = value;
        })

        axios.put("http://localhost:8080/user/signup", query , {
            headers : {
                "Content-type" : "application/json"
            }
        })
            .then(res => {
                alert(res.data);
            })
            .catch(res => {
                console.log(res.data);
            })

        // window.location.reload();
    }

    const onFinish = (values : any) => {
        axios.put("http://localhost:8080/user/signup", values, {})
            .then(res => {
                if(res.data === 'REGISTERED') {
                    alert("가입이 완료되었습니다.");
                    window.location.reload();
                }
            });
    }

    return (
        <Modal
            visible={visible}
            onCancel={handleVisible}
            okButtonProps={{style : {display : "none"}}}
            cancelButtonProps={{style : {display : "none"}}}
        >
            <Form
                id='signUpForm'
                style={{
                }}
                action="http://localhost:8080/user/signup"
                method="put"
                onFinish={onFinish}
                initialValues={{"profile_img" : profileImg}}
            >
                <h2>Sign-Up</h2>
                <Divider/>
                <Form.Item
                    label={"Username"}
                    name={"username"}
                    rules={[{required : true, message : "Enter your username(ID)"}]}
                >
                    <Input
                        id={"signUpUsername"}
                    />
                </Form.Item>
                <Form.Item
                    label={"Password"}
                    name={"password"}
                    rules={[{required : true, message : "Enter your username(ID)"}]}
                >
                    <Input.Password
                        id={"signUpPassword"}
                    />
                </Form.Item>
                <Form.Item
                    name={"profile_img"}
                    >
                    <Input hidden/>
                </Form.Item>
                <Uploader url={"http://localhost:8080/images/" + profileImg} setUrl={setProfileImg}/>
                <Button htmlType="submit">Sign-Up</Button>
            </Form>
        </Modal>
    )
}