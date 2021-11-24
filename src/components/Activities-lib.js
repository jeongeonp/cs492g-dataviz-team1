import React, { useState, useEffect} from 'react';
import Slider from "@material-ui/core/Slider";

import { ResponsiveCirclePackingCanvas } from '@nivo/circle-packing';

import './Pages.css';

import activity from '../assets/overall_cmp.json';


function Activities(activatedEle) {
    const [numElement, setNumElement] = useState()

    useEffect(() => {
        setNumElement(getActivatedEleNum(activatedEle));
        console.log(activity)
    }, [])

    const getActivatedEleNum = (activatedEle) => {
        var str = JSON.stringify(activatedEle);
        var initial_count = (str.split('true')).length - 1
        return initial_count 
    }

    const separateData = (activatedEle) => {
        

    }

    const good_data = {
        "name": "root",
        "children": [
            {
            "name": "Message Log",
            "value": 0.7961778933,
            "p3012": 0.7253143682,
            "others": 0.7317367553,

            },
            {
            "name": "Arousal",
            "value": 0.4626475787,
            "p3012": 0.7253143682,
            "others": 0.7317367553,
            },       
        ]
    }

    const bad_data = {
        "name": "root",
        "children": [
            {
            "name": "Valence",
            "value": 0.009320999554,
            "p3012": 0.7253143682,
            "others": 0.7317367553,
            },
            {
            "name": "Pedometer",
            "value": 0.03814630631,
            "p3012": 0.7253143682,
            "others": 0.7317367553,
            },
            {
            "name": "Sns Ratio",
            "value": 0.09563653303,
            "p3012": 0.7253143682,
            "others": 0.7317367553,
            },
            {
            "name": "Call Log",
            "value": 0.1202137128,
            "p3012": 0.7253143682,
            "others": 0.7317367553,
            },
            {
            "name": "Calories",
            "value": 0.1395309915,
            "p3012": 0.7253143682,
            "others": 0.7317367553,
            },
            {
            "name": "Attention",
            "value": 0.3183039581,
            "p3012": 0.7253143682,
            "others": 0.7317367553,
            },
            {
            "name": "Stress",
            "value": 0.5556021315,
            "p3012": 0.7253143682,
            "others": 0.7317367553,
            },
            
        ]
    }
    

    const handleSliderChange = (event, newValue) => {
        setNumElement(newValue);
    };
        
    return (
        <div>
            <h2>Activity Management</h2>
            <div className="bubbleContainer">
                <h4 className="panel-title">Overall Trend</h4>
                <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                <div className="controlBar">
                    <Slider 
                        key={`slider-${numElement}`}
                        aria-label="Num. of Elements"
                        step={1} 
                        marks
                        orientation="vertical"
                        defaultValue={numElement}
                        valueLabelDisplay="on"
                        min={2}
                        max={9}
                        onChange={handleSliderChange}
                    /> 
                    <p>No. of <br/> elements<br/> shown</p>
                </div>

                <div className="goodBubble">
                    <h3>Better</h3>
                    <ResponsiveCirclePackingCanvas
                        data={good_data}
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
                                <b>{input.data.name}</b> <br/>
                                my {input.data.p3012} <br/>
                                others {input.data.others}
                            </div>
                            )
                        }}
                    />
                </div>
                <div className="badBubble">
                    <h3>Worse</h3>
                    
                    <ResponsiveCirclePackingCanvas
                        data={bad_data}
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
                                my {input.data.name} <b>{input.data.p3012}</b> <br/>
                                others {input.data.name} <b>{input.data.others}</b>
                            </div>
                            )
                        }}
                    />
                       
                </div>
            </div>
            <div className="bubbleInfo">
                <h4 className="panel-title">HOW TO READ</h4>
                <p className="infoTitle">Circle Areas</p>
                <span className="description">The larger the area, the higher the contribution.</span>
                <p className="infoTitle">Category</p>
                <span className="description">The categories are determined by</span>
                <div className="circleBlock">
                    <div className="goodCircle"></div>
                    <p>Good Activity</p>
                </div>
                <div className="circleBlock">
                    <div className="badCircle"></div>
                    <p>Bad Activity</p>
                </div>
            </div>
        </div>
    )
}

export default Activities;