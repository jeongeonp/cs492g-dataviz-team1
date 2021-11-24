import React, {useRef, useState, useEffect} from 'react';
import './Pages.css';
import GoalCard from './GoalCard.js'
// import * as d3 from "d3";
import { Grid, Box } from '@mui/material'
import { Button, Popup, Icon } from 'semantic-ui-react'
// import { ReactRadarChart } from 'd3-radarchart';

import createPlotlyComponent from 'react-plotly.js/factory';
import _Plot from 'plotly.js/dist/plotly-cartesian';
import Plotly from 'plotly.js';

const Plot = createPlotlyComponent(Plotly);

function Overview(props) {
    console.log("activated ele: ", props.activatedEle);

    // see which elements are visible, metric
    const physical_metric = []
    const mental_metric = []
    const social_metric = []

    Object.entries(props.activatedEle).forEach(([key, value]) => {
        // console.log(props.activatedEle["physical"]);
        if (key == "physical") {
            Object.entries(props.activatedEle["physical"]).forEach(([key, value]) => {
                if (value) {
                    physical_metric.push(key);
                }
            })
        }
        else if (key == "mental") {
            Object.entries(props.activatedEle["mental"]).forEach(([key, value]) => {
                if (value) {
                    mental_metric.push(key);
                }
            })
        }
        else if (key == "social") {
            Object.entries(props.activatedEle["social"]).forEach(([key, value]) => {
                if (value) {
                    social_metric.push(key);
                }
            })
        }
    });

    // console.log('physical_metrics: ', physical_metric);
    // console.log('physical_metrics: ', mental_metric);
    // console.log('physical_metrics: ', social_metric);

    // Const over here
    const [highlighted, setHighlighted] = useState(null);
    // const scatterPlotRef = useRef();

    // aggregated data
    const mental_data = require('../assets/mental_agg_week.json');
    const physical_data = require('../assets/physical_agg_week.json');
    const social_data = require('../assets/social_agg_week.json');

    // recalculate z-value
    var z_mental_total = 0;
    mental_metric.map((metric) => {
        // console.log("z_" + metric.toString())
        const key = "z_" + metric.toString()
        z_mental_total += mental_data[key]['0']
    })
    z_mental_total =  z_mental_total / mental_metric.length;
    
    var z_physical_total = 0;
    physical_metric.map((metric) => {
        // console.log("z_" + metric.toString())
        const key = "z_" + metric.toString()
        z_physical_total += physical_data[key]['0']
    })
    z_physical_total =  z_physical_total / physical_metric.length;

    var z_social_total = 0;
    social_metric.map((metric) => {
        // console.log("z_" + metric.toString())
        const key = "z_" + metric.toString().toLowerCase();
        z_social_total += social_data[key]['0']
    })
    z_social_total =  z_social_total / social_metric.length;

    const user_z_value = [z_social_total, z_physical_total, z_mental_total]

    // const user_z_value = [social_data["z_social"]['0']*250, physical_data['z_physical']['0']*250, mental_data['z_mental']['0']*250]
    // console.log(user_z_value)

    // metrics
    // const physical_metric = ['Overall', 'Calories Burned', 'Steps'];
    // const mental_metric = ['Overall', 'Stress', 'Valence', 'Arousal', 'Attention'];
    // const social_metric = ['Overall', 'Call Log', 'Message Log', 'Phone Log', 'SNS Log', 'SNS Prop'];

    // data values
    const mental_values = {'Overall': mental_data['z_mental']['0'], 'Valence': mental_data['z_Valence']['0'], 'Arousal': mental_data['z_Arousal']['0'], 'Attention': mental_data['z_Attention']['0'], 'Stress': mental_data['z_Stress']['0']}
    const physical_values = {'Overall': physical_data['z_physical']['0'], 'Calories': physical_data['z_Calories']['0'], 'Pedometer': physical_data['z_Pedometer']['0']}
    const social_values = {'Overall': social_data['z_social']['0'], 'CallLog': social_data['z_calllog']['0'], 'MessageLog': social_data['z_messagelog']['0'], 'SNSLog': social_data['z_snslog']['0'], 'SNSProp': social_data['z_snsprop']['0']}

    const mental_metric_value = []
    const physical_metric_value = []
    const social_metric_value = []

    // initializing values
    mental_metric.forEach((x, i) => mental_metric_value.push(mental_values[x]));
    physical_metric.forEach((x, i) => physical_metric_value.push(physical_values[x]));
    social_metric.forEach((x, i) => social_metric_value.push(social_values[x]));
    // console.log("mental_metric: ", mental_metric_value);


    // values of each metric
    // const mental_metric_value = [mental_data['z_mental']['0'], mental_data['z_Stress']['0'], mental_data['z_Valence']['0'], mental_data['z_Arousal']['0'], mental_data['z_Attention']['0']]
    // const physical_metric_value = [physical_data['z_Calories']['0'], physical_data['z_Pedometer']['0']]
    // const social_metric_value = [social_data['z_social']['0'], social_data['z_calllog']['0'], social_data['z_messagelog']['0'], social_data['z_phonelog']['0'], social_data['z_snslog']['0'], social_data['z_snsprop']['0']]
    const zValues_mental_data = {
        'Overall': [mental_data['z_mental']['0'], mental_data['others_mental_mean']['0']], 
        'Stress': [mental_data['p3012_Stress']['0'], mental_data['others_Stress']['0']],
        'Valence': [mental_data['p3012_Valence']['0'], mental_data['others_Valence']['0']],
        'Arousal': [mental_data['p3012_Arousal']['0'], mental_data['others_Arousal']['0']],
        'Attention': [mental_data['p3012_Attention']['0'], mental_data['others_Attention']['0']]
    }

    const zValues_physical_data = {
        "Overall": [physical_data['z_physical']['0'], physical_data['z_physical']['0']], 
        "Calories": [physical_data['p3012_Calories']['0'], physical_data['others_Calories']['0']],
        "Pedometer": [physical_data['p3012_Pedometer']['0'], physical_data['others_Pedometer']['0']]
    }

    const zValues_social_data = {
        "Overall": [social_data['z_social']['0'], social_data['z_social']['0']], 
        "CallLog": [social_data['p3012_calllog']['0'], social_data['others_calllog']['0']],
        "MessageLog": [social_data['p3012_messagelog']['0'], social_data['others_messagelog']['0']],
        "SNSLog": [social_data['p3012_snslog']['0'], social_data['others_snslog']['0']],
        "SNSProp": [social_data['p3012_snsprop']['0'], social_data['others_snsprop']['0']],
    }

    const zValues_mental = []
    const zValues_physical = []
    const zValues_social = []

    // initializing values
    mental_metric.forEach((x, i) => zValues_mental.push(zValues_mental_data[x]));
    physical_metric.forEach((x, i) => zValues_physical.push(zValues_physical_data[x]));
    social_metric.forEach((x, i) => zValues_social.push(zValues_social_data[x]));

    // // [[my, others]]
    // const zValues_mental = [
    //     [mental_data['z_mental']['0'], mental_data['others_mental_mean']['0']], 
    //     [mental_data['p3012_Stress']['0'], mental_data['others_Stress']['0']],
    //     [mental_data['p3012_Valence']['0'], mental_data['others_Valence']['0']],
    //     [mental_data['p3012_Arousal']['0'], mental_data['others_Arousal']['0']],
    //     [mental_data['p3012_Attention']['0'], mental_data['others_Attention']['0']]
    // ]
    // // console.log("mental: ", zValues_mental);

    // const zValues_physical = [
    //     [physical_data['z_physical']['0'], physical_data['z_physical']['0']], 
    //     [physical_data['p3012_Calories']['0'], physical_data['others_Calories']['0']],
    //     [physical_data['p3012_Pedometer']['0'], physical_data['others_Pedometer']['0']],
    // ]

    // const zValues_social = [
    //     [social_data['z_social']['0'], social_data['z_social']['0']], 
    //     [social_data['p3012_calllog']['0'], social_data['others_calllog']['0']],
    //     [social_data['p3012_messagelog']['0'], social_data['others_messagelog']['0']],
    //     [social_data['p3012_phonelog']['0'], social_data['others_phonelog']['0']],
    //     [social_data['p3012_snslog']['0'], social_data['others_snslog']['0']],
    //     [social_data['p3012_snsprop']['0'], social_data['others_snsprop']['0']],
    // ]

    var text_mental = zValues_mental.map((zValues_mental, i) => {
        // console.log(zValues_mental, i)
        return `<b>${mental_metric[i]}</b> <br>Your Value: ${zValues_mental[0]}<br> Other's Value: ${zValues_mental[1]} `
    })

    var text_physical = zValues_physical.map((zValues_physical, i) => {
        // console.log(zValues_mental, i)
        return `<b>${physical_metric[i]}</b> <br>Your Value: ${zValues_physical[0]}<br> Other's Value: ${zValues_physical[1]} `
    })

    var text_social = zValues_social.map((zValues_social, i) => {
        // console.log(zValues_mental, i)
        return `<b>${social_metric[i]}</b> <br>Your Value: ${zValues_social[0]}<br> Other's Value: ${zValues_social[1]} `
    })


    const axisConfig = [
        {label: 'Mental', axisId: "mental", axisValueMax: 200, axisValueMin: 0},
        {label: 'Social', axisId: "social", axisValueMax: 200, axisValueMin: 0},
        {label: 'Physical', axisId: "physical", axisValueMax: 200, axisValueMin: 0},
    ];

    // Polar Chart
    const scatterData = [
        {
            type: 'scatterpolar',
            mode: 'lines',
            r: [0, 0, 0],
            theta: ['Social', 'Physical', 'Mental'],
            fill: 'toself',
            name: 'Other Users',
            // subplot: "polar2"
        },
        {
            type: 'scatterpolar',
            mode: 'lines',
            r: user_z_value.map(w => w*250),
            theta: ['Social', 'Physical', 'Mental'],
            fill: 'toself',
            name: 'You',
            // subplot: "polar"
        },
        {
            type: 'scatterpolar',
            mode: 'markers',
            r: [28, 7, 8],
            theta: ['Social', 'Physical', 'Mental'],
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



    // Bar Data
    const barChartData = [{
        type: 'bar',
        x: mental_metric_value,
        y: mental_metric,
        z: zValues_mental,
        text: text_mental,
        textposition: "none",
        orientation: 'h',
        marker: {
            color: mental_metric_value.map(function(v) {
                return v < 0 ? '#FF8974': '#01C696' 
            })
        },
        hovertemplate: "%{text}",
        // hoverinfo: 'text',
      }];

    const barLayout = {
        autosize: false,
        width: 1100,
        height: 400,
        margin: {
            l: 150,
            r: 50,
            b: 100,
            t: 40,
            pad: 4
        },
        xaxis: {
            range: [-1, 1],
            title: "Percentage Compared to Others",
            zeroline: false,
            tickformat: ",.0%",
        },
        yaxis: {
            title: "Chosen Metric",
            zeroline: false,
            categoryarray: mental_metric,
            categoryorder: "array"
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

    // const clickAspect = (e) => {
    //     console.log(e)
    // }

    const metric = ['Emotion Level', 'Disturbance level']

    // radar graph: z_mental * 25
    // bar graph -> specifics z_metric
    // on bar graph, show z_stress and when hovering show p3012_stress and others info (because they have really different ranges)
    return (
        <div>
            <h2>Overview Page</h2>
            <div className="panels">
                <Grid container alignItems="center" justifyContent="space-between" spacing={1} >
                    <Grid item style={{border: '0px solid black'}}>
                    <h4 className="panel-title">
                        <span>HEALTH TRIANGLE </span>
                        <span style={{width: '2px'}}></span>
                        <Popup content='This panel is...' trigger={<Icon disabled name='help circle' />} size='tiny' style={{}}/>
                    </h4>
                        <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                        <Plot
                            data={scatterData}
                            layout={scatterLayout}
                        />
                    </Grid>
                    <Grid item style={{border: '0px solid black'}}>
                        <h4 className="panel-title">
                            <span>CURRENT GOALS </span>
                            <span style={{width: '2px'}}></span>
                            <Popup content='This panel is...' trigger={<Icon disabled name='help circle' />} size='tiny' style={{}}/>
                        </h4>
                        <div style={{width: '500px', height: '550px', paddingTop: '0.5em'}}>
                            <GoalCard health="Mental" percent="90%" metric={metric} />
                            <GoalCard health="Physical" percent="90%" metric={metric} />
                            <GoalCard health="Social" percent="90%" metric={metric} />
                        </div>
                    </Grid>
                    <Grid item style={{border: '0px solid black', height: '40%'}}>
                        <h4 className="panel-title">
                            <span>ASPECT PERCENTAGE </span>
                            <span style={{width: '2px'}}></span>
                            <Popup content='This panel is...' trigger={<Icon disabled name='help circle' />} size='tiny' style={{}}/>
                        </h4>
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