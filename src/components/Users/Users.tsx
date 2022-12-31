import {FC, useEffect, useState} from "react";
import { useSelector, useDispatch  } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "../../redux/redux-store";
import { FilterType, requestUsers, follow, unfollow } from "../../redux/users-reducer";
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsersFilter, getUsers, getFollowingInProgress} from "../../redux/users-selectors";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UrersSearchForm from "./UsersSearchForm"
import * as queryString from 'querystring'

type PropsType = {}
type QueryParamsType = {
    term?: string
    page?: string
    friend?: string
}

export const Users: FC<PropsType> = () => {
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch: AppDispatch = useDispatch()
    const history = useHistory()

    const [reset, setOnReset] = useState(false)
    
    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substring(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter
        if(!!parsed.page) actualPage = +parsed.page
        if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if(!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true'? true : false}

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        if(reset) {
            history.push({
                pathname: '/developers',
                search: ``
            })
            filter.friend = null
            filter.term = ''
            dispatch(requestUsers(1, pageSize, filter))
        } else {
            history.push({
                pathname: '/developers',
                search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
            })
        }
    }, [filter, currentPage, reset])

    useEffect(() => {
        const query: QueryParamsType = {}
        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/developers',
            search: queryString.stringify(query)
        })


    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) =>  {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const _follow = (userId: number) => {
        dispatch(follow(userId))
    } 
    const _unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }
    return <div>
        <UrersSearchForm onFilterChanged={onFilterChanged} setOnReset={setOnReset} />
        <div className="mainFrame" style={{ marginTop: '1rem'}}>
            <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount} 
                    pageSize={pageSize} onPageChanged={onPageChanged}/>
            {users.map(u => <User key={u.id} user={u} followingInProgress={followingInProgress} 
            unfollow={_unfollow} follow={_follow} />)}
        </div>
    </div>
}
