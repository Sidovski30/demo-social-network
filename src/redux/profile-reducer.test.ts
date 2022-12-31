import profileReducer, { actions } from './profile-reducer';

let state = {
    posts: [
        {id: 0, message: 'Hi, how are you?', likesCount: 1},
        {id: 1, message: 'It\'s my first post', likesCount: 4},
        {id: 2, message: 'It\'s my second post', likesCount: 4},
        {id: 3, message: 'It\'s my third post', likesCount: 4},
        {id: 4, message: 'It\'s my fourth post', likesCount: 4}
    ],
    profile: null,
    status: '',
}
test('length of posts should be incremented', () => {
    // 1. test data
    let action = actions.addPostActionCreator('it-kamasutra.com')
    // 2. action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.posts.length).toBe(6)
});
test('message of new post should be correct', () => {
    let action = actions.addPostActionCreator('it-kamasutra.com')
    let newState = profileReducer(state, action) 
    expect(newState.posts[5].message).toBe('it-kamasutra.com')
});

test('after removing amount of messages should be decremented', () => {
    let action = actions.deletePost(1)
    let newState = profileReducer(state, action) 
    expect(newState.posts.length).toBe(4)

});

test(`after removing amount of messages shouldn't be decremented if id is decrement`, () => {
    let action = actions.deletePost(1000)
    let newState = profileReducer(state, action) 
    expect(newState.posts.length).toBe(5)
    
});



// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });