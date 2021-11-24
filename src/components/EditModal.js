import React, { useState, } from 'react';

import { Button, Header, Form, Modal, Input,  Popup, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


function EditModal ({ activatedEle, changeEle, goals, changeGoals }) {
  const [open, setOpen] = useState(false);

  const [physicalGoal, setPhysicalGoal] = useState(goals.physical);
  const [mentalGoal, setMentalGoal] = useState(goals.mental);
  const [socialGoal, setSocialGoal] = useState(goals.social);

  const [physicalEle, setPhysicalEle] = useState(activatedEle.physical);
  const [mentalEle, setMentalEle] = useState(activatedEle.mental);
  const [socialEle, setSocialEle] = useState(activatedEle.social);

  const [physicalGoalValid, setPhysicalGoalValid] = useState(true);
  const [mentalGoalValid, setMentalGoalValid] = useState(true);
  const [socialGoalValid, setSocialGoalValid] = useState(true);

  const [physicalEleValid, setPhysicalEleValid] = useState(true);
  const [mentalEleValid, setMentalEleValid] = useState(true);
  const [socialEleValid, setSocialEleValid] = useState(true);

  const handleDone = () => {
    var check = physicalEleValid && mentalGoalValid && socialGoalValid && physicalEleValid && mentalEleValid && socialEleValid;

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

    if (check) {
      changeGoals(updatedGoal);
      changeEle(updatedEle);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setPhysicalGoal(goals.physical)
    setMentalGoal(goals.mental)
    setSocialGoal(goals.social)

    setPhysicalEle(activatedEle.physical)
    setMentalEle(activatedEle.mental)
    setSocialEle(activatedEle.social)

    setOpen(false);
  };

  const handlePhysicalEleChange = (ele) => {

    setPhysicalEle({...physicalEle, ele: !physicalEle.ele})
  }

  const handlePhysicalGoal = (val) => {
    if (parseInt(val) >= -100 && parseInt(val) <= 100){
      setPhysicalGoalValid(true);
      setPhysicalGoal(val);
    } else {
      setPhysicalGoalValid(false);
    }
  }

  const handleMentalGoal = (val) => {
    if (parseInt(val) >= -100 && parseInt(val) <= 100){
      setMentalGoalValid(true);
      setMentalGoal(val);
    } else {
      setMentalGoalValid(false);
    }
  }

  const handleSocialGoal = (val) => {
    if (parseInt(val) >= -100 && parseInt(val) <= 100){
      setSocialGoalValid(true);
      setSocialGoal(val);
    } else {
      setSocialGoalValid(false);
    }
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
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'flag checkered',
              content: 'Goal',
            }}
            actionPosition='left'
            placeholder='-100 ~ 100'
            value={physicalGoal}
            onChange={(e) => handlePhysicalGoal(e.target.value)}
          />
          <div>
            <Button color={physicalEle.Calories ? 'teal': ''} onClick={() => setPhysicalEle({...physicalEle, Calories: !physicalEle.Calories})}>Calories</Button>
            <Button color={physicalEle.Pedometer ? 'teal': ''} onClick={() => setPhysicalEle({...physicalEle, Pedometer: !physicalEle.Pedometer})}>Pedometer</Button>
          </div>

          <Header>Mental</Header>
          <Input 
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'flag checkered',
              content: 'Goal',
            }}
            actionPosition='left'
            placeholder='-100 ~ 100'
            value={mentalGoal}
            onChange={(e) => handleMentalGoal(e.target.value)}
          />
          <div>
            <Button color={mentalEle.Valence ? 'teal': ''} onClick={(e) => setMentalEle({...mentalEle, Valence: !mentalEle.Valence})}>Valence</Button>
            <Button color={mentalEle.Arousal ? 'teal': ''} onClick={(e) => setMentalEle({...mentalEle, Arousal: !mentalEle.Arousal})}>Arousal</Button>
            <Button color={mentalEle.Attention ? 'teal': ''} onClick={(e) => setMentalEle({...mentalEle, Attention: !mentalEle.Attention})}>Attention</Button>
            <Button color={mentalEle.Stress ? 'teal': ''} onClick={(e) => setMentalEle({...mentalEle, Stress: !mentalEle.Stress})}>Stress</Button>
          </div>

          <Header>Social</Header>
          <Input 
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'flag checkered',
              content: 'Goal',
            }}
            actionPosition='left'
            placeholder='-100 ~ 100'
            value={socialGoal}
            onChange={(e) => handleSocialGoal(e.target.value)}
          />
          <div>
            <Button color={socialEle.CallLog ? 'teal': ''} onClick={(e) => setMentalEle({...socialEle, CallLog: !socialEle.CallLog})}>Call Log</Button>
            <Button color={socialEle.MessageLog ? 'teal': ''} onClick={(e) => setMentalEle({...socialEle, MessageLog: !socialEle.MessageLog})}>Message Log</Button>
            <Button color={socialEle.SNSProp ? 'teal': ''} onClick={(e) => setMentalEle({...socialEle, SNSProp: !socialEle.SNSProp})}>SNS APP Usage Ratio</Button>
          </div>

        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={handleCancel}>
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
