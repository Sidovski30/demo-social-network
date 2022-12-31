import { PostType, ProfileType, PhotosType } from './../types/types';
import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from '../api/profile-api';
import { ResultCodesEnum } from '../api/api';
import { InferActionsType, BaseThunkType } from './redux-store';

let initialState = {
    posts: [
        {id: 0, message: 'Hi, how are you?'},
        {id: 1, message: 'It\'s my first post'},
        {id: 2, message: 'It\'s my second post'},
    ] as PostType[],
    profile: null as ProfileType|null,
    status: '',
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'ADD-POST': return {
                ...state,
                posts: [...state.posts, {id: 5, message: action.newPostText}],
        }
        case 'SET_USER_PROFILE': return {
                ...state,
                profile: action.profile
        }
        case 'SET_STATUS': return {       // По экшену SET_STATUS мы берем текущий стейт (то что в initialState), делаем его копию,
                ...state,               // перезаписываем и выводим новый стейт. Но поле status мы перезаписываем с новыми значениями
                status: action.status   // которые получаем в action.status
        }
        case 'DELETE_POST': return {
            ...state,
            posts: state.posts.filter(p => p.id !== action.postId)
        }
        case 'SAVE_PHOTO_SUCCESS': return {
            ...state,
            profile: {...state.profile, photos: action.photos} as ProfileType
        }
        default: return state;
    } 
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'ADD-POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const)
}



export const addPost = (newPostText: string): ThunkType => async (dispatch) => {
    dispatch(actions.addPostActionCreator(newPostText))
}
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data))
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if(data.resultCode === ResultCodesEnum.Success)
    dispatch(actions.setStatus(status))  
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if(data.resultCode === ResultCodesEnum.Success)
    dispatch(actions.savePhotoSuccess(data.data.photos))
} 
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if(data.resultCode === ResultCodesEnum.Success) {
        if(userId !== null) {
            dispatch(getUserProfile(userId)) 
        } else {
            throw new Error('userId can not be null')
        }
       
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages)
    }
}

export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>