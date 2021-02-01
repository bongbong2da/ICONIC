import Redux from 'redux';

const initialState = {value : 0};

type actionType = {
    type : string,
    payload : string
}

function counterFunction(state = initialState, action : actionType) {
    if (action.type === "counter/increment") {
        return {
            ...state,
            value : state.value + 1
        }
    }
    return state;
}
