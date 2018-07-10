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
                a.click();
            };

        }
    }

    render () {
        return (
            <button id="download" onClick={this.downloadChart}>Download</button>
         );
    }
}

export default DownloadButton