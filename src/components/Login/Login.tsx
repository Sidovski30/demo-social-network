import React from "react";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import { AppDispatch, AppStateType } from "../../redux/redux-store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';

// type LoginFormOwnProps = {
//     captchaUrl: string|null
// }

export const Login: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch: AppDispatch = useDispatch()
    
    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to='/profile' />
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '2rem'}}>
            <Form
            layout={'vertical'}
            name="basic"
            labelCol={{ span: 12 }}
            wrapperCol={{ xs: { span: 24 }, sm: { span: 10 } }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
            <Form.Item
                label="E-mail"
                name="email"
                rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="rememberMe" valuePropName="rememberMe" wrapperCol={{ span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {captchaUrl && <img src={captchaUrl} alt=''/>}
            {captchaUrl && 
                <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                    <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                        name="captcha"
                        noStyle
                        rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                        >
                        <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Button>Get captcha</Button>
                    </Col>
                    </Row>
                </Form.Item>
            }
            <Form.Item wrapperCol={{ span: 16 }}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
            
            </Form>
        </div>
        
        
    )
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

