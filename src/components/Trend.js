import React, {useState, useEffect, useRef} from 'react';
import { Box } from '@mui/material'
import { Button } from 'semantic-ui-react'

import './Pages.css';

import mental_p3012 from '../assets/mental-p3012.json';
import mental_others from '../assets/mental-others.json';

import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);


console.log(mental_others)
console.log(Object.values(mental_others.total_mean))

const times = Object.keys(mental_p3012.total_mean)
var total = {}

for (var t in times) {
    //console.log(times[t])
    total[times[t]] = mental_p3012.Valence[times[t]] + mental_p3012.Arousal[times[t]] + mental_p3012.Attention[times[t]] + mental_p3012.Stress[times[t]]
}

var mental_total = mental_p3012
mental_total['Total'] = total

var dates = {
    x: [
        "2019-04-30",
        "2019-05-01",
        "2019-05-02",
        "2019-05-03",
        "2019-05-04",
        "2019-05-05",
        "2019-05-06",
    ],

    y: []

}

function Trend() {
    const [myData, setMyData] = useState(dates)
    const [othersData, setOthersData] = useState(dates)
    
    const handleClickAspect = (e) => {
        if (e === 'mental') {
            const newMental = {x: dates.x, y: Object.values(mental_total.total_mean)}
            const newOthersMental = {x: dates.x, y: Object.values(mental_others.total_mean)}
            setMyData(newMental)
            setOthersData(newOthersMental)
        }
    }

    return (
        <div>
            <h2>Your Trends Overtime</h2>
            <div className="panels">
                <h4 className="panel-title">Overall Trend</h4>
                <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                <Button.Group variant="outlined" aria-label="outlined primary button group">
                    <Button color='twitter' onClick={() => handleClickAspect('physical')}>Physical Health</Button>
                    <Button color='twitter' onClick={() => handleClickAspect('mental')}>Mental Health</Button>
                    <Button color='twitter' onClick={() => handleClickAspect('social')}>Social Health</Button>
                </Button.Group>
                <Box sx={{ my: "1.5rem" }} style={{border: '0px solid red', height: '93%'}}>
                    <Plot
                        data={[
                        {
                            x: myData.x,
                            y: myData.y,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: '#F88923'},
                            name: 'You',
                        },
                        {
                            x: othersData.x,
                            y: othersData.y,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'gray'},
                            name: "Other Users' Average",
                        },
                        ]}
                        layout={{width: 1000, height: 600}}
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