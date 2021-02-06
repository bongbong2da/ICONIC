import React from 'react';
import {Button, Form, Upload} from 'antd';
import {UploadOutlined} from "@ant-design/icons";

export const UploadDemo = () => {

    const props = {
        name: 'multipartFile',
        action : 'http://localhost:8080/upload/preUpload',
    };

    return (
        <Form>
            <Upload {...props} method={'POST'} listType={'picture-card'}>
                {/*<Button icon={<UploadOutlined />}>Click to Upload</Button>*/}
            </Upload>
            <Button htmlType='submit'>submit</Button>
        </Form>
    )

}