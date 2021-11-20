import React, {useState, useEffect, useRef} from 'react';
import { ButtonGroup, Button, Box } from '@mui/material'

import './Pages.css';

import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);



function Trend() {
    const [data] = useState([25, 50, 35, 15, 94, 10]);
    // const [date] = useState(['10/1/2015', '10/2/2015', '10/3/2015', '10/4/2015', '10/5/2015', '10/6/2015', '10/7/2015', '10/8/2015', '10/9/2015', '10/10/2015', '10/11/2015', '10/12/2015', '10/13/2015', '10/14/2015', '10/15/2015', '10/16/2015']);
    const [dummyData] = useState([
        {date: '10/1/2015', value: 10 },
        {date: '10/2/2015', value: 15 },
        {date: '10/3/2015', value: 35 },
        {date: '10/4/2015', value: 50 },
        {date: '10/5/2015', value: 25 },
        {date: '10/6/2015', value: 94 },
        {date: '10/7/2015', value: 35 },
        {date: '10/8/2015', value: 50 },
        {date: '10/9/2015', value: 15 },
        {date: '10/10/2015', value: 50 },
    ])
    
    const handleClickAspect = () => {
        
    }

    return (
        <div>
            <h2>Your Trends Overtime</h2>
            <div className="panels">
                <h4 className="panel-title">Overall Trend</h4>
                <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                    <Button onClick={() => handleClickAspect('physical')}>Physical Health</Button>
                    <Button onClick={() => handleClickAspect('mental')}>Mental Health</Button>
                    <Button onClick={() => handleClickAspect('social')}>Social Health</Button>
                </ButtonGroup>
                <Box sx={{ my: "1.5rem" }} style={{border: '0px solid red', height: '93%'}}>
                    <Plot
                        data={[
                        {
                            x: [1, 2, 3],
                            y: [2, 6, 3],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'red'},
                        },
                        {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                        ]}
                        layout={{width: 320, height: 240, title: 'A Fancy Plot'}}
                    />
                </Box>
                <Box sx={{ my: "1.5rem" }} style={{border: '0px solid red', height: '93%'}}>
                </Box>
            </div>
            <div className="panels">
                <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <h4 className="panel-title">Detailed trends for each metric</h4>
                    {/*<ButtonGroup sx={{ m: 2 }} variant="outlined" aria-label="outlined primary button group">
                        <Button startIcon={<ViewAgendaIcon />}>Vertical View</Button>
                        <Button startIcon={<ViewColumnIcon/>}>Horizontal View</Button>
                    </ButtonGroup>*/}
                </Box>
                <div style={{border: '0px solid red', height: '93%'}}>

                </div>
            </div>
        </div>
    )
}

export default Trend;