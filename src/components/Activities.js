import React, { useRef, useState, useEffect} from 'react';
import { select } from "d3";
import './Pages.css';


function Activities() {
    // Const over here
    const [data, setData] = useState([24, 30, 45, 70, 26]);
    const svgRef = useRef(null);
    const [dataset, setDataset] = useState([
        {source:"Item 1", x: 100, y: 60, val: 1350, color: "#C9D6DF"},
        {source:"Item 2", x: 30, y: 80, val: 2500, color: "#F7EECF"},
        {source:"Item 3", x: 50, y: 40, val: 5700, color: "#E3E1B2"},
        {source:"Item 4", x: 190, y: 100, val: 30000, color: "#F9CAC8"},
        {source:"Item 5", x: 80, y: 170, val: 47500, color: "#D1C2E0"}
      ])

    // const dataset = {
    //     "children": [{"Name":"Olives","Count":4319},
    //         {"Name":"Tea","Count":4159},
    //         {"Name":"Mashed Potatoes","Count":2583},
    //         {"Name":"Boiled Potatoes","Count":2074},
    //         {"Name":"Milk","Count":1894},
    //         {"Name":"Chicken Salad","Count":1809},
    //         {"Name":"Vanilla Ice Cream","Count":1713},
    //         {"Name":"Cocoa","Count":1636},
    //         {"Name":"Lettuce Salad","Count":1566}]
    // };

    useEffect(() => {
        const svg = select(svgRef.current); // selection 객체
    
        svg
          .selectAll("circle")
          .data(dataset)
          .join(
            (enter) => enter.append("circle"),
            (update) => update.attr("class", "updated"),
            (exit) => exit.remove()
          )
          .attr("r", (d) => Math.sqrt(d.val)/Math.PI)
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
          .attr("fill", (d) => d.color);
      }, [data]);

    return (
        <div>
            <h2>Activity Management</h2>
            <div className="panels">
                <h4 className="panel-title">Overall Trend</h4>
                <p className="panel-date">Oct 2021, Week 1 (1st - 7th)</p>
                <svg width="500" height="500" ref={svgRef}></svg>
                {/* <button onClick={() => {setData(data.map(el => el + 5))}}>increase + 5</button>
                <button onClick={() => {setData(data.filter(el => el > 35))}}>filter circle r should gt 35</button> */}
            </div>
        </div>
    )
}

export default Activities;