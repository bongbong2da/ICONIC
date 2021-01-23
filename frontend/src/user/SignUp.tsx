import React, {useEffect, useState} from 'react';
import {Form, Input, Modal} from 'antd';

type SignUpTypes = {
    visible : boolean
}

export const SignUp = ({visible} : SignUpTypes) => {

    const [isVisible, setIsVisible] = useState(false);

    const handleVisible = () => {
        setIsVisible(!isVisible);
    }

    useEffect(() => {
        setIsVisible(visible);
    }, []);

    return (
        <Modal visible={isVisible} onCancel={handleVisible}>
            <Form
                style={{
                }}
            >
                <Form.Item
                    label={"Username"}
                    name={"username"}
                    rules={[{required : true, message : "Enter your username(ID)"}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    )
}