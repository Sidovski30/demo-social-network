import { BaseThunkType, InferActionsType } from './redux-store';
import { ResultCodeForCaptcha } from './../api/api';
import { FormAction, stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../api/api";
import { securityAPI } from '../api/security-api';
import { authAPI } from '../api/auth-api';
import { profileAPI } from '../api/profile-api';

let initialState = {
    userId: null as number|null,
    email: null as string|null,
    login: null as string|null,
    isAuth: false,
    photo: null as string|null,
    captchaUrl: null as string|null
}
export type InitialStateType = typeof initialState

type ActionType = InferActionsType<typeof actions>

type ThunkType = BaseThunkType<ActionType | FormAction>


const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'samurai-network/auth/SET_USER_DATA': 
        case 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS': return {
                ...state,
                ...action.payload,
            }
        default: return state;
    } 
}

export const actions = {
    setAuthUserData: (userId: number|null, email: string|null, login: string|null, isAuth: boolean, photo: string|null) => ({
        type: 'samurai-network/auth/SET_USER_DATA' , payload: {userId, email, login, isAuth, photo}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me();
    if(data.resultCode === ResultCodesEnum.Success){
        let {id, login, email} = data.data
        let responsePhoto = await profileAPI.getProfile(id);
        let photo = responsePhoto.photos.small
        dispatch(actions.setAuthUserData(id, email, login, true, photo));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkType => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
    if(data.resultCode === ResultCodesEnum.Success){
        dispatch(getAuthUserData())
    } else {
        if(data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))

}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if(response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false, null));
    }
}

export default authReducer; 