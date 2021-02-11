import React, {useState} from 'react';
import {Container, Grid, Header, Menu, Segment, Sidebar} from "semantic-ui-react";
import "../style.less";

const Main = () => {

    const [visible, setVisible] = useState(false);

    return (
        <Grid columns={2}>
            <Grid.Row as={Menu} style={{margin: "20px"}} inverted>
                <Menu.Item as={"a"}>
                    🏄🏻ICONIC
                </Menu.Item>
                <Menu.Item as={"a"}>
                    친구 🙋🏾
                </Menu.Item>
                <Menu.Item as={"a"}>
                    공개 채널 🌏
                </Menu.Item>
                <Menu.Item as={"a"}>
                    도움말 👨🏻‍🔧
                </Menu.Item>
                <Menu.Menu position={"right"}>
                    <Menu.Item as={"a"}>
                        Sign-In
                    </Menu.Item>
                    <Menu.Item as={"a"}>
                        Sign-Up
                    </Menu.Item>
                </Menu.Menu>
            </Grid.Row>
            <Sidebar.Pushable as={Container} style={{width : "100%", margin : "10px"}}>
                <Sidebar as={Menu}
                         style={{padding:20, marginLeft : "10px"}}
                         visible={true}
                         animation={"push"}
                         inverted
                         vertical
                >
                    <Menu.Item as={'a'}>
                        sidebar menu
                    </Menu.Item>
                    <Menu.Item as={'a'}>
                        sidebar menu 2
                    </Menu.Item>

                </Sidebar>
            <Sidebar.Pusher>
                <Container>
                {/*<Grid.Row style={{marginLeft : "10px"}} stretched>*/}
                {/*    <Grid.Column width={"12"} textAlign={"center"}>*/}
                        <Header size={"large"}>This is test header</Header>
                        <p>this is test paragraph</p>
                {/*    </Grid.Column>*/}
                {/*</Grid.Row>*/}
                </Container>
            </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Grid>
    )
}

export default Main;