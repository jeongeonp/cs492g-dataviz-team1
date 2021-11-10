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
    const [data, setData] = useState([]);
    const d3ref = React.useRef(null);
    const dataRef = React.useRef(flatMap(data, (e) => e));

    useEffect(() => {
        regenerateData();
    }, [])

    function regenerateData() {
        const chartData = [];
        for (let i = 0; i < 20; i++) {
            const value = Math.floor(Math.random() * i + 3);
            chartData.push({
                label: i.toFixed,
                value,
                tooltipContent: `<b>x: </b>${i}<br><b>y: </b>${value}`
            });
        }
        setData(chartData)
    }

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
                    <Button onClick={regenerateData}>Change Data</Button>
                    {/* <div ref={d3ref}></div> */}
                    <TrendChart data={data} width={400} height={300}/> 
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