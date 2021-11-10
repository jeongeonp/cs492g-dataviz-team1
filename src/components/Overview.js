import React, {useRef, useState, useEffect} from 'react';
import './Pages.css';
import * as d3 from "d3";
import Radar from 'react-d3-radar';
import { Grid } from '@mui/material'
import { ReactRadarChart } from 'd3-radarchart';


function Overview() {
    // Const over here
    const [highlighted, setHighlighted] = useState(null);


    const axisConfig = [
        {label: 'Mental', axisId: "mental", axisValueMax: 200, axisValueMin: 0},
        {label: 'Social', axisId: "social", axisValueMax: 200, axisValueMin: 0},
        {label: 'Physical', axisId: "physical", axisValueMax: 200, axisValueMin: 0},
    ];

    const data = [
        {
          label: 'My health',
          seriesId: 'my',
          dragEnabled: true,
          showCircle: true,
          circleHighlight: true,
          fill: 'royalblue',
          data: [
            {axis: "mental", value: 154},
            {axis: "social", value: 85},
            {axis: "physical", value: 126},
          ]
        },
        {
            label: "Others' health",
            seriesId: 'others',
            dragEnabled: false,
            showCircle: false,
            circleHighlight: true,
            fill: 'gray',
            data: [
              {axis: "mental", value: 100},
              {axis: "social", value: 100},
              {axis: "physical", value: 100},
            ]
          },
    ]

    const options = {
        chartRootName: 'example',
        data,
        dims: {
          width: 500,
          height: 500,
        },
        showLegend: true,
        rootElementId: 'chart',
        axisConfig,
        options: {
            axis: {
                rotateTextWithAxis: false,
            },
            legend: {
                title: 'Colors'
            }
        }
    };
    
    /*
    const dummyData = {
        variables: [
        {key: 'physical', label: 'Physical'},
        {key: 'social', label: 'Social'},
        {key: 'mental', label: 'Mental'},
        ],
        sets: [
        {
            key: 'me',
            label: 'My Scores',
            values: {
                physical: 105,
                social: 80,
                mental: 137,
            },
        },
        {
            key: 'everyone',
            label: 'Everyone',
            values: {
                physical: 100,
                social: 100,
                mental: 100,
            },
        },
        ],}

    */

    const hover = (hovered) => {
        if (hovered === null && highlighted === null) {
            return;
        }
        if (highlighted && hovered && hovered.key === highlighted.key) {
            return;
        }
        setHighlighted(hovered);
    }

    return (
        <div className="panels">
            <Grid container alignItems="center" justifyContent="space-between" spacing={1} >
                <Grid item xs='6' style={{border: '0px solid black'}}>
                <h4 className="panel-title">Overview Page (HEALTH TRIANGLE)</h4>
                <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                    {/*
                    <Radar
                        width={500}
                        height={500}
                        padding={70}
                        domainMax={200}
                        highlighted={highlighted}
                        onHover={hover}
                        data={dummyData}
                        options={{

                        }}
                    />*/}
                    <ReactRadarChart
                    rootElementProps={{ className: 'chartRootClass' }}
                    {...options} />
                </Grid>
                <Grid item xs='6' style={{border: '0px solid black'}}>
                    <h4 className="panel-title" style={{verticalAlign: 'top'}}>CURRENT GOALS</h4>
                    <div style={{width: '500px', height: '550px'}}></div>
                </Grid>
                <Grid item xs='12' style={{border: '0px solid black', height: '40%'}}>
                    <h4 className="panel-title">ASPECT PERCENTAGE</h4>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Overview;