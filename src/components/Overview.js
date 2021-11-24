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
    const scatterPlotRef = useRef();


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

    const scatterData = [
        {
            type: 'scatterpolar',
            mode: 'lines',
            r: [39, 28, 8, 7, 28, 39],
            theta: ['Physical', 'Social', 'Mental'],
            fill: 'toself',
            name: 'You',
            // subplot: "polar"
        },
        {
            type: 'scatterpolar',
            mode: 'lines',
            r: [28, 7, 8, 8, 10, 39],
            theta: ['Physical', 'Social', 'Mental'],
            fill: 'toself',
            name: 'Other Users',
            // subplot: "polar2"
        },
        {
            type: 'scatterpolar',
            mode: 'markers',
            r: [28, 7, 8],
            theta: ['Physical', 'Social', 'Mental'],
            marker: {
                symbol: "square",
                color: 'black',
            },
            fill: null,
            name: 'Goal',
        }
      ]
      
    const scatterLayout = {
        polar: {
            // bgcolor: 'red',
            // domain: {
            //     x: [0, 0.5],
            //     y: [0, 0.5]
            // },
            radialaxis: {
              visible: true,
              range: [-100, 100], // 0부터 시작해서 200까지 나타내게!
              color: '#777',
            },
            angularaxis: {
                // gridcolor: 'red',    
                rotation: 210,
                color: '#777',
            },
        },
    }

    // Plotly.newPlot('graphDiv', data, layout);
    const categories = ['Physical', 'Social', 'Mental'];
    // values
    const value1 = [39, 28, 8, 7, 28, 39, 100, -100];
    const value2 = [28, 7, 8, 8, 10, 39, -50, 50];
    const rAllMax = Math.max(value1+value2);

    // colors
    const range1 = [-100,0];
    const rangeColors = ['rgba(255, 0, 0, 0.9)', 'rgba(0, 255, 0, 0.9)'];

    // calculations
    const slices = value1.length;
    const fields = [Math.max(value1)]*slices;
    const circle_split = [360/slices]*(slices);
    const theta = 0;
    const thetas = [0];
    for (let i=0; i < circle_split.length; i++) {
        const t = circle_split[i];
        theta = theta + t;
        thetas.push(theta);
    }

    // label positions
    const positions = ['middle right', 'middle right', 'bottom center', 'middle left', 'middle left', 'middle left']
    
    // background
    const barPolarData = []
    for (let j=0; j < rangeColors.length; j++) {
        const data = {
            type: 'barpolar',
            // mode: 'lines',
            r: [range1[j]],
            width: 360,
            marker: {
                color: [rangeColors[j]],
            },
            opacity: 0.6, 
            name: 'Range ' + (j+1).toString(),
        }
        // j = j+1;
        barPolarData.push(data);
    }

    for (let [index, value] of categories.entries()) {
        console.log(index, value);
        barPolarData.push({
            type: 'scatterpolar',
            text: value,
            r: [rAllMax],
            theta: [thetas[index]],
            fill: 'toself',
            mode: 'lines+text+markers',
            fillcolor: 'rgba(255, 255, 255, 0.4)',
            line: {
                color: 'black',
            },
            marker: {
                color: 'black',
                symbol: 'circle',
            },
            name: value,
            showLegend: false,
        })
    }

    // trace 1
    barPolarData.push({
        type: 'scatterpolar',
        mode: 'lines+text+markers',
        r: value1,
        fill: 'toself',
        bgcolor: 'rgba(0, 0, 255, 0.4)',
        textposition: 'bottom center',
        marker: {
            color: 'blue',
        },
        name: 'You',
    });

    // trace 2 
    barPolarData.push({
        type: 'scatterpolar',
        mode: 'lines+text+markers',
        r: value2,
        fill: 'toself',
        bgcolor: 'rgba(0, 0, 255, 0.4)',
        textposition: 'bottom center',
        marker: {
            color: 'Green',
        },
        name: 'Other',
    })

    const barPolarLayout = {
        // template: null,
        polar: {
            radialaxis: {
                gridwidth: 0.5,
                range: [0, Math.max(fields)],
                showticklabels: true, 
                ticks: '',
                gridcolor: "grey"
            },
            angularaxis: {
                showticklabels: false,
                ticks: '',
                rotation: 45,
                direction: "clockwise",
                gridcolor: "white"
            }
        },
        yaxis: {
            showline: true,
            linewidth: 2,
            linecolor: 'white',
          }
    }

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
                    <Grid item style={{border: '0px solid black'}}>
                        <h4 className="panel-title">HEALTH TRIANGLE</h4>
                        <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                        <Plot
                            data={scatterData}
                            layout={scatterLayout}
                        />
                        {/* <Plot
                            data={barPolarData}
                            layout={barPolarLayout}
                        />
                        <div id="graphDiv"></div> */}
                    </Grid>
                    <Grid item style={{border: '0px solid black'}}>
                        <h4 className="panel-title" style={{verticalAlign: 'top'}}>CURRENT GOALS</h4>
                        <div style={{width: '500px', height: '550px'}}></div>
                    </Grid>
                    <Grid item style={{border: '0px solid black', height: '40%'}}>
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