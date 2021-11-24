import React, { useState, } from 'react';

import { Button, Header, Form, Modal, Input,  Popup, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


const EditModal = ({ activatedEle, changeEle, goals, changeGoals }) => {
  const [open, setOpen] = useState(false);

  const [physicalGoal, setPhysicalGoal] = useState('0');
  const [mentalGoal, setMentalGoal] = useState('0');
  const [socialGoal, setSocialGoal] = useState('0');

  const [physicalEle, setPhysicalEle] = useState(activatedEle.physical);
  const [mentalEle, setMentalEle] = useState(activatedEle.mental);
  const [socialEle, setSocialEle] = useState(activatedEle.social);

  const handleDone = () => {

    var updatedGoal = {
      physical: parseInt(physicalGoal), 
      mental: parseInt(mentalGoal), 
      social: parseInt(socialGoal)
    };

    var updatedEle = {
      physical: physicalEle,
      mental: mentalEle, 
      social: socialEle
    };

    console.log(updatedGoal)
    console.log(updatedEle)

    changeGoals(updatedGoal);
    changeEle(updatedEle);
    setOpen(false);
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Edit Mode</Button>}
    >
      <Modal.Header>
        Edit Mode
        <Popup content='original goal is set to 0' trigger={<Icon disabled name='help circle' />} size='tiny' style={{}}/>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Physical</Header>
          <Input 
            placeholder='-100 ~ 100'
            value={physicalGoal}
            onChange={(e) => setPhysicalGoal(e.target.value)}
          />
          <Form.Checkbox 
            label='Calories'
            checked={physicalEle.Calories}
            onChange={(e) => setPhysicalEle({...physicalEle, Calories: !physicalEle.Calories})}
          />
          <Form.Checkbox 
            label='Pedometer'
            checked={physicalEle.Pedometer}
            onChange={(e) => setPhysicalEle({...physicalEle, Pedometer: !physicalEle.Pedometer})}
          />
          <Header>Mental</Header>
          <Input 
            placeholder='-100 ~ 100'
            value={mentalGoal}
            onChange={(e) => setMentalGoal(e.target.value)}
          />
          <Form.Checkbox 
            label='Valence'
            checked={mentalEle.Valence}
            onChange={(e) => setMentalEle({...mentalEle, Valence: !mentalEle.Valence})}
          />
          <Form.Checkbox 
            label='Arousal'
            checked={mentalEle.Arousal}
            onChange={(e) => setMentalEle({...mentalEle, Arousal: !mentalEle.Arousal})}
          />
          <Form.Checkbox 
            label='Attention'
            checked={mentalEle.Attention}
            onChange={(e) => setMentalEle({...mentalEle, Attention: !mentalEle.Attention})}
          />
          <Form.Checkbox 
            label='Stress'
            checked={mentalEle.Stress}
            onChange={(e) => setMentalEle({...mentalEle, Stress: !mentalEle.Stress})}
          />
          <Header>Social</Header>
          <Input 
            placeholder='-100 ~ 100'
            value={socialGoal}
            onChange={(e) => setSocialGoal(e.target.value)}
          />
          <Form.Checkbox 
            label='Call Log'
            checked={socialEle.CallLog}
            onChange={(e) => setSocialEle({...socialEle, CallLog: !socialEle.CallLog})}
          />
          <Form.Checkbox 
            label='Message Log'
            checked={socialEle.MessageLog}
            onChange={(e) => setSocialEle({...socialEle, MessageLog: !socialEle.MessageLog})}
          />
          <Form.Checkbox 
            label='SNS APP Usage ratio'
            checked={socialEle.SNSProp}
            onChange={(e) => setSocialEle({...socialEle, SNSProp: !socialEle.SNSProp})}
          />
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
          onClick={handleDone}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default EditModal;
