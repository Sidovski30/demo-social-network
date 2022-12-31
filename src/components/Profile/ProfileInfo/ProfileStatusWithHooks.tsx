import React, { ChangeEvent, useEffect, useState  } from "react";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const activateEditMode = () => {
        if(props.isOwner)
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div style={{maxWidth: 200, paddingTop: '1rem'}}>
            {(!editMode) && 
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '----'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input 
                    onChange={onStatusChange} 
                    onBlur={deactivateEditMode} 
                    autoFocus={true} 
                    value={status}/>
                </div>
            }
            
        </div>
    )
    
    
}

export default ProfileStatusWithHooks