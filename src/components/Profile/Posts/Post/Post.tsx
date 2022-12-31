import s from './Post.module.css';
import { CloseOutlined } from '@ant-design/icons'

type PropsType = {
    message: string
    onRemove: (key: number) => void
    id: number
    //likesCount: number
}
const Post: React.FC<PropsType> = (props) => {
    let onRemove = (e: any) => {
        props.onRemove(e)
    }
    return (
        <div>
            <div className={s.item}>
                <pre>{props.message}</pre>
                {/* @ts-ignore */}
                <CloseOutlined style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '1rem'
                }} onClick={() => onRemove(props.id)}/>
            </div>
        </div>
    )
}

export default Post;