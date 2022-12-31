import usersReducer, { actions, InitialStateType } from "./users-reducer"

let state: InitialStateType;
beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'Artem 0', followed: false, photos: {small: null, large: null}, status: 'hello 0'},
            {id: 1, name: 'Artem 1', followed: false, photos: {small: null, large: null}, status: 'hello 1'},
            {id: 2, name: 'Artem 2', followed: true, photos: {small: null, large: null}, status: 'hello 2'},
            {id: 3, name: 'Artem 3', followed: true, photos: {small: null, large: null}, status: 'hello 3'},
        ],
        pageSize: 100,
        totalUsersCount: 200,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null as null | boolean
        }
    }
})

test("follow success", () => { 
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy( )
})
test("unfollow success", () => { 
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[3].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy( )
})