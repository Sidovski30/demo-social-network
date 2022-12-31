import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {  // менеджер, который управляет стейтом
    _state: {
        profilePage: {
            posts: [
                {id: 0, message: 'Hi, how are you?', likesCount: 1},
                {id: 1, message: 'It\'s my first post', likesCount: 4},
                {id: 2, message: 'It\'s my second post', likesCount: 4},
                {id: 3, message: 'It\'s my third post', likesCount: 4},
                {id: 4, message: 'It\'s my fourth post', likesCount: 4}
            ],
            newPostText: 'hello'
        },
        dialogsPage: {
            dialogs: [
                {id : 0, name : 'Artem'},
                {id : 1, name : 'Vika'},
                {id : 2, name : 'Valya'},
                {id : 3, name : 'Kolya'},
                {id : 4, name : 'Dasha'},
            ],
            messages: [
                {id : 0, name : 'Artem', message: 'Hi, I\'m Artem. How are you?'},
                {id : 1, name : 'Vika', message: 'Hi, I\'m Vika. How are you?'},
                {id : 2, name : 'Valya', message: 'Hi, I\'m Valya. How are you?'},
                {id : 3, name : 'Kolya', message: 'Hi, I\'m Kolya. How are you?'},
                {id : 4, name : 'Dasha', message: 'Hi, I\'m Dasha. How are you?'},
            ],
            newMessageBody: ''
        }
    },
    _callSubscriber(){      // подписываемся на store, чтобы знать когда его перерисовывать
        console.log('hello')
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },


    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action); // редюсеры принимают нужную часть стейта,
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action); // экшины, и преобразовуют эту часть
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);         // переприсваивая эту же часть
        this._callSubscriber(this._state);
    },
    
}

export default store;