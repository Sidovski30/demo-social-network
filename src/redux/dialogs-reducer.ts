import { InferActionsType } from "./redux-store"

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}
let initialState = {
    dialogs: [
        {id : 0, name : 'Artem'},
        {id : 1, name : 'Vika'},
        {id : 2, name : 'Valya'},
        {id : 3, name : 'Kolya'},
        {id : 4, name : 'Dasha'},
    ] as Array<DialogType>,
    messages: [
        {id : 0,  message: 'Hi, I\'m Artem. How are you?'},
        {id : 1, message: 'Hi, I\'m Vika. How are you?'},
        {id : 2,  message: 'Hi, I\'m Valya. How are you?'},
        {id : 3,  message: 'Hi, I\'m Kolya. How are you?'},
        {id : 4,  message: 'Hi, I\'m Dasha. How are you?'},
    ] as Array<MessageType>
}
const dialogsReducer = (state = initialState, action: ActionType): InitialStateType => {

    switch(action.type){
        case 'SEND-MESSAGE': return {
                ...state,
                messages: [...state.messages, {id: 6, message: action.newMessageBody}]
        }
        default: 
            return state;
    }
}


export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'SEND-MESSAGE', newMessageBody} as const)
}

export default dialogsReducer;

export type InitialStateType = typeof initialState
type ActionType = InferActionsType<typeof actions>