import React from 'react'
import './App.css'

function Legend() {

    const legendData = [
        {name: "Element Node", color: "#DCDCDC"},
        {name: "Link", color: "#DDEDAA"},
        {name: "Image", color: "#F0CF65"},
        {name: "Div/Span", color: "#93c6be"},
        {name: "Comment Node", color: "#93B5C6"},
        {name: "Text Node", color: "#BD4F6C"},
        {name: "Script/Link", color: "#D7816A"}
    ];


    return (
        <div className="legend">
            {legendData.map(function (element, index) {
                var color = element.color;
                return (
                    <p key={index}
                       className="legendText"
                       style={{backgroundColor: color}}>
                        {element.name}
                    </p>
                );
            })}
        </div>
    );
}

export default Legend
