import React, {useRef, useState, useEffect} from 'react';
import './Pages.css';
// import * as d3 from "d3";
import { Grid } from '@mui/material'
// import { ReactRadarChart } from 'd3-radarchart';

import createPlotlyComponent from 'react-plotly.js/factory';
import _Plot from 'plotly.js/dist/plotly-cartesian';
import Plotly from 'plotly.js';

const Plot = createPlotlyComponent(Plotly);

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
          dragEnabled: false,
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
    
    const scatterData = [
        {
        type: 'scatterpolar',
        r: [39, 28, 8, 7, 28, 39],
        theta: ['Physical', 'Social', 'Mental'],
        fill: 'toself',
        name: 'You'
        },
        {
        type: 'scatterpolar',
        r: [1.5, 10, 39, 31, 15, 1.5],
        theta: ['Physical', 'Social', 'Mental'],
        fill: 'toself',
        name: 'Other Users'
        }
      ]
      
    const scatterLayout = {
        polar: {
          radialaxis: {
            visible: true,
            range: [0, 50]
          }
        }
    }

    const barChartData = [{
        type: 'bar',
        x: [20, 14, 23, 34],
        y: ['Overall', 'Calories Burned', 'Steps', 'UV Exposure'],
        orientation: 'h',
      }];
    const barLayout = {
        autosize: false,
        width: 1400,
        height: 400,
        margin: {
            l: 150,
            r: 50,
            b: 100,
            t: 40,
            pad: 4
          },
    }
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

    const clickAspect = (e) => {
        console.log(e)
    }

    return (
        <div>
            <h2>Overview Page</h2>
            <div className="panels">
                <Grid container alignItems="center" justifyContent="space-between" spacing={1} >
                    <Grid item xs='7' style={{border: '0px solid black'}}>
                        <h4 className="panel-title">HEALTH TRIANGLE</h4>
                        <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                        <Plot
                            data={scatterData}
                            layout={scatterLayout}
                        />
                        
                    </Grid>
                    <Grid item xs='5' style={{border: '0px solid black'}}>
                        <h4 className="panel-title" style={{verticalAlign: 'top'}}>CURRENT GOALS</h4>
                        <div style={{width: '500px', height: '550px'}}></div>
                    </Grid>
                    <Grid item xs='12' style={{border: '0px solid black', height: '40%'}}>
                        <h4 className="panel-title">ASPECT PERCENTAGE</h4>
                        <h2 style={{margin: '0'}}>Physical</h2>
                        <Plot
                            data={barChartData}
                            layout={barLayout}
                        />
                    </Grid>
                </Grid>
                
            </div>
        </div>
    )
}

export default Overview;