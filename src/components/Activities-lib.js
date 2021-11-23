import React, { useRef, useState, useEffect} from 'react';
import { select } from "d3";
import * as d3 from 'd3';
import { ResponsiveCirclePackingCanvas } from '@nivo/circle-packing'


import './Pages.css';

function Activities() {
    const goodSvgRef = useRef(null);
    const badSvgRef = useRef(null);
    const [good_data, setGoodData] = useState([
        {source:"UV Exposure", x: 120, y: 130, val: 100000, color: "#01C696"},
        {source:"Calories", x: 130, y: 330, val: 30000, color: "#01C696"},
        {source:"Attention", x: 320, y: 130, val: 40000, color: "#01C696"},
        {source:"Call Log", x: 310, y: 300, val: 80000, color: "#01C696"},
      ]);
    const [bad_data, setBadData] = useState([
        {source:"Message Entity", x: 70, y: 60, val: 35000, color: "#FF8974"},
        {source:"SNS App Usage", x: 50, y: 180, val: 10000, color: "#FF8974"},
        {source:"Stress Level", x: 190, y: 200, val: 50000, color: "#FF8974"},
    ])

    const data = {
        "name": "root",
        "children": [
            {
            "name": "node.0",
            "value": 84
            },
            {
            "name": "node.1",
            "value": 67
            },
            {
            "name": "node.2",
            "value": 28
            },
            {
            "name": "node.3",
            "value": 22
            },
            {
            "name": "node.4",
            "value": 2
            },
            {
            "name": "node.5",
            "value": 38
            },
            
        ]
    }

    

   
    useEffect(() => {})
        
    return (
        <div>
            <h2>Activity Management</h2>
            <div className="bubbleContainer">
                <h4 className="panel-title">Overall Trend</h4>
                <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                <div className="controlBar"></div>
                <div className="goodBubble">
                    <ResponsiveCirclePackingCanvas
                        data={data}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        id="name"
                        colors="#01C696"
                        colorBy="id"
                        childColor={{ from: 'color', modifiers: [ [ 'brighter', 0.4 ] ] }}
                        padding={10}
                        leavesOnly={true}
                        enableLabels={true}
                        label="value"
                        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.4 ] ] }}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.3 ] ] }}
                        animate={true}
                        tooltip={({ id, value }) => (
                            <div style={{ color:'black', backgroundColor: 'white', padding: '0px 5px', boxShadow: '1px 1px 1px gray', borderRadius: '1px' }}>
                                {id}: <b>{value}</b>
                            </div>
                        )}
                    />
                </div>
                <div className="badBubble">
                    
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
                </div>
                <div className="circleBlock">
                    <div className="badCircle"></div>
                </div>
            </div>
        </div>
    )
}

export default Activities;