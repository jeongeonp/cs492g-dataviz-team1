import React, { useState, } from 'react';

import { Button, Header, Form, Modal, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


const EditModal = ({ activatedEle, changeEle, goals, changeGoals }) => {
  const [open, setOpen] = useState(false);

  const [physicalGoal, setPhysicalGoal] = useState('0');
  const [mentalGoal, setMentalGoal] = useState('0');
  const [socialGoal, setSocialGoal] = useState('0');

  const [physicalEle, setPhysicalEle] = useState();
  const [mentalEle, setMentalEle] = useState();
  const [socialEle, setSocialEle] = useState();

  const handleDone = () => {

  }


  const handleChangeElements = () => {

  }

  const handleChangeGoals = () => {

  }

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
            placeholder='-100 ~ 100'
            value={physicalGoal}
            onChange={({ target: { value } }) => setPhysicalGoal(value)}
          />
          <Form.Checkbox label='Calories'/>
          <Form.Checkbox label='Pedometer'/>
          <Header>Mental</Header>
          <Input 
            placeholder='-100 ~ 100'
            value={mentalGoal}
            onChange={({ target: { value } }) => setMentalGoal(value)}
          />
          <Form.Checkbox label='Valence'/>
          <Form.Checkbox label='Arousal'/>
          <Form.Checkbox label='Attention'/>
          <Form.Checkbox label='Stress'/>
          <Header>Social</Header>
          <Input 
            placeholder='-100 ~ 100'
            value={socialGoal}
            onChange={({ target: { value } }) => setSocialGoal(value)}
          />
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
