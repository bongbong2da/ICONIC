
const AxiosCustomConfig = {
    headers : {
        "Authorization" : `Bearer ${sessionStorage.getItem("token")}`
    }
}

export default AxiosCustomConfig;