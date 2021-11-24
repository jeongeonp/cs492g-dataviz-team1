import React, { useState, useEffect } from 'react';

import './App.css';
import Overview from './components/Overview';
import Trend from './components/Trend';
import Activities from './components/Activities-lib';
import EditModal from './components/EditModal';
import HelpModal from './components/HelpModal';

import { Grid, Box, Tab, Tabs } from '@mui/material'
import { TabContext, TabList, TabPanel} from '@mui/lab'
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import 'semantic-ui-css/semantic.min.css'

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


  return (
    <div >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19)', padding: '0 15px'}}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={1} >
            <Grid item xs='auto'>
              <h3>CS492(G) Team 1</h3>
            </Grid> 
              <EditModal 
                activatedEle = {activatedEle}
                changeEle = {setActivatedEle}
                goals = {goals}
                changeGoals = {setGoals}
              />
            <Grid>
            </Grid> 
              <HelpModal />
            <Grid>
            </Grid>
            <Grid item xs='auto'>
            <TabList onChange={handleChange} aria-label="lab API tabs example" style={{}}>
              <Tab icon={<ChangeHistoryIcon />} iconPosition="start" label="Overview" value="1" />
              <Tab icon={<TrendingUpIcon />} iconPosition="start" label="Trend" value="2" />
              <Tab icon={<LocalActivityIcon />} iconPosition="start" label="Activity Management" value="3" />
            </TabList>
            </Grid>
          </Grid>
        </Box>
        <TabPanel value="1" style={{border: '0px solid red'}}>
          <Overview />
        </TabPanel>
        <TabPanel value="2">
          <Trend />
        </TabPanel>
        <TabPanel value="3">
          <Activities />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default App;
