import React from 'react';
import s from './Dialog.module.css';

type PropsType = {
    message: string
}

const Dialog: React.FC<PropsType> = (props) => {
    
    return (
        <div className={s.messages}>
            <div className={s.message}>
                {props.message}
            </div>
        </div>
    )
}

export default Dialog;