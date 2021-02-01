import React, {useEffect} from 'react';
import {Header} from "./Header";
import {SideBar} from "./SideBar";
import {Content} from "./Content";
import {Layout} from "antd";
import {Footer} from "./Footer";
import {Counter} from "../reduxDemo/Counter";

type MainProps = {}

// const [login, setLogin] = useState(false);
const login = false;
const setLogin = (input : boolean) => input;
export const Main = ({}: MainProps) => {

    useEffect(() => {
        console.log("Login Status : " + login);
        if(localStorage.getItem("token")){
            setLogin(true);
        }
    })

    return (
        <Layout>
            <Counter/>
            {/*<Header/>*/}
            {/*<Layout style={{minHeight : "100vh"}}>*/}
            {/*    <SideBar/>*/}
            {/*    <Layout>*/}
            {/*        <Content/>*/}
            {/*        <Footer/>*/}
            {/*    </Layout>*/}
            {/*</Layout>*/}
        </Layout>
    )

}