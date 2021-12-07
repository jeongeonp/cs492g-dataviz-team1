import React, { useState, } from 'react';

import { Button, Header, Form, Modal, Input,  Popup, Icon, Grid, Label } from 'semantic-ui-react'
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

  const question_context =
  'Initial value for the goal is set to 0. You can change this value between -100 to 100. \nBut as this score is based on the z score, we highly recommend to set the value between -25 to 25. You can add or remove each elements for tracking with checkbox. Make sure at least 1 element is contained in each health aspect.'


  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      closeOnDimmerClick={false}
      trigger={<Button size="small"  style={{backgroundColor: '#2196f3', color: 'white'}} floated='left'>Edit Mode <Icon style={{margin: '0px 0px 0px 3px', padding: '0px'}} name="edit outline"/></Button>}
    >
      <Modal.Header>
        Edit Mode: Define your own health!
        {/*<Popup content={question_context} trigger={<Icon disabled name='help circle' />} wide='very'/>*/}
      </Modal.Header>
      <Modal.Content style={{paddingTop: '15px'}}>
        <Modal.Description>
          <div style={{marginBottom: '30px', paddingTop: '0'}}>
          <span style={{color: 'black'}}>
            This is the <b>edit mode</b> where you can <u>(1) choose the elements you want to include</u> and <u>(2) set goals</u> for each health aspect. <br/>
          </span>
          <br/>
          <span style={{color: 'black'}}>CHECKBOXES:</span> In the beginning, all elements are included in the calculation of your health. <br/>
          Please add or remove elements for tracking with checkboxes. Make sure at least 1 element is included for each health aspect. <br/>
          <br/>
          <span style={{color: 'black'}}>GOALS:</span> The initial values for the goals are set to 0. You can change the value between -100 and 100. <br/>
          Since the values are calculated from z-scores, we highly recommend that you <b>set the values between -25 and 25</b>. <br/>
          </div>

          <Grid columns={3} divided>
          <Grid.Row>
          <Grid.Column>
          <Header>Physical Health</Header>
          <h4 style={{marginTop: '0px'}}>Elements</h4>
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
            style={{width: '100px'}} 
            placeholder='-100 ~ 100'
            labelPosition='right'
            value={physicalGoal}
            onChange={(e) => setPhysicalGoal(e.target.value)}
          >
            <Label color="blue"><Icon name='flag checkered'></Icon>Goal</Label>
            <input/>
            <Label basic>%</Label>
          </Input>
          <br/>
          {!physicalGoalValid && <span style={{color: 'red'}}>Goal should be in the range between -100 to 100</span>}
          </Grid.Column>



          <Grid.Column>
          <Header>Mental Health</Header>
          <h4 style={{marginTop: '0px'}}>Elements</h4>
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
            style={{width: '100px'}}  
            placeholder='-100 ~ 100'
            labelPosition='right'
            value={mentalGoal}
            onChange={(e) => setMentalGoal(e.target.value)}
          >
            <Label color="blue"><Icon name='flag checkered'></Icon>Goal</Label>
            <input/>
            <Label basic>%</Label>
          </Input>
          <br/>
          {!mentalGoalValid && <span style={{color: 'red'}}>Goal should be in the range between -100 to 100</span>}
          </Grid.Column>



          <Grid.Column>
          <Header>Social Health</Header>
          <h4 style={{marginTop: '0px'}}>Elements</h4>
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
            style={{width: '100px', marginBottom: '0'}} 
            placeholder='-100 ~ 100'
            labelPosition='right'
            value={socialGoal}
            onChange={(e) => setSocialGoal(e.target.value)}
          >
            <Label color="blue"><Icon name='flag checkered'></Icon>Goal</Label>
            <input/>
            <Label basic>%</Label>
          </Input>
          <br/>
          {!socialGoalValid && <span style={{color: 'red'}}>Goal should be in the range between -100 to 100</span>}
          </Grid.Column>
          </Grid.Row>
          </Grid>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='' onClick={handleCancel}>
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
