import axios from "axios";
import {useDispatch} from "react-redux";
import {deleteToken, deleteUID, loginStatus, saveUserinfo, UserInfoType} from "../../redux/reducer/userActions";
import {setLoadingRedirect} from "../../redux/reducer/loadingReducer";

const AuthChecker = () => {
    const dispatcher = useDispatch();


    if(!sessionStorage.getItem("token")) return;
    // dispatcher(setLoadingRedirect(true));
    const uid = (sessionStorage.getItem("uid") ? sessionStorage.getItem("uid") : null);
    const token = (sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null);

    // console.log(`AUTHORIZING ${uid} and ${token}`);

    axios.post("http://localhost:8080/user/isAuth", {username : uid}, {
        headers : {
            Authorization : "Bearer " + token
        }
    })
        .then(res => {
            const data = res.data as UserInfoType;
            console.log(`JWT AUTHORIZED SUCCESSFULLY`);
            dispatcher(loginStatus(true));
            dispatcher(saveUserinfo(data));
            dispatcher(setLoadingRedirect(false));
        })
        .catch(res => {
            alert(`JWT 인증 실패 ${res}`);
            dispatcher(deleteToken());
            dispatcher(deleteUID());
            dispatcher(loginStatus(false));
            sessionStorage.removeItem("uid");
            sessionStorage.removeItem("token");
            window.location.reload();
        });

}

export default AuthChecker;