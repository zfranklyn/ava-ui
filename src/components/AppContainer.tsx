import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import {
  Layout,
  Menu,
  Icon,
} from 'antd';
const { Sider, Header, Content, } = Layout;
import 'antd/dist/antd.css';

// import './AppContainer.css';

// import NavbarComponent from './Navbar/NavbarComponent';
import StudySection from './Studies/StudySection';
import StudyDetails from './Studies/StudyDetails/StudyDetails';
import UserSection from './Users/UserSection';

class AppContainer extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <Layout style={{height: '100%'}}>
          <Sider
            trigger={null}
            collapsible={true}
            collapsed={true}
            style={{background: '#fff'}}
          >
            <Link to="/studies">
              <div className="sidebar-logo"/>
            </Link>
            <Menu
              mode="inline"
              theme="light"
              defaultSelectedKeys={['1']}
              style={{height: '100%'}}
            >
              <Menu.Item key="1">
                <Link to="/dashboard">
                  <Icon type="dashboard"/>
                  <span>Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/studies">
                  <Icon type="solution" />
                  <span>Studies</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/users">
                  <Icon type="user" />
                  <span>Users</span>
                </Link>

              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={STYLE.HEADER}>
              Header
            </Header>
            <Content>
              <Route path="/studies" component={StudySection}/>
              <Route path="/study/:studyId" component={StudyDetails}/>
              <Route path="/users" component={UserSection}/>
            </Content>
          </Layout> 
        </Layout>

      </Router>
    );
  }
}

const STYLE = {
  HEADER: {
    background: '#fff',
    padding: 0,
    boxShadow: '0 1px 4px rgba(0,21,41,0.08)',
    zIndex: 10,
  }
};

export default AppContainer;
