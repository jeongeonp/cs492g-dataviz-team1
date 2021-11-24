import React, { useState, useEffect } from 'react';

import { Button, Header, Form, Modal, Input, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


function HelpModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon='help circle'/>}
    >
      <Modal.Header>HELP</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>OVERVIEW</Header>
          <Header>TREND</Header>
          <Header>ACTIVITY</Header>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Check"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default HelpModal;
