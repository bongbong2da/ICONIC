const SET_LOADING_REDIRECT = 'loading/SET_LOADING_REDIRECT';

export const setLoadingRedirect = (isLoading : boolean) => ({type : SET_LOADING_REDIRECT, redirect : isLoading});

const initialLoadingStates = {
    redirect : false
}

export const LoadingReducer = (state = initialLoadingStates, action : any) => {
    switch (action.type) {
        case SET_LOADING_REDIRECT:
            return {
                ...state,
                redirect: action.redirect
            }
        default:
            return state;
    }
}