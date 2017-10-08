import * as React from 'react';
import './StudyCard.css';

import { Tag, Intent, Icon } from '@blueprintjs/core';

class StudyCard extends React.Component<{}, {}> {

  public render() {
    return (
      <div className="study-card pt-card pt-elevation-2 pt-interactive">
        <Icon className="study-status" iconName="pt-icon-record" /> 
        <h5 className="pt-text-overflow-ellipsis">Corbett Prep Biweekly SMS Survey</h5>
        <p className="pt-ui-text pt-text-muted pt-text-overflow-ellipsis">
          Corbett Prep bi-weekly survey containing questions about psychological wellbeing, 
          RULER implementation, and burnout
        </p>
        <div className="study-tags">
          <Tag className="pt-minimal pt-round" intent={Intent.NONE}>SMS</Tag>
          <Tag className="pt-minimal pt-round" intent={Intent.NONE}>Corbett Prep</Tag>
          <Tag className="pt-minimal pt-round" intent={Intent.NONE}>Survey</Tag>
        </div>
      </div>
    );
  }
}

export default StudyCard;
