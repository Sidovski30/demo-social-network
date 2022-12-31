import Post from './Post/Post';
import React from 'react';
import { Button, Col, Form, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import useLocalStorage from '../../../hooks/useLocalStorage';

export type MapPropsTypes = {
    isOwner: boolean
}
export type DispatchPropsTypes = {
    addPost: (newPostText: string) => void
}

const Posts: React.FC<MapPropsTypes> = ({isOwner}) => {
    const posts = useSelector((state: AppStateType) => state.profilePage.posts)
    let [name, setName] = useLocalStorage("mem", posts);
    let onRemove = (postId: number) => {
        let filtered = name.filter((i:any) => i.id !== postId)
        setName(filtered)
    }

    const [form] = Form.useForm();
    //@ts-ignore
    let postData = name.map((i, index) => <Post key={index} id={i.id} message={i.message} onRemove={onRemove} />);
    let onAddPost = (values: AddPostFormValuesType) => { 
        let idVal = name.map((e:any) => e.id).includes(name.length) ? Math.max(...name.map((e:any) => e.id))+1 : name.length
        setName([...name, {id: idVal, message: values.newPostText}]);
        form.resetFields();
    }
    return (
        <div>{isOwner && 
        <div className="mainFrame" style={{ marginTop: '1rem'}}>
            <Form
                form={form}
                name="basic"
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onAddPost}
                autoComplete="off"
            >
                <Row>
                    <Col xs={18} sm={20}>
                        <Form.Item name="newPostText">
                            <TextArea placeholder='Add post' />
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={4} style={{textAlign: 'end'}}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Send
                            </Button>
                        </Form.Item> 
                    </Col>
                </Row>
            </Form>

            <Row>
                <Col xs={24} sm={20}>
                    <div style={{marginTop: 10}}>
                        {postData}
                    </div>
                </Col>
            </Row>

            
        </div>
        }

        </div>
        
    )
}
// const PostsMemorized = React.memo(Posts)

type AddPostFormValuesType = {
    newPostText: string
}
export default Posts;