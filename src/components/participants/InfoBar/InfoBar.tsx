import * as React from 'react';
import './InfoBar.css';

import { Tab2, Tabs2 } from '@blueprintjs/core';

class InfoBar extends React.Component<{}, {}> {
  render() {
    return (
      <div className="infobar-section">
        <div className="title">
          <h5>User Information</h5>
        </div>
        <div className="content">
          <Tabs2 id="infoBarTabs">
            <Tab2 id="userInfo" title="User Information" />
            <Tab2 id="userInfo" title="Messages" />
          </Tabs2>
        </div>
      </div>
    );
  }
}

export default InfoBar;
