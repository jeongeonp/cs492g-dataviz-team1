import React, { useState, useEffect } from 'react';

import './App.css';
import Overview from './components/Overview';
import Trend from './components/Trend';
import Activities from './components/Activities-lib';
import EditModal from './components/EditModal';
import HelpModal from './components/HelpModal';

import { Box, Tab, Tabs } from '@mui/material'
import { TabContext, TabList, TabPanel} from '@mui/lab'
import { Grid,Image } from 'semantic-ui-react'

import { purple, deepPurple } from '@mui/material/colors';

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import 'semantic-ui-css/semantic.min.css'
import reBalanceLogo from './assets/rebalance-logo.svg';

const initialActivatedEle = {
  physical: {
    Calories: true,
    Pedometer: true,
  },
  mental: {
    Valence: true,
    Arousal: true,
    Attention: true,
    Stress: true,
  }, 
  social: {
    CallLog: true,
    MessageLog: true,
    SNSProp: true,
  }
};

const initialGoals = {
  physical: 0,
  mental: 0,
  social: 0
}

function App() {
  const [value, setValue] = useState('1');

  const [goals, setGoals] = useState(initialGoals)
  const [activatedEle, setActivatedEle] = useState(initialActivatedEle);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabcolor = deepPurple[800]

  return (
    <div >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 0, borderColor: 'divider', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19)', padding: '0 15px'}}>
          <Grid>
            <Grid.Row style={{paddingBottom: '0'}} columns='equal' centered>
              <Grid.Column textAlign='justified'>
              {/*<h3>reBalance</h3>*/}
                <Image style={{height: '35px', marginTop: '20px'}} src={reBalanceLogo}></Image>
              </Grid.Column> 
              <Grid.Column style={{paddingTop: '20px'}} textAlign='center'>
                <HelpModal />
                <EditModal 
                  activatedEle = {activatedEle}
                  changeEle = {setActivatedEle}
                  goals = {goals}
                  changeGoals = {setGoals}
                />
              </Grid.Column>
              <Grid.Column columns={6}>
              <TabList 
                onChange={handleChange} 
                aria-label="lab API tabs example" 
                //TabIndicatorProps={{style: {background:'#5a49e4', color: '#5a49e4'}}}
              >
                <Tab icon={<ChangeHistoryIcon style={{color: "#"}}/>} iconPosition="start" label={<span style={{ color: '#' }}>Overview</span>} value="1" />
                <Tab icon={<TrendingUpIcon />} iconPosition="start" label="Trend" value="2" />
                <Tab icon={<LocalActivityIcon />} iconPosition="start" label="Activity Management" value="3" />
              </TabList>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Box>
        <TabPanel value="1" style={{border: '0px solid red'}}>
          <Overview activatedEle = {activatedEle} initialGoals={goals}/>
        </TabPanel>
        <TabPanel value="2">
          <Trend 
            activatedEle = {activatedEle}
          />
        </TabPanel>
        <TabPanel value="3">
          <Activities 
            activatedEle = {activatedEle} 
          />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default App;
