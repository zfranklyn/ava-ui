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

import StudySection from './Studies/StudySection';
import StudyDetails from './Studies/StudyDetails/StudyDetails';
import UserSection from './Users/UserSection';

interface IAppContainerProps {

}

interface IAppContainerState {
  collapsedMenu: boolean;
}

class AppContainer extends React.Component<IAppContainerProps, IAppContainerState> {
  constructor(props: IAppContainerProps) {
    super(props);
    this.state = {
      collapsedMenu: true,
    };
  }

  // private toggleMenuCollapse = () => {
  //   this.setState({
  //     collapsedMenu: !this.state.collapsedMenu,
  //   });
  // }

  render() {
    return (
      <Router>
        <Layout style={{height: '100%'}}>
          <Sider
            trigger={null}
            collapsible={true}
            collapsed={this.state.collapsedMenu}
            style={{background: '#fff'}}
          >
            <Link to="/studies">
              <div
                style={{
                  height: (this.state.collapsedMenu ? '80px' : '160px'),
                  width: '100%',
                  background: `url('./logo.svg') no-repeat 50%`,
                  backgroundSize: '60%',
                }}
              />
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
              {/* <Icon
                type={this.state.collapsedMenu ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggleMenuCollapse}
              /> */}
              <h3>Automated Virtual Assessment</h3>
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
    paddingLeft: '30px',
    paddingTop: '25px',
    boxShadow: '0 1px 4px rgba(0,21,41,0.08)',
    zIndex: 10,
  }
};

export default AppContainer;
