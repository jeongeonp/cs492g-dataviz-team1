import React, {useState, useEffect, useRef} from 'react';
import { ButtonGroup, Button, Box } from '@mui/material'
import TrendChart from './TrendChart'
// import flatMap from "array.prototype.flatmap";
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import * as d3 from 'd3';

import './Pages.css';

function Trend() {
    const [data] = useState([25, 50, 35, 15, 94, 10]);
    // const [date] = useState(['10/1/2015', '10/2/2015', '10/3/2015', '10/4/2015', '10/5/2015', '10/6/2015', '10/7/2015', '10/8/2015', '10/9/2015', '10/10/2015', '10/11/2015', '10/12/2015', '10/13/2015', '10/14/2015', '10/15/2015', '10/16/2015']);
    const [dummyData] = useState([
        {date: '10/1/2015', value: 10 },
        {date: '10/2/2015', value: 15 },
        {date: '10/3/2015', value: 35 },
        {date: '10/4/2015', value: 50 },
        {date: '10/5/2015', value: 25 },
        {date: '10/6/2015', value: 94 },
        {date: '10/7/2015', value: 35 },
        {date: '10/8/2015', value: 50 },
        {date: '10/9/2015', value: 15 },
        {date: '10/10/2015', value: 50 },
    ])
    
    const svgRef = useRef(); // for the svg container

    useEffect(() => {
        // // setting up the svg
        // const w = 900;
        // const h = 300;
        // const svg = d3.select(svgRef.current).attr('width', w).attr('height', h).style('margin', '50').style('overflow', 'visible');
        // // setting up the scaling
        // // const xScale = d3.scaleLinear().domain([0, dummyData.length - 1]).range([0, w])
        // const xScale = d3.scaleLinear().domain([0, dummyData.length - 1]).range([0, w]).orient("bottom").tickformat(dateFormatter);
        // const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]); //range starts from top to bottom
        // const generateScaledLine = d3.line().x((d, i) => xScale(i)).y(yScale).curve(d3.curveCardinal); // plotting the lines using the scales we created

        // // setting the axes
        // const xAxis = d3.axisBottom(xScale).ticks(dummyData.length).tickFormat(i => i + 1);
        // const yAxis = d3.axisLeft(yScale).ticks(5);
        // svg.append('g').call(xAxis).attr('transform', `translate(0, ${h})`);
        // svg.append('g').attr("class", "y axis").call(yAxis).append("text")
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", 10)
        //     .attr("dy", ".71em")
        //     .style("text-anchor", "end")
        //     .text("Values");

        var margin = { top: 30, right: 132, bottom: 30, left: 50 },
            width = 900 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var parseDate = d3.timeParse("%m/%e/%Y"),
            bisectDate = d3.bisector(function(d) { return d.date; }).left,
            formatValue = d3.format(","),
            dateFormatter = d3.timeFormat("%m/%d/%y");

        // scale the values on the axis
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        // draw the axis
        var xAxis = d3.axisBottom().scale(x).tickFormat(dateFormatter);
        var yAxis = d3.axisLeft().scale(y).tickFormat(d3.format("s"));

        // building the line
        var line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.value); });

        // make the svg container
        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        dummyData.forEach(function(d) {
            d.date = parseDate(d.date);
            d.value = +d.value;
        });

        dummyData.sort(function(a, b) {
            return a.date - b.date;
        });

        x.domain([dummyData[0].date, dummyData[dummyData.length - 1].date]);
        y.domain(d3.extent(dummyData, function(d) { return d.value; }));

        // add axis and draw line
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Number of Likes");

        svg.append("path")
            .datum(dummyData)
            .attr("class", "line")
            .attr("d", line);

        // draw axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // tooltip
        var tooltip = d3.select(".tooltip-area").append("div").attr("class", "tooltip").style("display", "none");

        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 5);

        var tooltipDate = tooltip.append("div")
            .attr("class", "tooltip-date");

        var tooltipValue = tooltip.append("div");
            tooltipValue.append("span")
                .attr("class", "tooltip-title")
                .text("Value: ");

        var tooltipHealthValue = tooltipValue.append("span")
            .attr("class", "tooltip-likes");

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); tooltip.style("display", null);  })
            .on("mouseout", function() { focus.style("display", "none"); tooltip.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove(event, d) {
            // var x0 = x.invert(d3.select('tooltip')),
            //     i = bisectDate(dummyData, x0, 1)
                // d0 = dummyData[i - 1],
                // d1 = dummyData[i],
                // d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            
            // console.log("x0: ", x0, "i: ", i);

            // focus.attr("transform", "translate(" + x(d.date) + "," + y(d.value) +")");
            // tooltip.attr("style", "left:" + (x(d.date) + 64) + "px;top:" + y(d.value) + "px;");
            // tooltip.select(".tooltip-date").text(dateFormatter(d.date));
            // tooltip.select(".tooltip-likes").text(formatValue(d.value));

            const text = d3.select('.tooltip-area');
            console.log(event, "d: ", d);
            // console.log("Date: ", d.date, "Value: ", d.value);
            // text.text(`Date: ${d.date} Value" ${d.value}`);
            // const [x,y] = d3.pointer(event);

            // tooltip.attr('transform', `translate(${x}, ${y})`);
        }
    }, [])
  
//     const drawGraph = (updated_data) => {
//         const w = 800;
//         const h = 300;
//         const svg = d3.select(svgRef.current).attr('width', w).attr('height', h).style('background','#d3d3d3').style('margin', '50').style('overflow', 'visible');
//         // setting up the scaling
//         const xScale = d3.scaleLinear().domain([0, updated_data.length - 1]).range([0, w])
//         const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]); //range starts from top to bottom
//         const generateScaledLine = d3.line().x((d, i) => xScale(i)).y(yScale).curve(d3.curveCardinal); // plotting the lines using the scales we created

//         // setting the axes
//         const xAxis = d3.axisBottom(xScale).ticks(updated_data.length).tickFormat(i => i + 1);
//         const yAxis = d3.axisLeft(yScale).ticks(5);
//         svg.append('g').call(xAxis).attr('transform', `translate(0, ${h})`);
//         svg.append('g').call(yAxis);

//         // setting up the data for the svg
//         svg.selectAll('.line').data([updated_data]).join('path').attr('d', (d) => generateScaledLine(d)).attr('fill', 'none').attr('stroke', 'black');

//     }

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

    const handleClickAspect = (aspect) => {
        var updated_data = []
        if (aspect == "physical") {
            updated_data = [25, 50, 35, 15, 94, 10]
        } else if (aspect == "mental") {
            updated_data = [50, 100, 1, 5, 7, 3]
        } else {
            updated_data = [100, 30, 80, 90, 200, 130]
        }
        //setData(updated_data);
        //drawGraph(updated_data);
    }


    return (
        <div>
            <h2>Your Trends Overtime</h2>
            <div className="panels">
                <h4 className="panel-title">Overall Trend</h4>
                <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                    <Button onClick={() => handleClickAspect('physical')}>Physical Health</Button>
                    <Button onClick={() => handleClickAspect('mental')}>Mental Health</Button>
                    <Button onClick={() => handleClickAspect('social')}>Social Health</Button>
                </ButtonGroup>
                <Box sx={{ my: "1.5rem" }} style={{border: '0px solid red', height: '93%'}}>
                    <svg ref={svgRef}></svg>
                </Box>
                <Box sx={{ my: "1.5rem" }} style={{border: '0px solid red', height: '93%'}}>
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