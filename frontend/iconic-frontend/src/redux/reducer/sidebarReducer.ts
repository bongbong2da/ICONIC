
const INVERT_SIDEBAR_VISIBLE = "sidebar/INVERT_SIDEBAR_VISIBLE";

export const invertSidebarVisible = () => ({type : INVERT_SIDEBAR_VISIBLE});

const initialSidebarVisible = {
    visible : false
};

export const SidebarReducer = (state = initialSidebarVisible, action : any) => {
    switch (action.type) {
        case INVERT_SIDEBAR_VISIBLE:
            return {
                ...state,
                visible : !state.visible
            }
        default:
            return state;
    }
};