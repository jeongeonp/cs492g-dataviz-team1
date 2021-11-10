import React, { useRef, useState, useEffect} from 'react';
import { select } from "d3";
import * as d3 from 'd3';

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

    var toolTip = d3
        .select('body')
        .append('div')
        .attr('id', 'tooltip')
        .attr('style', 'position: absolute; opacity: 0;');

    useEffect(() => {
        const good_svg = select(goodSvgRef.current);
        const bad_svg = select(badSvgRef.current);
    
        good_svg
            .selectAll("circle")
            .data(good_data)
            .join(
                (enter) => enter.append("circle"),
                (update) => update.attr("class", "updated"),
                (exit) => exit.remove()
            )
            .attr("r", (d) => Math.sqrt(d.val)/Math.PI)
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("fill", (d) => d.color)
            .on("mouseover", (d) => {
                toolTip
                    .html(d.source)
                    .style("opacity", 1)
                    .style("visibility", "visible");
                return toolTip
            });

        good_svg
            .selectAll("text")
            .data(good_data).enter()
            .append("text")
            .attr("x", function(d) {return d.x-(Math.sqrt(d.val)/Math.PI) / 2})
            .attr("y", function(d) {return d.y})
            .text(function(d) {return d.source})
            .style("font-family", "arial")
            .style("font-size", "14x");

        bad_svg
            .selectAll("circle")
            .data(bad_data)
            .join(
                (enter) => enter.append("circle"),
                (update) => update.attr("class", "updated"),
                (exit) => exit.remove()
            )
            .attr("r", (d) => Math.sqrt(d.val)/Math.PI)
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("fill", (d) => d.color);

        bad_svg
            .selectAll("text")
            .data(bad_data).enter()
            .append("text")
            .attr("x", function(d) {return d.x-(Math.sqrt(d.val)/Math.PI) / 2})
            .attr("y", function(d) {return d.y})
            .text(function(d) {return d.source})
            .style("font-family", "arial")
            .style("font-size", "12px")
            .style("text-align", "center");
      }, [good_data]);

    return (
        <div>
            <h2>Activity Management</h2>
            <div className="bubbleContainer">
                <h4 className="panel-title">Overall Trend</h4>
                <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                <div className="controlBar"></div>
                <div className="goodBubble">
                    <svg className="bubbleSvg" ref={goodSvgRef}></svg>
                </div>
                <div className="badBubble">
                    <svg className="bubbleSvg" ref={badSvgRef}></svg>
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