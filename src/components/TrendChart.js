import React, { useState, useEffect, createRef } from 'react';
import * as d3 from 'd3';
import './Pages.css';


// Inspired by https://betterprogramming.pub/react-d3-plotting-a-line-chart-with-tooltips-ed41a4c31f4f
function TrendChart(props) {
    const { data, width, height } = props;

    useEffect(() => {
        drawChart();
    }, [data])

    function drawChart() {
        // logic for drawing the chart
        const margin = { top: 50, right: 50, bottom: 50, left: 50 };

        const yMinValue = d3.min(data, d => d.value);
        const yMaxValue = d3.max(data, d => d.value);
        const xMinValue = d3.min(data, d => d.label);
        const xMaxValue = d3.max(data, d => d.label);  
        
        // adding the svg element and the tooltip element
        const svg = d3
            .select('#graph-container')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        const tooltip = d3
            .select('#graph-container')
            .append('div')
            .attr('class', 'tooltip');

        // define axes scales and line/path generator
        const xScale = d3
            .scaleLinear()
            .domain([xMinValue, xMaxValue])
            .range([0, width]);
        const yScale = d3
            .scaleLinear()
            .range([height, 0])
            .domain([0, yMaxValue]);
        const line = d3
            .line()
            .x(d => xScale(d.label))
            .y(d => yScale(d.value))    
            .curve(d3.curveMonotoneX);

        // draw the gridlines, the x-axis, and the y-axis
        svg
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0,${height})`)
            .call(
            d3.axisBottom(xScale)
                .tickSize(-height)
                .tickFormat(''),
            );
        svg
            .append('g')
            .attr('class', 'grid')
            .call(
                d3.axisLeft(yScale)
                .tickSize(-width)
                .tickFormat(''),
            );
        svg
            .append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom().scale(xScale).tickSize(15));
        svg
            .append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale));
        svg
            .append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#f6c3d0')
            .attr('stroke-width', 4)
            .attr('class', 'line') 
            .attr('d', line);

        // Adding the tooltip, circle marker for the point we are hovering over and the tooltip box
        // const focus = svg
        //     .append('g')
        //     .attr('class', 'focus')
        //     .style('display', 'none');
        // focus.append('circle').attr('r', 5).attr('class', 'circle');
        // svg
        //     .append('rect')
        //     .attr('class', 'overlay')
        //     .attr('width', width)
        //     .attr('height', height)
        //     .style('opacity', 0)
        //     .on('mouseover', () => {
        //         focus.style('display', null);
        //     })
        //     .on('mouseout', () => {
        //         tooltip
        //             .transition()
        //             .duration(300)
        //             .style('opacity', 0);
        //     }).on('mousemove', mousemove);

        d3.select('#graph-container')
            .select('svg')
            .remove();
        d3.select('#graph-container')
            .select('.tooltip')
            .remove();
    }

    return (
        <div id="graph-container">
            Trend Chart
            
        </div>
    )
}

export default TrendChart;