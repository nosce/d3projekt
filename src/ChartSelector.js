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
            chartType: null,
            width: 500,
            height: 500
        };
        this.chartRef = React.createRef();
    }

    componentWillReceiveProps() {
        this.setState({chartType: this.props.defaultChartType});
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
                <button id="tree" onClick={this.switchChart}>Tree</button>
                <button id="sunburst" onClick={this.switchChart}>Sunburst</button>
                <button id="treemap" onClick={this.switchChart}>Treemap</button>
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