import React, { useState, useEffect, useRef } from 'react';
import * as d3 from "d3";
import './Pages.css';

function TrendChart({data, dimension}) {
    // const svgRef = createRef(null);
    // const { width, height, margin } = dimensions;
    // const svgWidth = width + margin.left + margin.right;
    // const svgHeight = height + margin.top + margin.bottom;

    useEffect(() =>{
        // fit the time difference in a scale following the width.
        // const xScale = d3.scaleTime()
        //     .domain(d3.extent(data[0].items, d => d.date))
        //     .range([0, width]);
    }, [])

    return (
        <div>
            Trend Chart
        </div>
    )
}

export default TrendChart;