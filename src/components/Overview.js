import React, {useState, useEffect} from 'react';
import './Pages.css';
import GoalCard from './GoalCard.js'
// import * as d3 from "d3";
//import { Grid, Box } from '@mui/material'
import { Button, Popup, Icon, Grid, Divider } from 'semantic-ui-react'
// import { ReactRadarChart } from 'd3-radarchart';

import createPlotlyComponent from 'react-plotly.js/factory';
import _Plot from 'plotly.js/dist/plotly-cartesian';
import Plotly from 'plotly.js';

const Plot = createPlotlyComponent(Plotly);

function Overview({activatedEle, initialGoals}) {
    const [metric, changeMetrics] = useState({physical: [], social: [], mental: []});
    const [user_z_value, changeUserZValue] = useState([0, 0, 0]);
    const [metric_values, updateMetricValues] = useState({physical: [], social: [], mental: []})
    const [allText, changeAllText] = useState({physical: [], social:[], mental: []})
    const [selectedAspect, setSelectedAspect] = useState('physical')
    const [goals, setGoals] = useState(initialGoals);

    const goalsString = JSON.stringify(initialGoals);

    // aggregated data
    const physical_data = require('../assets/physical_agg_week.json');
    const mental_data = require('../assets/mental_agg_week.json');
    const social_data = require('../assets/social_agg_week.json');


    // Const over here
    const [highlighted, setHighlighted] = useState(null);

    // data values
    const physical_values = {'Overall': physical_data['z_physical']['0'], 'Calories': physical_data['z_Calories']['0'], 'Pedometer': physical_data['z_Pedometer']['0']}
    const mental_values = {'Overall': mental_data['z_mental']['0'], 'Valence': mental_data['z_Valence']['0'], 'Arousal': mental_data['z_Arousal']['0'], 'Attention': mental_data['z_Attention']['0'], 'Stress': mental_data['z_Stress']['0']}
    const social_values = {'Overall': social_data['z_social']['0'], 'CallLog': social_data['z_calllog']['0'], 'MessageLog': social_data['z_messagelog']['0'], 'SNSLog': social_data['z_snslog']['0'], 'SNSProp': social_data['z_snsprop']['0']}

    // const zValues_mental_data = {
    //     'Overall': [mental_data['z_mental']['0'], mental_data['others_mental_mean']['0']], 
    //     'Stress': [mental_data['p3012_Stress']['0'], mental_data['others_Stress']['0']],
    //     'Valence': [mental_data['p3012_Valence']['0'], mental_data['others_Valence']['0']],
    //     'Arousal': [mental_data['p3012_Arousal']['0'], mental_data['others_Arousal']['0']],
    //     'Attention': [mental_data['p3012_Attention']['0'], mental_data['others_Attention']['0']]
    // }

    // const zValues_physical_data = {
    //     "Overall": [physical_data['z_physical']['0'], physical_data['z_physical']['0']], 
    //     "Calories": [physical_data['p3012_Calories']['0'], physical_data['others_Calories']['0']],
    //     "Pedometer": [physical_data['p3012_Pedometer']['0'], physical_data['others_Pedometer']['0']]
    // }

    // const zValues_social_data = {
    //     "Overall": [social_data['z_social']['0'], social_data['z_social']['0']], 
    //     "CallLog": [social_data['p3012_calllog']['0'], social_data['others_calllog']['0']],
    //     "MessageLog": [social_data['p3012_messagelog']['0'], social_data['others_messagelog']['0']],
    //     "SNSLog": [social_data['p3012_snslog']['0'], social_data['others_snslog']['0']],
    //     "SNSProp": [social_data['p3012_snsprop']['0'], social_data['others_snsprop']['0']],
    // }

    
    const zValues_mental = {
        'Stress': [mental_data['p3012_Stress']['0'], mental_data['others_Stress']['0']],
        'Valence': [mental_data['p3012_Valence']['0'], mental_data['others_Valence']['0']],
        'Arousal': [mental_data['p3012_Arousal']['0'], mental_data['others_Arousal']['0']],
        'Attention': [mental_data['p3012_Attention']['0'], mental_data['others_Attention']['0']],
        'Overall': [mental_data['z_mental']['0'], mental_data['others_mental_mean']['0']], 
    }

    const zValues_physical = {
        'Calories': [physical_data['p3012_Calories']['0'], physical_data['others_Calories']['0']],
        'Pedometer': [physical_data['p3012_Pedometer']['0'], physical_data['others_Pedometer']['0']],
        'Overall': [physical_data['z_physical']['0'], physical_data['z_physical']['0']], 
    }

    const zValues_social = {
        'CallLog': [social_data['p3012_calllog']['0'], social_data['others_calllog']['0']],
        'MessageLog': [social_data['p3012_messagelog']['0'], social_data['others_messagelog']['0']],
        'PhoneLog': [social_data['p3012_phonelog']['0'], social_data['others_phonelog']['0']],
        'SNSLog': [social_data['p3012_snslog']['0'], social_data['others_snslog']['0']],
        'SNSProp': [social_data['p3012_snsprop']['0'], social_data['others_snsprop']['0']],
        'Overall': [social_data['z_social']['0'], social_data['z_social']['0']], 
    }
    


    /*
    const zValues_mental = [
        [mental_data['z_mental']['0'], mental_data['others_mental_mean']['0']], 
        [mental_data['p3012_Stress']['0'], mental_data['others_Stress']['0']],
        [mental_data['p3012_Valence']['0'], mental_data['others_Valence']['0']],
        [mental_data['p3012_Arousal']['0'], mental_data['others_Arousal']['0']],
        [mental_data['p3012_Attention']['0'], mental_data['others_Attention']['0']],
        
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
        //[social_data['p3012_phonelog']['0'], social_data['others_phonelog']['0']],
        //[social_data['p3012_snslog']['0'], social_data['others_snslog']['0']],
        [social_data['p3012_snsprop']['0'], social_data['others_snsprop']['0']],
         
    ]
    */

    // edit mode
    useEffect(() => {
        var physical_temp = ['Overall'];
        var social_temp = ['Overall'];
        var mental_temp = ['Overall'];
        Object.entries(activatedEle).forEach(([key, value]) => {
            if (key === "physical") {
                Object.entries(activatedEle["physical"]).forEach(([key, value]) => {
                    if (value) {
                        physical_temp.push(key);
                        // changePhysicalMetric([...physical_metric, key]);
                    }
                })
            }
            else if (key === "mental") {
                Object.entries(activatedEle["mental"]).forEach(([key, value]) => {
                    if (value) {
                        mental_temp.push(key);
                        // changeMentalMetric([...mental_metric, key]);
                    }
                })
            }
            else if (key === "social") {
                Object.entries(activatedEle["social"]).forEach(([key, value]) => {
                    if (value) {
                        social_temp.push(key);
                        // changeSocialMetric([...social_metric, key]);
                    }
                })
            }
        });

        // Add overall
        // social_temp.push('Overall');
        // mental_temp.push('Overall');
        // physical_temp.push('Overall');

        changeMetrics(state => ({...state, physical: physical_temp, mental: mental_temp, social: social_temp}))


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
            if (item !== "Overall") {
                const key = "z_" + item.toString()
                z_mental_total += mental_data[key]['0']
            }
        })
        z_mental_total =  z_mental_total / mental_temp.length;
        //console.log("z_mental total: ", z_mental_total);

        var z_physical_total = 0;
        physical_temp.map((item) => {
            if (item !== "Overall") {
                // console.log("z_" + metric.toString())
                const key = "z_" + item.toString()
                z_physical_total += physical_data[key]['0']
            }
        })
        z_physical_total =  z_physical_total / physical_temp.length;
        //console.log("z_physical total: ", z_physical_total);

        var z_social_total = 0;
        social_temp.map((item) => {
            if (item !== "Overall") {
                // console.log("z_" + metric.toString())
                const key = "z_" + item.toString().toLowerCase();
                z_social_total += social_data[key]['0']
            }
        })
        z_social_total =  z_social_total / social_temp.length;
        //console.log("z_social total: ", z_social_total);
        changeUserZValue([z_physical_total, z_mental_total, z_social_total]);
        
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
        const physical_text = physical_temp.map(x => {
            return `<b>${x}</b> <br>Your Value: ${zValues_physical[x][0].toFixed(3)}<br>Other's Value: ${zValues_physical[x][1].toFixed(3)} `
        })

        const mental_text = mental_temp.map(x => {
            return `<b>${x}</b> <br>Your Value: ${zValues_mental[x][0].toFixed(3)}<br>Other's Value: ${zValues_mental[x][1].toFixed(3)} `
        })

        const social_text = social_temp.map(x => {
            return `<b>${x}</b> <br>Your Value: ${zValues_social[x][0].toFixed(3)}<br>Other's Value: ${zValues_social[x][1].toFixed(3)} `
        })
        
        changeAllText(state => ({...state, physical: physical_text, mental: mental_text, social: social_text}))
    }, [activatedEle])

    // changing goals
    useEffect(() => {
        var newGoals = {physical: initialGoals['physical'], mental: initialGoals['mental'], social: initialGoals['social']}
        setGoals(newGoals);
    }, [goalsString])

    const getPercentFromZ = (z) => {
      
        if (z < -6.5) {
          return 0.0;
        }
      
        if (z > 6.5) {
          return 1.0;
        }
      
        var factK = 1;
        var sum = 0;
        var term = 1;
        var k = 0;
        var loopStop = Math.exp(-23);
      
        while(Math.abs(term) > loopStop) {
          term = .3989422804 * Math.pow(-1,k) * Math.pow(z,k) / (2 * k + 1) / Math.pow(2,k) * Math.pow(z,k+1) / factK;
          sum += term;
          k++;
          factK *= k;
        }
      
        sum += 0.5;
        return sum * 100;
    }

    // Polar Chart
    const scatterData = [
        {
            type: 'scatterpolar',
            mode: 'lines+markers+text',
            r: user_z_value.map(w => getPercentFromZ(w).toFixed(2)),
            theta: ['Physical', 'Mental', 'Social'],
            fill: 'toself',
            name: 'You (in percentile)',
            line: {
                color: '#f88923'
            },
            hovertemplate:
                "Value: %{r}th percentile <br>" +
                "Category: %{theta}" +
                "<extra></extra>"
        },
        {
            type: 'scatterpolar',
            mode: 'lines+markers+text',
            r: [50, 50, 50],
            theta: ['Physical', 'Mental', 'Social'],
            fill: 'toself',
            name: "Other Users' Average",
            line: {
                color: '#aaa'
            },
            hovertemplate:
                "Value: %{r}th percentile<br>" +
                "Category: %{theta}" +
                "<extra></extra>"
        },
        
        {
            type: 'scatterpolar',
            mode: 'markers',
            r: [goals['physical'], goals['mental'], goals['social']],
            theta: ['Physical', 'Mental', 'Social'],
            marker: {
                symbol: 'x',
                color: '#ff7043',
                size: 13
            },
            fill: null,
            name: 'Goal',
            hovertemplate:
                "Set Goal: %{r}th percentile <br>" +
                "Category: %{theta}" +
                "<extra></extra>"
        }
      ]
      
    const scatterLayout = {
        polar: {
            radialaxis: {
              visible: true,
              range: [0, 100],
              color: '#777',
              showticklabels: true
            },
            angularaxis: {
                // gridcolor: 'red',    
                rotation: 210,
                color: 'black',
            },
        },
    }

    // Bar Data
    //console.log(metric_values, metric, zValues_mental, allText)
    const barChartData = [{
        type: 'bar',
        x: metric_values[selectedAspect].map(v => getPercentFromZ(v)-50),
        y: metric[selectedAspect],
        //z: zValues_social,
        text: allText[selectedAspect],
        textposition: "none",
        orientation: 'h',
        marker: {
            color: metric_values[selectedAspect].map(function(v) {
                return v < 0 ? '#FF8974': '#01C696' 
            })
        },
        hovertemplate: "%{text}",
        name: 'Element Percentile',
      },
      /*
      {
          x: metric_values[selectedAspect].map(v => 0),
          y: metric[selectedAspect],
          type: 'scatter',
          mode: 'lines',
      }
      */
    ];

    const barLayout = {
        autosize: false,
        width: 1000,
        height: 400,
        margin: {
            l: 150,
            r: 50,
            b: 100,
            t: 40,
            pad: 4
        },
        xaxis: {
            range: [-50, 50],
            title: "Percentile",
            zeroline: false,
            //tickformat: ",.0th",
            tickmode: "array", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
            tickvals: [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50],
            ticktext: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        },
        yaxis: {
            categoryorder: "array",
            categoryarray: metric[selectedAspect],
            title: "Chosen Metric",
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
            <div className="panels2">
                <Grid>
                    <Grid.Row columns='equal'>
                    <Grid.Column width={11}>
                    <h4 className="panel-title">
                        <span>HEALTH TRIANGLE </span>
                        <span style={{width: '2px'}}></span>
                        <Popup content="This panel is to show the overview of each health aspects, calculated by taking the average of your weekly data and comparing with others' average." trigger={<Icon disabled name='help circle' />} size='tiny' style={{}}/>
                    </h4>
                        <p className="panel-date">May 2019, Week 1 (April 30th - May 6th)</p>
                        <Plot
                            data={scatterData}
                            layout={scatterLayout}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <h4 className="panel-title">
                            <span>CURRENT GOALS </span>
                            <span style={{width: '2px'}}></span>
                            <Popup content="Here, the goals you set in the edit mode as well as the elements you selected for each health aspect is displayed." trigger={<Icon disabled name='help circle' />} size='tiny' style={{}}/>
                        </h4>
                        <div style={{width: '', paddingTop: '0.5em'}}>
                            <GoalCard health="Physical" percent={goals['physical'].toString()}metric={metric['physical']} />
                            <GoalCard health="Mental" percent={goals['mental'].toString()} metric={metric['mental']} />
                            <GoalCard health="Social" percent={goals['social'].toString()} metric={metric['social']} />
                        </div>
                    </Grid.Column>
                    </Grid.Row>
                    <Divider/>
                    <Grid.Row columns={1}>
                    <Grid.Column>
                        <h4 className="panel-title">
                            <span style={{marginBottom: '1em'}}>ASPECT PERCENTAGE </span>
                            <span style={{width: '2px'}}></span>
                            <Popup content="The bar graphs shows *where my data for each element is* in comparison to other peoples' average data." trigger={<Icon disabled name='help circle' />} size='tiny' style={{}}/>
                        </h4>
                        <Button.Group variant="outlined" aria-label="outlined primary button group" size='tiny' style={{marginTop: '10px'}}>
                            <Button color={selectedAspect === 'physical'? 'twitter': 'standard'} onClick={() => handleClickAspect('physical')}>Physical Health</Button>
                            <Button color={selectedAspect === 'mental'? 'twitter': 'standard'} onClick={() => handleClickAspect('mental')}>Mental Health</Button>
                            <Button color={selectedAspect === 'social'? 'twitter': 'standard'} onClick={() => handleClickAspect('social')}>Social Health</Button>
                        </Button.Group>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                    <Grid.Column>
                        <Plot
                            data={barChartData}
                            layout={barLayout}
                        />
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                
            </div>
        </div>
    )
}

export default Overview;