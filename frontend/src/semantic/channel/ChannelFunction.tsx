import React from 'react';
import {Button, Container, Form, Input, Segment} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {setPostingCreatorDimming} from "../../redux/reducer/dmmingReducer";

const ChannelFunction = () => {

    //Redux
    const dispatcher = useDispatch();

    const handleCreator = () => {
        dispatcher(setPostingCreatorDimming(true));
    }

    return (
        <Segment inverted>
            <Button style={{marginRight : "20px"}} size={"mini"} color={"facebook"} onClick={handleCreator}>글쓰기</Button>
            <Form style={{display : "inline"}}>
                <Input size={"mini"} icon={"search"} type={"text"}/>
                <Button size={"mini"}>검색</Button>
            </Form>
        </Segment>
    )
}

export default ChannelFunction;