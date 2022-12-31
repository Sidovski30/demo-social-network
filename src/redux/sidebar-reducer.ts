let initialState = {}

export type InitialStateType = typeof initialState
export const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state;
}

export default sidebarReducer;