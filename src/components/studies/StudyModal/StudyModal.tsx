import * as React from 'react';
import './StudyModal.css';

import { Dialog } from '@blueprintjs/core';

class StudyModal extends React.Component<{}, {}> {
  render() {
    return (
      <Dialog 
        className="study-modal"
        title="Study Name"
        isOpen={true}
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
