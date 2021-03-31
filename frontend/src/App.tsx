import React, {useEffect} from "react";
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/themes/default/assets/fonts/icons.woff2';
import 'semantic-ui-css/themes/default/assets/fonts/icons.woff';
import 'semantic-ui-css/themes/default/assets/fonts/icons.ttf';
import Main from "./semantic/layout/Main";
import SignIn from "./semantic/user/SignIn";
import AuthChecker from "./semantic/user/AuthChecker";
import {Dimmer, Loader} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {RootState} from "./redux/rootReducer";
import axios from "axios";

const App = () => {

    //Redux
    const loadingRedirect = useSelector((state : RootState) => state.loading.redirect);

    //axios config
    axios.defaults.baseURL = "http://iconic-backend.herokuapp.com";

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