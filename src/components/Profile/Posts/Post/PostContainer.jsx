import s from './Post.module.css';

const Post = (props) => {
    return (
        <div>
            <div className={s.item}>
                <img src="https://xmart.pl/wp-content/uploads/2015/03/man4.png" />
                {props.message}
                <div>post 1</div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post;