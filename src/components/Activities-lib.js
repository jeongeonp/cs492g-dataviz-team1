import React, { useState, useEffect} from 'react';
import Slider from "@material-ui/core/Slider";
import { Button, Popup, Icon } from 'semantic-ui-react'

import { ResponsiveCirclePackingCanvas } from '@nivo/circle-packing';

import './Pages.css';

import activity from '../assets/overall_cmp.json';


function Activities({activatedEle}) {
    const [json, setJson] = useState(activity);

    const [goodData, setGoodData] = useState({"name": "root",})
    const [badData, setBadData] = useState({"name": "root",})

    const [numElement, setNumElement] = useState(9)
    const [maxSlider, setMaxSlider] = useState(9)
    const [orderedScores, setOrderedScores] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])

    const titleMap = {Calories: 'Calories', Pedometer: 'Pedometer', Valence: 'Valence', Arousal: 'Arousal', Attention: 'Attention', Stress: 'Stress', CallLog: 'Call Log', MessageLog: 'Message Log', SNSProp: 'SNS App Usage Ratio'}
    const titleUnitMap = {Calories: 'Calories (kcal)', Pedometer: 'Pedometer (steps walked)', Valence: 'Valence', Arousal: 'Arousal', Attention: 'Attention', Stress: 'Stress', CallLog: 'Call Log (mins)', MessageLog: 'Message Log (# of messages)', SNSProp: 'SNS App Usage Ratio (%)'}
    const unitMap = {Calories: 'kcal', Pedometer: 'Steps Walked', Valence: 'Score', Arousal: 'Score', Attention: 'Score', Stress: 'Score', CallLog: 'Minutes', MessageLog: '# of Messages', SNSProp: '% of SNS App Usage'}

    // Editmode
    useEffect(() => {
        //console.log(activatedEle)
        const newPhysical = Object.keys(activatedEle.physical).filter(v => activatedEle['physical'][v]) // ['calories', 'pedometer']
        const newMental = Object.keys(activatedEle.mental).filter(v => activatedEle['mental'][v])
        const newSocial = Object.keys(activatedEle.social).filter(v => activatedEle['social'][v])

        //console.log(newPhysical, newMental, newSocial)
        const newMax = newPhysical.length + newMental.length + newSocial.length
        setMaxSlider(newMax)
        setNumElement(newMax)

        /*
        const sort_zscore = Object.values(activity.z_score).map(v => Math.abs(v))
        sort_zscore.sort(function(a, b){return b-a})
        //console.log(sort_zscore)
        setOrderedScores(sort_zscore)

        */

        const newPhysical_false = Object.keys(activatedEle.physical).filter(v => activatedEle['physical'][v] === false) // ['calories', 'pedometer']
        const newMental_false = Object.keys(activatedEle.mental).filter(v => activatedEle['mental'][v] === false)
        const newSocial_false = Object.keys(activatedEle.social).filter(v => activatedEle['social'][v] === false)
        
        const false_elem = newPhysical_false.concat(newMental_false, newSocial_false)
        //console.log(false_elem)
        //console.log(json)
        for (var i in false_elem) {
            delete json['others'][false_elem[i]]
            delete json['p3012'][false_elem[i]]
            delete json['z_score'][false_elem[i]]
        }
        //console.log(json)

        setJson(json)
        changeZscore()

    }, [activatedEle])

    // Initial Rendering
    useEffect(() => {
        changeZscore()
    }, [])

    const changeZscore = () => {
        const sort_zscore = Object.values(json.z_score).map(v => Math.abs(v))
        sort_zscore.sort(function(a, b){return b-a})
        //console.log("NEw ZSCORE", sort_zscore)
        setOrderedScores(sort_zscore)
    }

    useEffect(() => {
        var goodData_temp = []
        var badData_temp = []

        //console.log("XXXX", orderedScores[numElement-1])

        setGoodData({"name": "root", "children": goodData_temp})
        setBadData({"name": "root", "children": badData_temp})

        for (var i in Object.keys(json.p3012)) {
            const element = Object.keys(json.p3012)[i]
            if (json.z_score[element] >= 0 && json.z_score[element] >= orderedScores[numElement-1]) {
                goodData_temp.push({
                    "name": titleMap[element],
                    "value": json.z_score[element],
                    "p3012": json.p3012[element],
                    "others": json.others[element],
                    "name_unit": titleUnitMap[element]
                })
            }
            if (json.z_score[element] < 0 && json.z_score[element] <= -orderedScores[numElement-1]) {
                badData_temp.push({
                    "name": titleMap[element],
                    "value": -json.z_score[element],
                    "p3012": json.p3012[element],
                    "others": json.others[element],
                    "name_unit": titleUnitMap[element]
                })
            }
        }

        //console.log(goodData_temp)
        //console.log(badData_temp)

        setGoodData({"name": "root", "children": goodData_temp})
        setBadData({"name": "root", "children": badData_temp})
    }, [numElement])

    const getActivatedEleNum = (activatedEle) => {
        var str = JSON.stringify(activatedEle);
        var initial_count = (str.split('true')).length - 1
        return initial_count 
    }

    const handleSliderChange = (event, newValue) => {
        setNumElement(newValue);
    };
        
    return (
        <div>
            <h2>Activity Management</h2>
            <div className="bubbleContainer">
                <h4 className="panel-title">
                    <span>Comparison </span>
                    <span style={{width: '2px'}}></span>
                    <Popup content="This panel shows elements where you are doing well and worse. The values are calculated by summing the z-scores of each day." trigger={<Icon disabled name='help circle' />} size='tiny' style={{}}/>
                </h4>
                <p className="panel-date">May 2019, Week 1 (April 30th - May 6th)</p>
                <div className="controlBar">
                    <div className="controlBlock">
                    <Slider 
                        key={`slider-${numElement}`}
                        aria-label="Num. of Elements"
                        step={1} 
                        marks
                        orientation="vertical"
                        defaultValue={numElement}
                        valueLabelDisplay="on"
                        min={2}
                        max={maxSlider}
                        onChange={handleSliderChange}
                    />
                    <p>No. of <br/> elements<br/> shown</p>
                    </div> 
                </div>

                <div className="goodBubble">
                    <h3>Better</h3>
                    <ResponsiveCirclePackingCanvas
                        data={goodData}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        id="name"
                        colors="#01C696"
                        padding={45}
                        leavesOnly={true}
                        enableLabels={true}
                        label="id"
                        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.4 ] ] }}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.3 ] ] }}
                        animate={true}
                        tooltip={(input) => {
                            return(
                            <div style={{ color:'black', backgroundColor: 'white', padding: '0px 5px', boxShadow: '1px 1px 1px gray', borderRadius: '5px' }}>
                                <b style={{color: '#01C696', fontWeight: '900'}}>{input.data.name_unit}</b> <br/>
                                Your value: {input.data.p3012.toFixed(2)} <br/>
                                Others' average value: {input.data.others.toFixed(2)} <br/>
                                <b style={{fontSize: '110%'}}>😊 Your value is {input.data.value.toFixed(2)*100}% higher than others</b>
                            </div>
                            )
                        }}
                    />
                </div>
                <div className="badBubble">
                    <h3>Worse</h3>
                    
                    <ResponsiveCirclePackingCanvas
                        data={badData}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        id="name"
                        colors="#ff8974"
                        padding={45}
                        leavesOnly={true}
                        enableLabels={true}
                        label="id"
                        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.4 ] ] }}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.3 ] ] }}
                        animate={true}
                        tooltip={(input) => {
                            return(
                            <div style={{ color:'black', backgroundColor: 'white', padding: '0px 5px', boxShadow: '1px 1px 1px gray', borderRadius: '5px' }}>
                                <b style={{color: '#ff8974', fontWeight: '900'}}>{input.data.name_unit}</b> <br/>
                                Your value: {input.data.p3012.toFixed(2)} <br/>
                                Others' average value: {input.data.others.toFixed(2)} <br/>
                                <b style={{fontSize: '110%'}}>😞 Your value is {(input.data.value.toFixed(2)*100).toFixed(0)}% lower than others</b>
                            </div>
                            )
                        }}
                    />
                       
                </div>
            </div>
            <div className="bubbleInfo">
                <h4 className="panel-title">HOW TO READ</h4>
                <p className="infoTitle" style={{marginTop: '15px'}}>Circle Areas</p>
                <span className="description">The larger the area, the higher the difference between your data and others' average data among the bubbles with the same color.</span>
                <p className="infoTitle" style={{marginTop: '15px'}}>Category</p>
                <span className="description">The colors of the categories indicate</span>
                <div className="circleBlock">
                    <div className="goodCircle"></div>
                    <p>that you are performing better than others' average.</p>
                </div>
                <div className="circleBlock">
                    <div className="badCircle"></div>
                    <p>that you are performing worse than others' average.</p>
                </div>
            </div>
        </div>
    )
}

export default Activities;