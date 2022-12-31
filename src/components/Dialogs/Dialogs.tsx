import {FC} from 'react';
// import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { InitialStateType } from '../../redux/dialogs-reducer';
// import { maxLengthCreator, required } from '../../utils/validators/validators';
// import { TextArea } from '../common/FormsControls/FormsControls';
import Dialog from './Dialog/Dialog';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

// type NewMessageFormValuesType = {
//     newMessageBody: string
// }

const Dialogs: FC<PropsType> = (props) => {
    
    let state = props.dialogsPage;
    let dialogsElements = state.dialogs.map(item => <DialogItem name={item.name} id={item.id} key={item.id}/>)
    let messagesElements = state.messages.map(item => <Dialog message={item.message} key={item.id}/>)
    // let addNewMessage = (values: NewMessageFormValuesType ) => {
    //     props.sendMessage(values.newMessageBody);
    // }

    return (
        <div className="mainFrame">
            <div className={s.notReadyNotif}>
                This block isn't ready yet. It is waiting for API to be ready. This component will be in charge of sending messages to a chosen user of the website.            </div>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    {messagesElements}
                </div>
                {/* <AddMessageFormRedux onSubmit={addNewMessage} /> */}
            </div>
        </div>
        
    )
}



// const maxLength50 = maxLengthCreator(50)
// type AddMessagePropsType = {}
// const AddMessageForm: FC<InjectedFormProps<NewMessageFormValuesType, AddMessagePropsType> & AddMessagePropsType>  = (props) => {
//     return (
//         <form onSubmit={props.handleSubmit}>
//             <Field component={TextArea}
//                     validate={[required, maxLength50]}
//                     name='newMessageBody' 
//                     placeholder='Enter your message' />
//             <div><button>Send</button></div>
//         </form>
//     )
// }

//const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs