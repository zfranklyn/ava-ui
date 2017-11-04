import * as React from 'react';
import './StudyModal.css';

import { Dialog } from '@blueprintjs/core';

interface IStudyModalProps {
  isOpen: boolean;
  currentStudyId: string;
  closeStudy: Function;
}

class StudyModal extends React.Component<IStudyModalProps, {}> {
  render() {
    return (
      <Dialog 
        className="study-modal"
        title="Study Name"
        isOpen={this.props.isOpen}
        onClose={() => this.props.closeStudy()}
      >
        <div className="pt-dialog-body">
          Body
        </div>
        <div className="pt-dialog-footer">
          Footer
        </div>
      </Dialog>
    );
  }
}

export default StudyModal;
