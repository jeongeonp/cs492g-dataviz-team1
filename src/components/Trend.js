import React, {useState, useEffect, useRef} from 'react';
import { Box } from '@mui/material'
import { Button } from 'semantic-ui-react'

import './Pages.css';

import physical from '../assets/physical_agg.json';
import mental from '../assets/mental_agg.json';

import mental_p3012 from '../assets/mental-p3012.json';
import mental_others from '../assets/mental-others.json';

import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);


console.log(physical)

var total = {}

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

    const [multipleMy, setMultipleMy] = useState(null)
    const [multipleOthers, setMultipleOthers] = useState(null)

    const [selectedAspect, setSelectedAspect] = useState('physical')

    // move to hook later
    const [numMetric, setNumMetric] = useState({physical: ['Calories', 'Pedometer'], mental: ['Valence', 'Arousal', 'Attention', 'Stress'], social: ['Calllog', 'Messagelog', 'SNSlog']})

    useEffect(() => {
        const newMultiple = {physical: {}, mental: {}}
        const newOthersMultiple = {physical: {}, mental: {}}
        console.log(numMetric[selectedAspect])

        for (var i in numMetric['physical']) {
            newMultiple['physical'][numMetric['physical'][i]] = {x: dates.x, y: Object.values(physical['p3012_'+numMetric['physical'][i]])}
            newOthersMultiple['physical'][numMetric['physical'][i]] = {x: dates.x, y: Object.values(physical['others_'+numMetric['physical'][i]])}
        }
        for (var i in numMetric['mental']) {
            newMultiple['mental'][numMetric['mental'][i]] = {x: dates.x, y: Object.values(mental['p3012_'+numMetric['mental'][i]])}
            newOthersMultiple['mental'][numMetric['mental'][i]] = {x: dates.x, y: Object.values(mental['others_'+numMetric['mental'][i]])}
        }
        /*
        for (var i in numMetric['social']) {
            newMultiple['social'][numMetric['social'][i]] = {x: dates.x, y: Object.values(social['p3012_'+numMetric['social'][i]])}
            newOthersMultiple['social'][numMetric['social'][i]] = {x: dates.x, y: Object.values(social['others_'+numMetric['social'][i]])}
        }
        */
        
        //console.log(newMultiple)
        //console.log(newOthersMultiple)
        setMultipleMy(newMultiple)
        setMultipleOthers(newOthersMultiple)


        console.log('selectedAspect changed')
        changeAspect(selectedAspect)
    }, [selectedAspect])

    const handleClickAspect = (e) => {
        setSelectedAspect(e)
    }

    const changeAspect = (e) => {
        if (e === 'physical') {
            console.log(physical)
            const newPhysical = {x: dates.x, y: Object.values(physical.z_physical)}
            const newOthersPhysical = {x: dates.x, y: [0, 0, 0, 0, 0, 0, 0]}

            setMyData(newPhysical)
            setOthersData(newOthersPhysical)

            //console.log(e+ ' change done!')
        }
        
        if (e === 'mental') {
            const newMental = {x: dates.x, y: Object.values(mental.z_mental)}
            const newOthersMental = {x: dates.x, y: [0, 0, 0, 0, 0, 0, 0]}

            setMyData(newMental)
            setOthersData(newOthersMental)

            //console.log(e+' change done!')
        }

        if (e === 'social') {

        }
    }
    

    return (
        <div>
            <h2>Your Trends Overtime</h2>
            <div className="panels">
                <h4 className="panel-title">Overall Trend</h4>
                <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                <Button.Group variant="outlined" aria-label="outlined primary button group">
                    <Button color={selectedAspect === 'physical'? 'twitter': ''} onClick={() => handleClickAspect('physical')}>Physical Health</Button>
                    <Button color={selectedAspect === 'mental'? 'twitter': ''} onClick={() => handleClickAspect('mental')}>Mental Health</Button>
                    <Button color={selectedAspect === 'social'? 'twitter': ''} onClick={() => handleClickAspect('social')}>Social Health</Button>
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
                        layout={{width: 1000, height: 600, title: selectedAspect.charAt(0).toUpperCase()+selectedAspect.slice(1)+" Health", yaxis: {range: [-4, 4]}}}
                    />
                </Box>
            </div>
            <div className="panels">
                <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <h4 className="panel-title">Detailed trends for each metric</h4> 
                </Box>
                <div style={{border: '0px solid red', height: '93%'}}>
                    {multipleMy !== null && multipleOthers !== null
                    ? numMetric[selectedAspect].map((e) => (
                        multipleMy[selectedAspect] !== null && multipleOthers[selectedAspect] !== null
                        ? <Plot key={e}
                            data={[
                            {
                                x: multipleMy[selectedAspect][e].x,
                                y: multipleMy[selectedAspect][e].y,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: '#F88923'},
                                name: 'You',
                            },
                            {
                                x: multipleOthers[selectedAspect][e].x,
                                y: multipleOthers[selectedAspect][e].y,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: 'gray'},
                                name: "Other Users",
                            },
                            ]}
                            layout={{width: 500, height: 300, title: e}}
                        />
                        : <div>No data to show!</div>
                    ))
                    : <div>No data to show!</div>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Trend;