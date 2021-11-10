import React, {useState, useEffect, useRef} from 'react';
import { ButtonGroup, Button, Box } from '@mui/material'
import TrendChart from './TrendChart'
import flatMap from "array.prototype.flatmap";
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import * as d3 from 'd3';

// TrendChart Dummy data
import schcData from "../dummyData/SCHC.json";
import vcitData from "../dummyData/VCIT.json";
import portfolioData from "../dummyData/PORTFOLIO.json";
import './Pages.css';

import data from "../dummyData/data";
flatMap.shim();

function Trend() {
    const [data] = useState([25, 50, 35, 15, 94, 10]);
    const svgRef = useRef(); // for the svg container


    useEffect(() => {
        // setting up the svg
        const w = 800;
        const h = 300;
        const svg = d3.select(svgRef.current).attr('width', w).attr('height', h).style('background','#d3d3d3').style('margin', '50').style('overflow', 'visible');
        // setting up the scaling
        const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, w])
        const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]); //range starts from top to bottom
        const generateScaledLine = d3.line().x((d, i) => xScale(i)).y(yScale).curve(d3.curveCardinal); // plotting the lines using the scales we created

        // setting the axes
        const xAxis = d3.axisBottom(xScale).ticks(data.length).tickFormat(i => i + 1);
        const yAxis = d3.axisLeft(yScale).ticks(5);
        svg.append('g').call(xAxis).attr('transform', `translate(0, ${h})`);
        svg.append('g').call(yAxis);

        // setting up the data for the svg
        svg.selectAll('.line').data([data]).join('path').attr('d', (d) => generateScaledLine(d)).attr('fill', 'none').attr('stroke', 'black');
    }, [])

    // function regenerateData() {
    //     const chartData = [];
    //     for (let i = 0; i < 20; i++) {
    //         const value = Math.floor(Math.random() * i + 3);
    //         chartData.push({
    //             label: i.toFixed,
    //             value,
    //             tooltipContent: `<b>x: </b>${i}<br><b>y: </b>${value}`
    //         });
    //     }
    //     setData(chartData)
    // }

    return (
        <div>
            <h2>Your Trends Overtime</h2>
            <div className="panels">
                <h4 className="panel-title">Overall Trend</h4>
                <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                    <Button>Physical Health</Button>
                    <Button>Mental Health</Button>
                    <Button>Social Health</Button>
                </ButtonGroup>
                <Box sx={{ my: "1.5rem" }} style={{border: '0px solid red', height: '93%'}}>
                    <svg ref={svgRef}></svg>
                </Box>
            </div>
            <div className="panels">
                <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <h4 className="panel-title">Detailed trends for each metric</h4>
                    <ButtonGroup sx={{ m: 2 }} variant="outlined" aria-label="outlined primary button group">
                        <Button startIcon={<ViewAgendaIcon />}>Vertical View</Button>
                        <Button startIcon={<ViewColumnIcon/>}>Horizontal View</Button>
                    </ButtonGroup>
                </Box>
                <div style={{border: '0px solid red', height: '93%'}}>

                </div>
            </div>
        </div>
    )
}

export default Trend;