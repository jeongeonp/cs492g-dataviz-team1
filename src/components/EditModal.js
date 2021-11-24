import React, { useState, useEffect } from 'react';

import { Button, Header, Form, Modal, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


function EditModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Edit Mode</Button>}
    >
      <Modal.Header>Edit Mode</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Physical</Header>
          <Input 
            error='Please enter your last name' 
            placeholder='-100 ~ 100'
            label='Goal' />
          <Form.Checkbox label='Calories'/>
          <Form.Checkbox label='Pedometer'/>
          <Header>Mental</Header>
          <Form.Field>
            <Input placeholder='-100 ~ 100' />
          </Form.Field>
          <Form.Checkbox label='Valence'/>
          <Form.Checkbox label='Arousal'/>
          <Form.Checkbox label='Attention'/>
          <Form.Checkbox label='Stress'/>
          <Header>Social</Header>
          <Form.Field>
            <Input placeholder='-100 ~ 100' />
          </Form.Field>
          <Form.Checkbox label='Call Log'/>
          <Form.Checkbox label='Message Log'/>
          <Form.Checkbox label='SNS App Usage Ratio'/>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Done"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default EditModal;
