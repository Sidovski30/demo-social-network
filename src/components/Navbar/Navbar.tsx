import React, { useState } from "react";
import { Drawer, Button, Row, Col, Avatar } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./NavBar.css";
import { useSelector } from "react-redux";
import { selectAuthUserId, selectCurrentUserLogin, selectCurrentUserPhoto, selectIsAuth } from "../../redux/auth-selectors";
import { AppDispatch, AppStateType } from "../../redux/redux-store";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { NavLink, Redirect } from "react-router-dom";
import { Header } from "antd/es/layout/layout";

const NavBar: React.FC = ({ menu }: any) => {
    const isAuth = useSelector(selectIsAuth)
    const photo = useSelector(selectCurrentUserPhoto)
    const phot = useSelector((state: AppStateType) => state.profilePage.profile)
    const authUserId = useSelector(selectAuthUserId)
    const dispatch: AppDispatch = useDispatch()
    const [open, setOpen] = useState(false);

    const logutCallback = () => {
        dispatch(logout())
    }
    if(!isAuth) 
    <Redirect to={"/login"} />

    return (<>
        {!isAuth && <Redirect to={"/login"} />}
        <Header style={{
            position: 'fixed',
            width: '-webkit-fill-available',
            zIndex: 2
        }}>
            <Row>
                <Col xs={10} md={17} lg={18} xl={19}>
                    <Button
                        className="menu"
                        type="primary"
                        icon={<MenuOutlined />}
                        onClick={() => setOpen(true)}
                    />
                    <Drawer
                        placement="left"
                        onClose={() => setOpen(false)}
                        open={open}
                    >
                        <div onClick={() => setOpen(false)}>{menu}</div>
                    </Drawer>
                </Col>
                <Col xs={14} md={7} lg={6} xl={5} style={{ display: 'flex', justifyContent: 'end' }}>
                    <Row>
                        {/* <span style={{color: '#fff', paddingRight: '1rem'}}>{login}</span> */}
                        {(isAuth)
                            ? <div>
                                <Avatar src={phot?.userId === authUserId ? phot.photos.small : photo} />
                                <Button onClick={logutCallback} style={{ marginLeft: '1rem' }}>Logout</Button>
                            </div>
                            : <NavLink to={"/login"}>Login</NavLink>}
                    </Row>
                </Col>
            </Row>
        </Header>
    </>

    );
};
export default NavBar;
