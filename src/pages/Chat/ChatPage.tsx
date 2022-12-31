import { Button, Col, Form, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ChatMessageAPIType } from "../../api/chat-api";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer";
import { AppDispatch, AppStateType } from "../../redux/redux-store";

const ChatPage: React.FC = () => {
    return <div style={{position: 'relative'}}>
        <Chat />
    </div>
}


const Chat: React.FC = () => {
    
    const dispatch: AppDispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)
    
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div className="mainFrame" style={{ height: 'calc(100vh - 152px)'}}>
        {status === 'error' && <div>Some error ocured. Please refresh the page</div>}
        <>
            <Messages />
            <AddMessageForm />
        </>
    
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300){
            !isAutoScroll && setAutoScroll(true)
        } else {
            isAutoScroll && setAutoScroll(false)
        }
    }
    useEffect(() => {
        if(isAutoScroll){
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    return <div style={{height: 'calc(100% - 60px)', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m}/>)} 
        <div ref={messagesAnchorRef}></div>
    </div>
}
const Message: React.FC<{message: ChatMessageAPIType}> = React.memo(({message}) => {
    return (
        <Row gutter={24} style={{padding: '4px 0px', marginLeft: 0, marginRight: 0}}>
            <Col xs={2} sm={1} style={{display: 'flex', alignItems: 'center', paddingLeft: 0, paddingRight: 0}}>
                <img alt="" src={message.photo} style={{width: '30px', borderRadius: '50%'}}/>
            </Col>
            <Col xs={21} sm={23}>
                <div style={{padding: '4px 0'}}>
                    <b>{message.userName}</b>
                    <br />
                    {message.message}
                </div>
                
            </Col>
        </Row>
    )
})

const AddMessageForm: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch: AppDispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)
    const onFinish = (values: any) => {
        if(!values.username) return
        dispatch(sendMessage(values.username))
        form.resetFields();
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        // <div style={{bottom: 0, position: 'absolute', width: 'calc(100% - 4rem)'}}>
        <div style={{paddingTop: 10}}>
            <Form
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {/* <Form.Item name="username">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button disabled={status !== 'ready'} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item> */}
                <Row gutter={24} >
                    <Col xs={18} sm={20}>
                        <Form.Item name="username">
                            <TextArea rows={2} />
                        </Form.Item>
                    </Col>
                   
                    <Col xs={6} sm={4} style={{textAlign: 'end'}}>
                        <Form.Item>
                            <Button disabled={status !== 'ready'} type="primary" htmlType="submit">
                                Send
                            </Button>
                        </Form.Item> 
                    </Col>
                </Row>
                
            </Form>
        </div>
        
    )
}



export default ChatPage

