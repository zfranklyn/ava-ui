import * as React from 'react';
import './NavbarComponent.css';
import { Icon, IconClasses, Tooltip, Position } from '@blueprintjs/core';

class NavbarComponent extends React.Component<{}, {}> {
  render() {
    return (
      <nav className="sidebar">
        <div className="sidebar-logo"/>
        <div className="sidebar-group">
          <div className="sidebar-button active">
            <Tooltip content="Studies" position={Position.RIGHT}>
              <Icon iconName={IconClasses.LABEL} iconSize={Icon.SIZE_LARGE}/>
            </Tooltip>
          </div>
          <div className="sidebar-button">
            <Tooltip content="Participants" position={Position.RIGHT}>
              <Icon iconName={IconClasses.PEOPLE} iconSize={Icon.SIZE_LARGE}/>
            </Tooltip>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavbarComponent;
