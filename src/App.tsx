import './App.css';
import 'antd/dist/reset.css';
import { HashRouter, Route } from 'react-router-dom';
import {UsersPage} from './components/Users/UsersPage';
import {Login} from './components/Login/Login';
import React, {FC, useEffect} from 'react';
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader';
import store, { AppDispatch, AppStateType } from './redux/redux-store';
import WithSuspence from './hoc/withSuspence';
import { Switch, Redirect} from 'react-router-dom';
import { Col, Layout, Row } from 'antd';
import { useSelector, useDispatch, Provider } from 'react-redux';
import TopicMenu from './components/TopicMenu/TopicMenu';
import SideBar from './components/SideBar/SideBar';
import NavBar from './components/Navbar/Navbar';
const { Content, Footer } = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))

const SuspendedProfile = WithSuspence(ProfileContainer)
const SuspendedDialog = WithSuspence(DialogsContainer)

const App: FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  
  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])
  if (!initialized)
  return <Preloader />

  return (
    <Layout style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      {/* @ts-ignore */}
      <NavBar menu={<TopicMenu />} />
      <Row style={{flex:1}}>
        <Col xs={24} sm={24} md={{span: 22, offset: 1}} lg={{span: 22, offset: 1}} xl={{span: 18, offset: 3}} xxl={{span: 14, offset: 5}}>
          <Content style={{ padding: '64px 0px 0' }}>
            <Layout hasSider className="site-layout-background" style={{ padding: '24px 0 0' }}>
              <SideBar menu={<TopicMenu />} />
              <Layout className="site-layout-background">
                <Content style={{ padding: '0 1rem', minHeight: 280, overflow: 'initial' }}>
                  <Switch>
                    <Route exact path='/' render={() => <Redirect to="/profile" />} />
                    <Route exact path='/profile/:userId?' render={() => <SuspendedProfile/>} />
                    <Route path='/dialogs' render={() => <SuspendedDialog/>}/>
                    <Route path='/developers' render={() => <UsersPage /> } />
                    <Route exact path='/login' render={() => <Login /> } />
                    <Route exact path='/chat' render={WithSuspence(ChatPage)} />
                    <Route path='*' render={() => <div>404 PAGE NOT FOUND</div>} />
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </Content>
        </Col>
      </Row>
      

      <Footer style={{ textAlign: 'center', padding: '16px 50px' }}>React Social Network App©2022 Created by Artem Blyzniakov</Footer>
    </Layout>
  )
}


const MainApp: FC = () => {
  return <HashRouter basename ="/">
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </HashRouter>
} 

export default MainApp;

