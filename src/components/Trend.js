import React, {useState, useEffect} from 'react';
import { ButtonGroup, Button, Box } from '@mui/material'
import TrendChart from './TrendChart'
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';

// TrendChart Dummy data
import schcData from "../dummyData/SCHC.json";
import vcitData from "../dummyData/VCIT.json";
import portfolioData from "../dummyData/PORTFOLIO.json";

import './Pages.css';

const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 }
  };


// Code is informed by https://blog.griddynamics.com/using-d3-js-with-react-js-an-8-step-comprehensive-manual/ 
function Trend() {
    // Const over here


    return (
        <div>
            <h2>Your Trends Overtime</h2>
            <div className="panels">
                <h4 className="panel-title">Overall Trend</h4>
                <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                    <Button>Physical Health</Button>
                    <Button>Mental Health</Button>
                    <Button>Social Health</Button>
                </ButtonGroup>
                <Box sx={{ my: "1.5rem" }} style={{border: '0px solid red', height: '93%'}}>
                    <TrendChart data={[portfolioData, schcData, vcitData]} dimensions={dimensions}/>
                </Box>
            </div>
            <div className="panels">
                <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <h4 className="panel-title">Detailed trends for each metric</h4>
                    <ButtonGroup sx={{ m: 2 }} variant="outlined" aria-label="outlined primary button group">
                        <Button startIcon={<ViewAgendaIcon />}>Vertical View</Button>
                        <Button startIcon={<ViewColumnIcon/>}>Horizontal View</Button>
                    </ButtonGroup>
                </Box>
                <div style={{border: '0px solid red', height: '93%'}}>

                </div>
            </div>
        </div>
    )
}

export default Trend;