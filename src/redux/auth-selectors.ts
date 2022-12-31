import { AppStateType } from "./redux-store";

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}
export const selectCurrentUserLogin = (state: AppStateType) => {
    return state.auth.login
}
export const selectCurrentUserPhoto = (state: AppStateType) => {
    return state.auth.photo
}
export const selectAuthUserId = (state: AppStateType) => {
    return state.auth.userId
}