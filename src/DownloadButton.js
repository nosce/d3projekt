import React, { Component } from 'react'
import './App.css'

class DownloadButton extends Component {
    constructor(props){
        super(props);
        this.downloadChart = this.downloadChart.bind(this);
        this.state = {
            chartType: null
        };
    }

    downloadChart() {
        var currentChart = this.props.chart.current;
        var width = this.props.width;
        var height = this.props.height;
        if(currentChart) {
            var canvas = document.createElement("canvas");
            var svg = currentChart.node,
                svgStr = new XMLSerializer().serializeToString(svg),
                context = canvas.getContext("2d"),
                img = new Image();

            img.src = 'data:image/svg+xml;base64,'+window.btoa(svgStr);
            canvas.width = width;
            canvas.height = height;
            img.onload = function() {
                context.rect(0, 0, width, height);
                context.fillStyle = 'white';
                context.fill();
                context.drawImage(img, 0, 0, width, height);
                var a = document.createElement('a');
                a.download = 'web-page-analyzer.png';
                a.href = canvas.toDataURL('image/png');
                a.dispatchEvent(new MouseEvent("click"));
                //a.click();
            };

        }
    }

    render () {
        return (
            <button className="downloadButton" onClick={this.downloadChart}>
                <svg viewBox="0 0 60 60">
                    <path d="M27.292,43.706c0.092,0.093,0.203,0.166,0.326,0.217C27.74,43.973,27.87,44,28,44s0.26-0.027,0.382-0.077
		c0.123-0.051,0.233-0.124,0.326-0.217l11.999-11.999c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0L29,40.586V5
		c0-0.553-0.448-1-1-1s-1,0.447-1,1v35.586L16.707,30.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L27.292,43.706z"/>
                    <path d="M55,38c-0.552,0-1,0.447-1,1v11H2V39c0-0.553-0.448-1-1-1s-1,0.447-1,1v13h56V39C56,38.447,55.552,38,55,38z"/>
                </svg>
            </button>
         );
    }
}

export default DownloadButton