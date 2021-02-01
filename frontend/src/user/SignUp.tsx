import React, {useEffect} from 'react';
import {Divider, Form, Input, Modal} from 'antd';

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

    function confirmSignUp() {
        alert("Signed - Up !!!");
        setIsSignUpVisible(!visible);
        window.location.reload();
    }

    return (
        <Modal
            visible={visible}
            onCancel={handleVisible}
            okText={"Sign-Up"}
            onOk={confirmSignUp}
        >
            <Form
                style={{
                }}
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
                    <Input
                        id={"signUpPassword"}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}