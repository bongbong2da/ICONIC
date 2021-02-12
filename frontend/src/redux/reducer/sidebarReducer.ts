
const INVERT_SIDEBAR_VISIBLE = "sidebar/INVERT_SIDEBAR_VISIBLE";

export const invertSidebarVisible = (visible : boolean) => ({type : INVERT_SIDEBAR_VISIBLE, visible : visible});

const initialSidebarVisible = {
    visible : false
};

export const SidebarReducer = (state = initialSidebarVisible, action : any) => {
    switch (action.type) {
        case INVERT_SIDEBAR_VISIBLE:
            return {
                ...state,
                visible : !action.visible
            }
        default:
            return state;
    }
};