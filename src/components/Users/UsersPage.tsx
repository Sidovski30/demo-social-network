import React from "react";
import {Users} from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {getIsFetching} from "../../redux/users-selectors";
import { useSelector } from "react-redux";



type UsersPagePropsType = {
    
}

export const UsersPage: React.FC<UsersPagePropsType> = () => {

    const isFetching = useSelector(getIsFetching)

    return <>
    {isFetching ? <Preloader/> : null}
    <Users /> 
    </>
}
