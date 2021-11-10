import React, { useRef, useState, useEffect} from 'react';
import { select } from "d3";
import './Pages.css';


function Activities() {
    const goodSvgRef = useRef(null);
    const badSvgRef = useRef(null);
    const [good_data, setGoodData] = useState([
        {source:"UV Exposure", x: 70, y: 60, val: 35000, color: "#01C696"},
        {source:"Calories", x: 50, y: 180, val: 10000, color: "#01C696"},
        {source:"Attention Level", x: 200, y: 50, val: 13000, color: "#01C696"},
        {source:"Call Log Entity", x: 190, y: 200, val: 50000, color: "#01C696"},
      ]);
    const [bad_data, setBadData] = useState([
        {source:"Message Entity", x: 70, y: 60, val: 35000, color: "#FF8974"},
        {source:"SNS App Usage", x: 50, y: 180, val: 10000, color: "#FF8974"},
        {source:"Stress Level", x: 190, y: 200, val: 50000, color: "#FF8974"},
    ])

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
            .attr("fill", (d) => d.color);

        good_svg
            .selectAll("text")
            .data(good_data).enter()
            .append("text")
            .attr("x", function(d) {return d.x-(Math.sqrt(d.val)/Math.PI) / 2})
            .attr("y", function(d) {return d.y})
            .text(function(d) {return d.source})
            .style("font-family", "arial")
            .style("font-size", "12px");

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
            .style("font-size", "12px");
      }, [good_data]);

    return (
        <div>
            <h2>Activity Management</h2>
            <div className="bubbleContainer">
                <h4 className="panel-title">Overall Trend</h4>
                <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                <div className="controlBar"></div>
                <div className="goodBubble">
                    <svg width="70%" height="350px" ref={goodSvgRef}></svg>
                </div>
                <div className="badBubble">
                    <svg width="70%" height="350px" ref={badSvgRef}></svg>
                </div>
            </div>
            <div className="bubbleInfo"></div>
                {/* <button onClick={() => {setData(data.map(el => el + 5))}}>increase + 5</button>
                <button onClick={() => {setData(data.filter(el => el > 35))}}>filter circle r should gt 35</button> */}
        </div>
    )
}

export default Activities;