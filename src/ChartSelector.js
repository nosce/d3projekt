import React, {Component} from 'react'
import './App.css'
import TreeChart from './TreeChart'
import TreemapChart from './TreemapChart'
import SunburstChart from './SunburstChart'
import DownloadButton from './DownloadButton'
import ChartMessage from './ChartMessage'

class ChartSelector extends Component {
    constructor(props) {
        super(props);
        this.switchChart = this.switchChart.bind(this);
        this.state = {
            chartType: this.props.defaultChartType,
            width: 850,
            height: 400
        };
        this.chartRef = React.createRef();
    }

    switchChart(event) {
        if (event && this.props.data) {
            this.setState({chartType: event.target.id});
        }

    }

    render() {
        var chartType = this.state.chartType;
        return (
            <div className="chartSwitch">
                {(chartType === 'tree')
                    ? <TreeChart data={this.props.data}
                                 ref={this.chartRef}/>
                    : null}
                {(chartType === 'sunburst')
                    ? <SunburstChart data={this.props.data}
                                     ref={this.chartRef}/>
                    : null}
                {(chartType === 'treemap')
                    ? <TreemapChart data={this.props.data}
                                    ref={this.chartRef}/>
                    : null}
                {(chartType === null)
                    ? <svg width={this.state.width}
                           height={this.state.height}
                           className="chartContainer">
                    <ChartMessage width={this.state.width} height={this.state.height}/>
                </svg>
                    : null}
                {(this.props.data)
                    ? ( <button id="tree" onClick={this.switchChart}>Tree</button> )
                    : null }
                {(this.props.data)
                    ? ( <button id="sunburst" onClick={this.switchChart}>Sunburst</button> )
                    : null }
                {(this.props.data)
                    ? ( <button id="treemap" onClick={this.switchChart}>Treemap</button> )
                    : null }
                {(this.props.data)
                    ? <DownloadButton chart={this.chartRef}
                                      width={this.state.width}
                                      height={this.state.height}/>
                    : null}

            </div>
        );
    }
}
export default ChartSelector