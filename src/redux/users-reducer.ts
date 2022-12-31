import { Dispatch } from "redux";
import { ResponseType, ResultCodesEnum } from "../api/api";
import { usersAPI } from "../api/users-api";
import { UserType } from "../types/types";
import { AppStateType, BaseThunkType, InferActionsType } from "./redux-store";

let initialState = {
   users: [ ] as UserType[],
   pageSize: 10,
   totalUsersCount: 200,
   currentPage: 1,
   isFetching: false,
   followingInProgress: [] as number[], //array of users ids
   filter: {
    term: '',
    friend: null as null | boolean
   }
}

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW': 
            return {
                ...state, 
                users: state.users.map(u => { // то же самое, что и users: [...state.users]
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                }) 
        }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state, 
                //users: [...state.users],
                users: state.users.map(u => { // то же самое, что и users: [...state.users]
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                }) 
        }
        case 'SN/USERS/SET_USERS': {
            return ({...state, users: action.users})
        }
        case 'SN/USERS/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'SN/USERS/SET_FILTER': {
            return {...state, filter: action.payload}
        }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {...state,
                followingInProgress: action.isFetching
                ? [...state.followingInProgress, action.userId] 
                : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default: return state;
    } 
}

export const actions = {
    followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),
    setUsers: (users: UserType[]) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    setFilter: (filter: FilterType) => ({type: 'SN/USERS/SET_FILTER', payload: filter} as const),
    setUsersTotalCount: (totalUsersCount: number) => ({type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const),
}
export const requestUsers = (currentPage: number, 
    pageSize: number, filter: FilterType): ThunkType => async (dispatch: Dispatch<ActionsType>, getState: () => AppStateType) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setFilter(filter));
    let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setUsersTotalCount(data.totalCount))
    
}
const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType> , 
                                            userId: number, 
                                            apiMethod: (userId: number) => Promise<ResponseType>, 
                                            actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if(response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    
    dispatch(actions.toggleFollowingProgress(false, userId))
}
export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), actions.followSuccess)  
}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), actions.unfollowSuccess)
}

export default usersReducer;

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>