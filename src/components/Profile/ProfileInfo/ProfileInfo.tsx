import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import incognito from '../../../assets/images/incognito.jpeg'
import ProfileDataFormReduxForm from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../types/types';
import { Button, Col, Image, Modal, Row } from 'antd';
import Upload from 'antd/es/upload/Upload';
import { UploadOutlined, EditOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message } from 'antd';

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile) return <Preloader />
    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    const props: UploadProps = {
        onChange(info) {
            if (info.file.status !== 'uploading') {
                //@ts-ignore
                savePhoto(info.file.originFileObj)
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div className="mainFrame">
            <Row className={s.infoBlockWrap}>
                <Col xs={24} sm={24} md={8}>
                    <div className={s.infoBlock}>
                        <div style={{ position: 'relative', width: 'fit-content' }}>
                            <Image className={s.avatar} src={profile.photos.large || incognito} />
                            {isOwner &&
                                <div className={s.uploadBtn}>
                                    <Upload {...props} showUploadList={false}>
                                        <Button icon={<UploadOutlined />}></Button>
                                    </Upload>
                                </div>
                            }
                        </div>

                        <div className={s.fullNameMob}>{profile.fullName}</div>
                        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner} />
                    </div>

                </Col>
                <Col xs={24} sm={24} md={16}>
                    {editMode
                        ? <ProfileDataFormReduxForm profile={profile} handleSubmit={onSubmit} />
                        : <ProfileData
                            profile={profile}
                            isOwner={isOwner}
                            goToEditMode={() => { setEditMode(true) }} />
                    }
                </Col>
            </Row>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return <div className={s.profileData}>
        <div className={s.fullNameDesk}>{profile.fullName}</div>
        <div className={s.infoRow}>
            <span className={s.label}>About me: </span>
            {profile.aboutMe}
        </div>
        <div className={s.infoRow}>
            <span className={s.label}>Looking for a job: </span>
            {profile.lookingForAJob ? 'Yes' : 'No'}
        </div>
        {profile.lookingForAJob &&
            <div className={s.infoRow}>
                <span className={s.label}>My skills: </span>
                {profile.lookingForAJobDescription}
            </div>
        }

        <div className={s.infoRow}>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <Button type="primary" onClick={showModal}>
                    Contacts
                </Button>
                {isOwner && <Button onClick={goToEditMode}><EditOutlined /></Button>}
            </div>

            <Modal title="Contacts" open={isModalOpen} footer={null} onCancel={handleCancel}>
                {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
                })}
            </Modal>
        </div>
    </div>
}

type ContactsPropType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactsPropType> = ({ contactTitle, contactValue }) => {
    return <div className={s.contact}><span className={s.label}>{contactTitle}: </span><a href={contactValue}>{contactValue}</a></div>
}
export default ProfileInfo;