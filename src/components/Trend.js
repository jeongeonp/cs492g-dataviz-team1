import React, {useState, useEffect, useRef} from 'react';
import { Box } from '@mui/material'
import { Button, Popup, Icon } from 'semantic-ui-react'

import './Pages.css';

import physical from '../assets/physical_agg.json';
import mental from '../assets/mental_agg.json';
import social from '../assets/social_agg.json';

//import mental_p3012 from '../assets/mental-p3012.json';
//import mental_others from '../assets/unused/mental-others.json';

import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);


//console.log(social)

//var mental_total = mental_p3012
//mental_total['Total'] = total

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

function Trend({activatedEle}) {
    //console.log(activatedEle)
    const [myData, setMyData] = useState(dates)
    const [othersData, setOthersData] = useState(dates)

    const [multipleMy, setMultipleMy] = useState(null)
    const [multipleOthers, setMultipleOthers] = useState(null)

    const [selectedAspect, setSelectedAspect] = useState('physical')

    // move to hook later
    const [numMetric, setNumMetric] = useState({physical: ['Calories', 'Pedometer'], mental: ['Valence', 'Arousal', 'Attention', 'Stress'], social: ['CallLog', 'MessageLog', 'SNSProp']})

    const titleMap = {Calories: 'Calories', Pedometer: 'Pedometer', Valence: 'Valence', Arousal: 'Arousal', Attention: 'Attention', Stress: 'Stress', CallLog: 'Call Log', MessageLog: 'Message Log', SNSProp: 'SNS App Usage Ratio'}
    const titleUnitMap = {Calories: 'Calories (kcal)', Pedometer: 'Pedometer (steps walked)', Valence: 'Valence', Arousal: 'Arousal', Attention: 'Attention', Stress: 'Stress', CallLog: 'Call Log (mins)', MessageLog: 'Message Log (# of messages)', SNSProp: 'SNS App Usage Ratio (%)'}
    const unitMap = {Calories: 'kcal', Pedometer: 'Steps Walked', Valence: 'Score', Arousal: 'Score', Attention: 'Score', Stress: 'Score', CallLog: 'Minutes', MessageLog: '# of Messages', SNSProp: '% of SNS App Usage'}

    // Vertical / horizontal mode
    const [mode, setMode] = useState('horizontal')

    const [width, setWidth] = useState(500)
    const [height, setHeight] = useState(300)

    const changeMode = (mode) => {
        setMode(mode)
        if (mode === 'horizontal') {
            setWidth(500)
            setHeight(300)
        }
        if (mode === 'vertical') {
            setWidth(1000)
            setHeight(500)
        }
    }

    // Editing with edit mode
    useEffect(() => {
        // console.log(activatedEle)
        const newPhysical = Object.keys(activatedEle.physical).filter(v => activatedEle['physical'][v]) // ['caloreis', 'pedometer']
        const newMental = Object.keys(activatedEle.mental).filter(v => activatedEle['mental'][v])
        const newSocial = Object.keys(activatedEle.social).filter(v => activatedEle['social'][v])

        setNumMetric({physical: newPhysical, mental: newMental, social: newSocial})

        //console.log(myData, othersData)

        //console.log(physical)
        //console.log(mental)
        //console.log(social)

        changeAspect(selectedAspect)
        // console.log("CURRENTLY SELECTED ELEMENT", selectedAspect)

    }, [activatedEle])


    // Selecting with new elements
    useEffect(() => {
        const newMultiple = {physical: {}, mental: {}, social: {}}
        const newOthersMultiple = {physical: {}, mental: {}, social: {}}
        //console.log(numMetric[selectedAspect])

        for (var i in numMetric['physical']) {
            newMultiple['physical'][numMetric['physical'][i]] = {x: dates.x, y: Object.values(physical['p3012_'+numMetric['physical'][i]])}
            newOthersMultiple['physical'][numMetric['physical'][i]] = {x: dates.x, y: Object.values(physical['others_'+numMetric['physical'][i]])}
        }
        for (var i in numMetric['mental']) {
            newMultiple['mental'][numMetric['mental'][i]] = {x: dates.x, y: Object.values(mental['p3012_'+numMetric['mental'][i]])}
            newOthersMultiple['mental'][numMetric['mental'][i]] = {x: dates.x, y: Object.values(mental['others_'+numMetric['mental'][i]])}
        }
        
        for (var i in numMetric['social']) {
            newMultiple['social'][numMetric['social'][i]] = {x: dates.x, y: Object.values(social['p3012_'+numMetric['social'][i].toLowerCase()])}
            newOthersMultiple['social'][numMetric['social'][i]] = {x: dates.x, y: Object.values(social['others_'+numMetric['social'][i].toLowerCase()])}
        }
        
        
        //console.log(newMultiple)
        //console.log(newOthersMultiple)
        setMultipleMy(newMultiple)
        setMultipleOthers(newOthersMultiple)


        //console.log('selectedAspect changed')
        changeAspect(selectedAspect)
    }, [selectedAspect])

    const handleClickAspect = (e) => {
        setSelectedAspect(e)
    }

    const changeAspect = (e) => {
        if (e === 'physical') {
            //const newPhysical = {x: dates.x, y: Object.values(physical.z_physical)}
            const newOthersPhysical = {x: dates.x, y: [0, 0, 0, 0, 0, 0, 0]}

            const newPhysicalElements = Object.keys(activatedEle.physical).filter(v => activatedEle['physical'][v])
            var physical_plot = []
            var physical_final_plot = [0, 0, 0, 0, 0, 0, 0]
            for (var i in newPhysicalElements) {
                physical_plot.push(Object.values(physical['z_'+newPhysicalElements[i]]))
            }
            var physical_numelements = newPhysicalElements.length
            for (var j in physical_plot) {
                for (var k in physical_plot[j]) {
                    physical_final_plot[k] += physical_plot[j][k]
                }
            }

            const newPhysical = {x: dates.x, y: physical_final_plot.map(v => v/physical_numelements)}

            setMyData(newPhysical)
            setOthersData(newOthersPhysical)
        }
        
        if (e === 'mental') {
            //const newMental = {x: dates.x, y: Object.values(mental.z_mental)}
            const newOthersMental = {x: dates.x, y: [0, 0, 0, 0, 0, 0, 0]}

            const newMentalElements = Object.keys(activatedEle.mental).filter(v => activatedEle['mental'][v])
            var mental_plot = []
            var mental_final_plot = [0, 0, 0, 0, 0, 0, 0]
            for (var i in newMentalElements) {
                mental_plot.push(Object.values(mental['z_'+newMentalElements[i]]))
            }
            var mental_numelements = newMentalElements.length
            for (var j in mental_plot) {
                for (var k in mental_plot[j]) {
                    mental_final_plot[k] += mental_plot[j][k]
                }
            }

            const newMental = {x: dates.x, y: mental_final_plot.map(v => v/mental_numelements)}

            setMyData(newMental)
            setOthersData(newOthersMental)
        }

        if (e === 'social') {
            //const newSocial = {x: dates.x, y: Object.values(social.z_social)}
            const newOthersSocial = {x: dates.x, y: [0, 0, 0, 0, 0, 0, 0]}

            const newSocialElements = Object.keys(activatedEle.social).filter(v => activatedEle['social'][v])
            var social_plot = []
            var social_final_plot = [0, 0, 0, 0, 0, 0, 0]
            for (var i in newSocialElements) {
                social_plot.push(Object.values(social['z_'+newSocialElements[i].toLowerCase()]))
            }
            var social_numelements = newSocialElements.length
            for (var j in social_plot) {
                for (var k in social_plot[j]) {
                    social_final_plot[k] += social_plot[j][k]
                }
            }

            const newSocial = {x: dates.x, y: social_final_plot.map(v => v/social_numelements)}

            setMyData(newSocial)
            setOthersData(newOthersSocial)
        }
    }
    

    return (
        <div>
            <h2>Your Trends Overtime</h2>
            <div className="panels2">
                <h4 className="panel-title">
                    <span>Overall Trend </span>
                    <span style={{width: '2px'}}></span>
                    <Popup content="This panel shows an overall trend graph for each of the health aspect. The aggregated values are represented in the form of z-score, in comparison with other people's average." trigger={<Icon disabled name='help circle' />} size='tiny' style={{}}/>

                </h4>
                <p className="panel-date">May 2019, Week 1 (April 30th - May 6th)</p>
                <Button.Group variant="outlined" aria-label="outlined primary button group" size='tiny'>
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
                            marker: {color: '#f88923'},
                            name: 'You',
                        },
                        {
                            x: othersData.x,
                            y: othersData.y,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: '#aaa'},
                            name: "Other Users' Average",
                        },
                        ]}
                        layout={{
                            width: 1000, 
                            height: 500, 
                            title: selectedAspect.charAt(0).toUpperCase()+selectedAspect.slice(1)+" Health [" + numMetric[selectedAspect].map(v => titleMap[v]) + "]", 
                            yaxis: {range: [-4, 4], title: 'z-score'}
                        }}
                    />
                </Box>
            </div>
            <div className="panels2">
                <h4 className="panel-title">
                    <span>Detailed trends for each metric </span>
                    <span style={{width: '2px'}}></span>
                    <Popup content="This panel contains small multiples to show the trend of each element composing the health aspects. Here, the actual value for your own data as well as other's average data is shown." trigger={<Icon disabled name='help circle' />} size='tiny' style={{}}/>
                </h4> 
                <Button.Group style={{marginTop: '10px'}} size='tiny'>
                    <Button color={mode === 'horizontal'? 'twitter': ''} icon onClick={() => changeMode('horizontal')}>
                        {/*<Icon name='bars' />*/}
                        <Icon name="block layout"/>
                    </Button>
                    <Button color={mode === 'vertical'? 'twitter': ''} icon onClick={() => changeMode('vertical')}>
                        <Icon name='content' />
                    </Button>
                </Button.Group>
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
                                marker: {color: '#f88923'},
                                name: 'You',
                            },
                            {
                                x: multipleOthers[selectedAspect][e].x,
                                y: multipleOthers[selectedAspect][e].y,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: '#aaa'},
                                name: "Other Users",
                            },
                            ]}
                            layout={{
                                width: width, 
                                height: height, 
                                title: titleUnitMap[e],
                                yaxis: {title: unitMap[e]}
                            }}
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