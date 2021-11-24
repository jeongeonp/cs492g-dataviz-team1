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

    var physical_goal_valid = false
    var mental_goal_valid = false
    var social_goal_valid = false

    var physical_ele_valid = false
    var mental_ele_valid = false
    var social_ele_valid = false

    if (parseInt(physicalGoal) >= -100 && parseInt(physicalGoal) <= 100){
      physical_goal_valid = true
    } 

    if (parseInt(mentalGoal) >= -100 && parseInt(mentalGoal) <= 100){
      mental_goal_valid = true
    }

    if (parseInt(socialGoal) >= -100 && parseInt(socialGoal) <= 100){
      social_goal_valid = true
    }

    if (physicalEle.Calories || physicalEle.Pedometer) {
      physical_ele_valid = true
    }

    if (mentalEle.Valence || mentalEle.Arousal || mentalEle.Attention || mentalEle.Stress) {
      mental_ele_valid = true
    }

    if (socialEle.CallLog || socialEle.MessageLog || socialEle.SNSProp) {
      social_ele_valid = true
    }

    setPhysicalGoalValid(physical_goal_valid);
    setMentalGoalValid(mental_goal_valid);
    setSocialGoalValid(social_goal_valid);

    setPhysicalEleValid(physical_ele_valid)
    setMentalEleValid(mental_ele_valid)
    setSocialEleValid(social_ele_valid)

    var check = physical_goal_valid && mental_goal_valid && social_goal_valid && physical_ele_valid && mental_ele_valid && social_ele_valid;

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

  // const handlePhysicalGoal = (val) => {
  //   if (parseInt(val) >= -100 && parseInt(val) <= 100){
  //     setPhysicalGoalValid(true);
  //     setPhysicalGoal(val);
  //   } else {
  //     setPhysicalGoalValid(false);
  //   }
  // }

  // const handleMentalGoal = (val) => {
  //   if (parseInt(val) >= -100 && parseInt(val) <= 100){
  //     setMentalGoalValid(true);
  //     setMentalGoal(val);
  //   } else {
  //     setMentalGoalValid(false);
  //   }
  // }

  // const handleSocialGoal = (val) => {
  //   if (parseInt(val) >= -100 && parseInt(val) <= 100){
  //     setSocialGoalValid(true);
  //     setSocialGoal(val);
  //   } else {
  //     setSocialGoalValid(false);
  //   }
  // }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Edit Mode</Button>}
    >
      <Modal.Header>
        Edit Mode
        <Popup content='original goal is set to 0' trigger={<Icon disabled name='help circle' />} size='tiny'/>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Physical</Header>

          <div>
            <Form.Checkbox
              style={{marginBottom: '10px'}}
              color={physicalEle.Calories ? 'teal': ''} 
              onClick={() => setPhysicalEle({...physicalEle, Calories: !physicalEle.Calories})} 
              label='Calories' 
              checked={physicalEle.Calories} 
            />
            <Form.Checkbox 
              color={physicalEle.Pedometer ? 'teal': ''} 
              onClick={() => setPhysicalEle({...physicalEle, Pedometer: !physicalEle.Pedometer})} 
              label='Pedometer' 
              checked={physicalEle.Pedometer} 
            />
            <br/>
            {!physicalEleValid && <span style={{color: 'red'}}>You should select at least 1 element in each aspect</span>}
          </div>
          <Input
            style={{width: '100px', marginTop: '10px'}} 
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'flag checkered',
              content: 'Goal',
            }}
            actionPosition='left'
            placeholder='-100 ~ 100'
            value={physicalGoal}
            onChange={(e) => setPhysicalGoal(e.target.value)}
          />
          <br/>
          {!physicalGoalValid && <span style={{color: 'red'}}>Goal should be in the range between -100 to 100</span>}

          <Header>Mental</Header>

          <div>
            <Form.Checkbox 
              style={{marginBottom: '10px'}}
              color={mentalEle.Valence ? 'teal': ''} 
              onClick={() => setMentalEle({...mentalEle, Valence: !mentalEle.Valence})} 
              label='Valence'
              checked={mentalEle.Valence} 
            />
            <Form.Checkbox 
              style={{marginBottom: '10px'}}
              color={mentalEle.Arousal ? 'teal': ''} 
              onClick={() => setMentalEle({...mentalEle, Arousal: !mentalEle.Arousal})} 
              label='Arousal' 
              checked={mentalEle.Arousal}
            />
            <Form.Checkbox
              style={{marginBottom: '10px'}} 
              color={mentalEle.Attention ? 'teal': ''} 
              onClick={() => setMentalEle({...mentalEle, Attention: !mentalEle.Attention})} 
              label='Attention' 
              checked={mentalEle.Attention}
            />
            <Form.Checkbox 
              color={mentalEle.Stress ? 'teal': ''} 
              onClick={() => setMentalEle({...mentalEle, Stress: !mentalEle.Stress})} 
              label='Stress' 
              checked={mentalEle.Stress}
            />
            <br/>
            {!mentalEleValid && <span style={{color: 'red'}}>You should select at least 1 element in each aspect</span>}
          </div>
          <Input 
            style={{width: '100px', marginTop: '10px'}}  
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'flag checkered',
              content: 'Goal',
            }}
            actionPosition='left'
            placeholder='-100 ~ 100'
            value={mentalGoal}
            onChange={(e) => setMentalGoal(e.target.value)}
          />
          <br/>
          {!mentalGoalValid && <span style={{color: 'red'}}>Goal should be in the range between -100 to 100</span>}

          <Header>Social</Header>

          <div>
            <Form.Checkbox 
              style={{marginBottom: '10px'}}
              color={socialEle.CallLog ? 'teal': ''} 
              onClick={() => setSocialEle({...socialEle, CallLog: !socialEle.CallLog})} 
              label='Call Log' 
              checked={socialEle.CallLog}
            />
            <Form.Checkbox 
              style={{marginBottom: '10px'}}
              color={socialEle.MessageLog ? 'teal': ''} 
              onClick={() => setSocialEle({...socialEle, MessageLog: !socialEle.MessageLog})} 
              label='Message Log' 
              checked={socialEle.MessageLog}
            />
            <Form.Checkbox 
              color={socialEle.SNSProp ? 'teal': ''} 
              onClick={() => setSocialEle({...socialEle, SNSProp: !socialEle.SNSProp})} 
              label='SNS APP Usage Ratio' 
              checked={socialEle.SNSProp}
            />
            <br/>
            {!socialEleValid && <span style={{color: 'red'}}>You should select at least 1 element in each aspect</span>}
          </div>
          <Input 
            style={{width: '100px', marginTop: '10px'}} 
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'flag checkered',
              content: 'Goal',
            }}
            actionPosition='left'
            placeholder='-100 ~ 100'
            value={socialGoal}
            onChange={(e) => setSocialGoal(e.target.value)}
          />
          <br/>
          {!socialGoalValid && <span style={{color: 'red'}}>Goal should be in the range between -100 to 100</span>}

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
