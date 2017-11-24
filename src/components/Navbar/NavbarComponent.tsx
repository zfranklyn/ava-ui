import * as React from 'react';
import './NavbarComponent.css';
import { Icon, IconClasses, Tooltip, Position } from '@blueprintjs/core';

import { Link } from 'react-router-dom';

interface INavbarProps {
}

enum MENU_OPTIONS {
  STUDIES = 'STUDIES',
  USERS = 'USERS',
  NONE = 'NONE',
}

interface INavbarState {
  active: MENU_OPTIONS;
}

class NavbarComponent extends React.Component<INavbarProps, INavbarState> {

  constructor(props: INavbarProps) {
    super(props);
    this.state = {
      active: MENU_OPTIONS.NONE,
    };
  }

  private handleChangeTab = (option: MENU_OPTIONS) => {
    this.setState({
      active: option,
    });
  }

  render() {
    console.log(this);
    return (
      <nav className="sidebar">
        <Link to="/studies" onClick={() => this.handleChangeTab(MENU_OPTIONS.STUDIES)}>
          <div className="sidebar-logo"/>
        </Link>
        <div className="sidebar-group">
          <Link to="/studies" onClick={() => this.handleChangeTab(MENU_OPTIONS.STUDIES)}>
            <div className={`sidebar-button ${this.state.active === MENU_OPTIONS.STUDIES ? 'active' : ''}`}>
              <Tooltip content="Studies" position={Position.RIGHT}>
                <Icon iconName={IconClasses.LABEL} iconSize={Icon.SIZE_LARGE}/>
              </Tooltip>
            </div>
          </Link>
          <Link to="/users" onClick={() => this.handleChangeTab(MENU_OPTIONS.USERS)}>
            <div className={`sidebar-button ${this.state.active === MENU_OPTIONS.USERS ? 'active' : ''}`}>
              <Tooltip content="Participants" position={Position.RIGHT}>
                <Icon iconName={IconClasses.PEOPLE} iconSize={Icon.SIZE_LARGE}/>
              </Tooltip>
            </div>
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavbarComponent;
