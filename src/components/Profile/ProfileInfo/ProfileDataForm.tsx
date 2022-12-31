import React from "react"
import { ProfileType } from "../../../types/types"
import { Button, Checkbox, Form, Input } from "antd"
import TextArea from "antd/es/input/TextArea"

type PropsType = {
    profile: ProfileType
    handleSubmit: (formData: ProfileType) => void
}

const ProfileDataFormReduxForm: React.FC<PropsType> = ({handleSubmit, profile}) => {
    
    const {fullName, lookingForAJob, lookingForAJobDescription, aboutMe, contacts} = profile
    const {facebook, instagram, github, mainLink, twitter, vk, website, youtube} = contacts


    return <Form
        layout={'vertical'}
        name="basic"
        
        wrapperCol={{ span: 24}}
        initialValues={{ remember: true, 
            fullName, 
            lookingForAJob, 
            lookingForAJobDescription,
            aboutMe,
            contacts: {
                facebook,
                instagram,
                github,
                mainLink,
                twitter,
                vk,
                website,
                youtube,
            }
        }}
        onFinish={handleSubmit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        {/* {error && <div className={ss.formSummaryError}>{error}</div>} */}
        <Form.Item
            label="Full name:"
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="About me:"
            name="aboutMe"
            rules={[{ required: false, message: 'About me' }]}
        >
            <TextArea rows={4}/>
        </Form.Item>
        <Form.Item label="Looking for a job:" name="lookingForAJob" valuePropName="checked">
            <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item
            label="My skills:"
            name="lookingForAJobDescription"
            rules={[{ required: true, message: '' }]}
        >
            <TextArea />
        </Form.Item>
        
        <div><b>Contacts: </b>
            {Object.keys(profile.contacts).map(key => {
                return <div key={key}>
                    <Form.Item
                        label={key}
                        name={['contacts',`${key}`]}
                        rules={[{ required: false, message: '' }]}
                    >
                        <Input />
                    </Form.Item>

                </div>
            })}
        </div>
        

        <Form.Item style={{textAlign: 'end'}}>
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
    </Form>
    // <form onSubmit={handleSubmit}>
    //     <div><button>SAVE</button></div>
    //     {error && <div className={ss.formSummaryError}>{error}</div>}
    //     <div>
    //         <b>Full name: </b> 
    //         <Field placeholder={'Full name'} name={'fullName'}  component={Input}/>
    //     </div>
    //     <div>
    //         <b>Looking for a job: </b>
    //         <Field placeholder={''} name={'lookingForAJob'}  component={Input} type='checkbox'/>
    //     </div>
    //     <div>
    //         <b>My skills: </b>
    //         <Field placeholder={'My skills'} name={'lookingForAJobDescription'}  component={TextArea}/>
    //     </div>
        
    //     <div>
    //         <b>About me: </b>
    //         <Field placeholder={'About me'} name={'aboutMe'}  component={TextArea}/>
    //     </div>

    //     <div><b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
    //         return <div key={key} className={s.contact}>
    //                 <b>{key}: <Field placeholder={''} name={`contacts.${key}`}  component={Input}/></b>
    //             </div>
    //     })}</div>
    // </form>
}

// const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm