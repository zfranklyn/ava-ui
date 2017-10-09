import * as React from 'react';
import './NavbarComponent.css';
import { Icon, IconClasses, Tooltip, Position } from '@blueprintjs/core';

import { Link } from 'react-router-dom';

class NavbarComponent extends React.Component<{}, {}> {
  render() {
    return (
      <nav className="sidebar">
        <div className="sidebar-logo"/>
        <div className="sidebar-group">
          <Link to="/studies">
            <div className="sidebar-button">
              <Tooltip content="Studies" position={Position.RIGHT}>
                <Icon iconName={IconClasses.LABEL} iconSize={Icon.SIZE_LARGE}/>
              </Tooltip>
            </div>
          </Link>
          <Link to="/participants">
            <div className="sidebar-button">
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
