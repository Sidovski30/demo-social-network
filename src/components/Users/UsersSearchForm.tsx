import s from './Users.module.css'
import { FilterType } from "../../redux/users-reducer";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/users-selectors";
import { Button, Col, Form, Input, Row, Select } from "antd";

type FormType = {
    term: string
    friend: "true" | "false" | "null"
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
    setOnReset: (reset: boolean) => void
}

const UrersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const [form] = Form.useForm();
    const filter = useSelector(getUsersFilter)
    const [term, setTerm] = useState(filter.term)
    
    useEffect(() => {
        //@ts-ignore
        setTerm(filter.term)
        form.setFieldsValue({term: filter.term, friend: String(filter.friend) as "true" | "false" | "null"})
        
    }, [form, filter.term])

    const submit = (values: FormType) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        } 
        props.onFilterChanged(filter)

    }
    const { Option } = Select;
    

    const onReset = () => {
        form.resetFields();
        props.setOnReset(true)
    };

    return <div className="mainFrame">
    <Form 
        form={form} 
        name="control-hooks" 
        onFinish={submit}
        autoComplete="off"
    >
        <Row>
            <Col xs={16} sm={10} md={12}>
                <Form.Item name="term" rules={[{ required: true }]} style={{marginBottom: 0}}>
                    <Input placeholder="Developers"/>
                </Form.Item>
            </Col>
            <Col xs={8} sm={6} md={4}>
                <Form.Item name="friend" rules={[{ required: true }]} style={{marginBottom: 0, marginLeft: '1rem'}}>
                    <Select placeholder="Select an option" allowClear>
                        <Option value="null">All</Option>
                        <Option value="true">Followed</Option>
                        <Option value="false">Unfollowed</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={14} sm={8} md={8} >
                <Row className={s.searchBtns}>
                    <Col xs={9} sm={12} md={10}>
                        <Form.Item style={{ marginBottom: 0}}>
                            <Button type="primary" htmlType="submit" >
                                Search
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col xs={9} sm={12} md={10}>
                        <Form.Item style={{ marginBottom: 0, marginLeft: '1rem' }}>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
                
            </Col>
        </Row>

    </Form>
    </div>
})

export default UrersSearchForm