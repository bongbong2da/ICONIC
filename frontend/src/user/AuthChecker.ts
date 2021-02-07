import React from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {deleteToken, deleteUID, loginStatus, saveToken} from "./userActions";
import {RootState} from "../redux/rootReducer";

const AuthChecker = () => {
    const dispatcher = useDispatch();

    if(!localStorage.getItem("token")) return;
    const uid = (localStorage.getItem("uid") ? localStorage.getItem("uid") : null);
    const token = (localStorage.getItem("token") ? localStorage.getItem("token") : null);

    axios.post("http://localhost:8080/user/isAuth", null, {
        headers : {
            Authorization : "Bearer " + token
        }
    })
        .then(res => {
            console.log(res.data);
            dispatcher(saveToken(res.data));
            dispatcher(loginStatus(true));
        })
        .catch(res => {
            alert(`JWT 인증 실패 ${res}`);
            dispatcher(deleteToken());
            dispatcher(deleteUID());
            dispatcher(loginStatus(false));
            localStorage.removeItem("uid");
            localStorage.removeItem("token");
            window.location.reload();
        });

    axios("http://localhost:8080/post/get", {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })
        .then(res => {
            console.log(res.data);
        })

}

export default AuthChecker;