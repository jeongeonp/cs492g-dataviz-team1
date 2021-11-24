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

function Overview({activatedEle}) {

    const [metric, changeMetrics] = useState({mental:[], physical: [], social: []});
    const [user_z_value, changeUserZValue] = useState([0, 0, 0]);
    const [metric_values, updateMetricValues] = useState({physical: [], social: [], mental: []})
    const [allText, changeAllText] = useState({physical: [], social:[], mental: []})
    const [selectedAspect, setSelectedAspect] = useState('physical')

    // aggregated data
    const mental_data = require('../assets/mental_agg_week.json');
    const physical_data = require('../assets/physical_agg_week.json');
    const social_data = require('../assets/social_agg_week.json');

    // Const over here
    const [highlighted, setHighlighted] = useState(null);

    // data values
    const mental_values = {'Overall': mental_data['z_mental']['0'], 'Valence': mental_data['z_Valence']['0'], 'Arousal': mental_data['z_Arousal']['0'], 'Attention': mental_data['z_Attention']['0'], 'Stress': mental_data['z_Stress']['0']}
    const physical_values = {'Overall': physical_data['z_physical']['0'], 'Calories': physical_data['z_Calories']['0'], 'Pedometer': physical_data['z_Pedometer']['0']}
    const social_values = {'Overall': social_data['z_social']['0'], 'CallLog': social_data['z_calllog']['0'], 'MessageLog': social_data['z_messagelog']['0'], 'SNSLog': social_data['z_snslog']['0'], 'SNSProp': social_data['z_snsprop']['0']}

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

    const zValues_mental = [
        [mental_data['z_mental']['0'], mental_data['others_mental_mean']['0']], 
        [mental_data['p3012_Stress']['0'], mental_data['others_Stress']['0']],
        [mental_data['p3012_Valence']['0'], mental_data['others_Valence']['0']],
        [mental_data['p3012_Arousal']['0'], mental_data['others_Arousal']['0']],
        [mental_data['p3012_Attention']['0'], mental_data['others_Attention']['0']]
    ]

    const zValues_physical = [
        [physical_data['z_physical']['0'], physical_data['z_physical']['0']], 
        [physical_data['p3012_Calories']['0'], physical_data['others_Calories']['0']],
        [physical_data['p3012_Pedometer']['0'], physical_data['others_Pedometer']['0']],
    ]

    const zValues_social = [
        [social_data['z_social']['0'], social_data['z_social']['0']], 
        [social_data['p3012_calllog']['0'], social_data['others_calllog']['0']],
        [social_data['p3012_messagelog']['0'], social_data['others_messagelog']['0']],
        [social_data['p3012_phonelog']['0'], social_data['others_phonelog']['0']],
        [social_data['p3012_snslog']['0'], social_data['others_snslog']['0']],
        [social_data['p3012_snsprop']['0'], social_data['others_snsprop']['0']],
    ]

    // edit mode
    useEffect(() => {
        // console.log("keeps changing")
        var physical_temp = [];
        var social_temp = [];
        var mental_temp = [];
        Object.entries(activatedEle).forEach(([key, value]) => {
            // console.log(props.activatedEle["physical"]);
            if (key == "physical") {
                Object.entries(activatedEle["physical"]).forEach(([key, value]) => {
                    if (value) {
                        physical_temp.push(key);
                        // changePhysicalMetric([...physical_metric, key]);
                    }
                })
            }
            else if (key == "mental") {
                Object.entries(activatedEle["mental"]).forEach(([key, value]) => {
                    if (value) {
                        mental_temp.push(key);
                        // changeMentalMetric([...mental_metric, key]);
                    }
                })
            }
            else if (key == "social") {
                Object.entries(activatedEle["social"]).forEach(([key, value]) => {
                    if (value) {
                        social_temp.push(key);
                        // changeSocialMetric([...social_metric, key]);
                    }
                })
            }
        });

        // Add overall
        social_temp.push('Overall');
        mental_temp.push('Overall');
        physical_temp.push('Overall');

        changeMetrics(state => ({...state, physical: physical_temp, mental: mental_temp, social: social_temp}))

        console.log("social_temp", social_temp);
        console.log("mental_temp", mental_temp);
        console.log("physical_temp", physical_temp)
        // changePhysicalMetric(state => ({...state, physical_temp}));
        // changeMentalMetric(mental_temp);
        // changeSocialMetric(social_temp);

        // update with the new values
        // changePhysicalMetric(physical_temp);
        // changeMentalMetric(mental_temp);
        // changeSocialMetric(social_temp);

        // Recalculate z-value
        var z_mental_total = 0;
        mental_temp.map((item) => {
            if (item != "Overall") {
                // console.log("z_" + metric.toString())
                const key = "z_" + item.toString()
                z_mental_total += mental_data[key]['0']
            }
        })
        z_mental_total =  z_mental_total / mental_temp.length;
        console.log("z_mental total: ", z_mental_total);

        var z_physical_total = 0;
        physical_temp.map((item) => {
            if (item != "Overall") {
                // console.log("z_" + metric.toString())
                const key = "z_" + item.toString()
                z_physical_total += physical_data[key]['0']
            }
        })
        z_physical_total =  z_physical_total / physical_temp.length;
        console.log("z_physical total: ", z_physical_total);

        var z_social_total = 0;
        social_temp.map((item) => {
            if (item != "Overall") {
                // console.log("z_" + metric.toString())
                const key = "z_" + item.toString().toLowerCase();
                z_social_total += social_data[key]['0']
            }
        })
        z_social_total =  z_social_total / social_temp.length;
        console.log("z_social total: ", z_social_total);
        changeUserZValue([z_social_total, z_physical_total, z_mental_total]);
        
        // const mental_metric_value = []
        // const physical_metric_value = []
        // const social_metric_value = []

        // initializing values
        // const mental_temp_values = []
        // const physical_temp_values = []
        // const social_temp_values = []
        const mental_temp_values = mental_temp.map(x => mental_values[x]);
        const physical_temp_values = physical_temp.map(x => physical_values[x]);
        const social_temp_values = social_temp.map(x => social_values[x]);
        updateMetricValues(state => ({...state, physical: physical_temp_values, mental: mental_temp_values, social: social_temp_values}))


        // mental_temp.forEach((x, i) => changeMentalMetricValue([...mental_metric_value, mental_values[x]]));
        // physical_temp.forEach((x, i) => changePhysicalMetricValue([...physical_metric_value, physical_values[x]]));
        // social_temp.forEach((x, i) => changeSocialMetricValue([...social_metric_value, social_values[x]]));

        // update text
        const mental_text = zValues_mental.map((zValues_mental, i) => {
        // console.log(zValues_mental, i)
            return `<b>${mental_temp[i]}</b> <br>Your Value: ${zValues_mental[0]}<br> Other's Value: ${zValues_mental[1]} `
        })

        const physical_text = zValues_physical.map((zValues_physical, i) => {
            // console.log(zValues_mental, i)
            return `<b>${physical_temp[i]}</b> <br>Your Value: ${zValues_physical[0]}<br> Other's Value: ${zValues_physical[1]} `
        })

        const social_text = zValues_social.map((zValues_social, i) => {
            // console.log(zValues_mental, i)
            return `<b>${social_temp[i]}</b> <br>Your Value: ${zValues_social[0]}<br> Other's Value: ${zValues_social[1]} `
        })
        changeAllText(state => ({...state, physical: physical_text, mental: mental_text, social: social_text}))

    }, [])

    console.log("metric: ", metric);
    console.log("metric_values", metric_values);
    console.log("user_z_value ", user_z_value);
    console.log("allText: ", allText);

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
        x: metric_values[selectedAspect],
        // y: mental_metric,
        y: metric[selectedAspect],
        z: zValues_mental,
        text: allText[selectedAspect],
        textposition: "none",
        orientation: 'h',
        marker: {
            color: metric_values[selectedAspect].map(function(v) {
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
            categoryarray: metric[selectedAspect],
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

    // handle click aspect for bar chart
    const handleClickAspect = (e) => {
        setSelectedAspect(e)
    }


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
                            <span style={{marginBottom: '1em'}}>ASPECT PERCENTAGE </span>
                            <span style={{width: '2px'}}></span>
                            <Popup content='This panel is...' trigger={<Icon disabled name='help circle' />} size='tiny' style={{}}/>
                        </h4>
                        <Button.Group variant="outlined" aria-label="outlined primary button group" size='tiny'>
                            <Button color={selectedAspect === 'physical'? 'twitter': ''} onClick={() => handleClickAspect('physical')}>Physical Health</Button>
                            <Button color={selectedAspect === 'mental'? 'twitter': ''} onClick={() => handleClickAspect('mental')}>Mental Health</Button>
                            <Button color={selectedAspect === 'social'? 'twitter': ''} onClick={() => handleClickAspect('social')}>Social Health</Button>
                        </Button.Group>
                        {/* <h2 style={{margin: '0'}}>Physical</h2> */}
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