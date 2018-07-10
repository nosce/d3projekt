import React from 'react'
import './App.css'

function ChartMessage (props) {
    var conWidth = props.width;
    var conHeight = props.height;

    return (
        <g id="message">
            <text x={conWidth/2} y={conHeight/2} textAnchor="middle" fill="silver">
                You must upload a file
            </text>
            <text x={conWidth/2} y={conHeight/2 + 40} textAnchor="middle" fill="silver">
                to see some visualisation here.
            </text>
        </g>
    );
}

export default ChartMessage