import React, {useEffect} from "react";
import 'semantic-ui-css/semantic.min.css';
import Main from "./semantic/layout/Main";
import SignIn from "./semantic/user/SignIn";
import AuthChecker from "./semantic/user/AuthChecker";
import {Button, Dimmer, Loader} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {RootState} from "./redux/rootReducer";
import axios from "axios";

const App = () => {

    //Redux
    const loadingRedirect = useSelector((state : RootState) => state.loading.redirect);

    //axios config
    axios.defaults.baseURL = "http://218.154.12.199:8080";

    AuthChecker();

    useEffect(() => {
        console.log("RENDERING_APP");
    },[loadingRedirect]);

    return (
        <Dimmer.Dimmable dimmed={loadingRedirect}>
            <Dimmer active={loadingRedirect}>
                <Loader size={"massive"} active={loadingRedirect}/>
            </Dimmer>
            <Main/>
            <SignIn/>
        </Dimmer.Dimmable>
    )
}

export default App;