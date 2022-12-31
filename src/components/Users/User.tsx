import React from "react";
import s from './Users.module.css';
import userPhoto from '../../assets/images/incognito.jpeg';
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";
import { Button } from "antd";

type PropsType = {
    user: UserType
    followingInProgress: number[]
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return <div className={s.userBlock}>
    <span>
        <div>
            <NavLink to={'/profile/' + user.id}>
                <img style={{borderRadius: '50%', marginBottom: 4}} src={user.photos.small != null ? user.photos.small : userPhoto} 
                className={s.photo} alt=''/>
            </NavLink>
        </div>
        <div>
            {user.followed 
                ? <Button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                    unfollow(user.id)
                }}>Unfollow</Button> 
                : <Button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                    follow(user.id)
                }}>Follow</Button>}
        </div>
    </span>
    <span>
        <span>
            <div style={{fontSize: 18}}>{user.name}</div>
            <div style={{color: '#696969', marginTop: 4}}>{user.status}</div>
        </span>
    </span>
</div>
}

export default User