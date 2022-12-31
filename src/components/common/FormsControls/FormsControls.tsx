import React, {FC} from "react";
import s from './FormsControls.module.css'
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form/lib/Field";


type FormControlPropsType = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
}

export const TextArea: FC<FormControlPropsType> = ({input, meta: {touched, error}, ...props}) => {

    const hasError = touched && error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : '')}>
            <div>
                <textarea {...input}{...props} />
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Input: FC<FormControlPropsType>  = ({input, meta: {touched, error}, ...props}) => {
 
    const hasError = touched && error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : '')}>
            <div>
                <input {...input}{...props}/>
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

