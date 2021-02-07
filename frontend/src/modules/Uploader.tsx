import React, {useState} from 'react';
import {Button, Form, Upload} from 'antd';
import {LoadingOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";

type UploaderTypes = {
    url : string
    setUrl : any
}

export const Uploader = ({url, setUrl} : UploaderTypes) => {

    const [loading, setLoading] = useState(false);

    const props = {
        name: 'multipartFile',
        action : 'http://localhost:8080/upload/preUpload',
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    const handleChange = (info : any) => {
        console.log(info);
        console.log(info.file?.response);
        setUrl(info.file?.response);
    }


    return (
        <Form>
            <Upload {...props} method={'POST'} listType={'picture-card'} onChange={handleChange}>
                {url ? <img style={{width : "100%"}} src={url}/> : uploadButton}
            </Upload>
        </Form>
    )

}