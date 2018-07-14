import React, { Component } from 'react'
import './App.css'
import { select, event } from 'd3-selection'
import { nest } from 'd3-collection'
import { arc, pie } from 'd3-shape'
import ColorSetter from './ColorSetter'
import ChartMessage from './ChartMessage'

class DonutChart extends Component {
    constructor(props){
        super(props);
        this.createContainer = this.createContainer.bind(this);
        this.createChart = this.createChart.bind(this);
        this.state = {
            width: 400,
            height: 400
        };
    }

    componentDidMount() {
        this.createContainer();
    }

    componentDidUpdate() {
        const node = this.node;
        const parent = this.parent;
        // Delete previous content and redraw
        select(parent)
            .select('.tooltip')
            .remove();
        select(node)
            .select('.parent')
            .selectAll('*')
            .remove();
        this.createChart();
    }

    createContainer() {
        const node = this.node;
        select(node)
            .append('g')
            .attr('class', 'parent')
            .attr('transform', 'translate(' + this.state.width/2 + ',' + this.state.height/2 + ')');
    }

    createChart() {
        const node = this.node;
        const parent = this.parent;
        if(!this.props.data) {
            select(node)
                .select('.parent')
                .selectAll('*')
                .remove();
            return;
        }

        const root = this.props.data;
        const width = this.state.width;
        const height = this.state.height;
        const radius = Math.min(width, height) / 2;

        // Count number of tags
        var tags = nest()
            .key(function(d) { return d.data.tagName })
            .rollup(function(v) { return v.length; })
            .entries(root.descendants());
        // Remove "undefined" entry
        var tagData = [];
        for (var entry of tags) {
            if(entry.key !== 'undefined') {
                tagData.push(entry);
            }
        }

        var donut = arc()
            .outerRadius(radius - 50)
            .innerRadius(radius - 150);

        var labelArc = arc()
            .outerRadius(radius - 70)
            .innerRadius(radius - 100);
        
        var labelArc2 = arc()
            .outerRadius(radius - 100)
            .innerRadius(radius - 125);

        var createSlice = pie()
            .value(function(d) { return d.value; });

        // Create donut
        var chart = select(node)
            .select('.parent')
            .selectAll('g')
            .data(createSlice(tagData))
            .enter()
            .append('g');

        chart.append('path')
            .attr('d', donut)
            .attr('fill', function(d) { return ColorSetter(d.data.key) })
            // .attr('class', function(d) { return 'node element ' + d.data.key })
            .attr('stroke', 'white')
            .attr('stroke-width', '2');

        chart.append('text')
            .attr("transform", function(d) {
                var midAngle = (d.endAngle < Math.PI)
                    ? d.startAngle/2 + d.endAngle/2
                    : d.startAngle/2  + d.endAngle/2 + Math.PI ;
                var translate = (d.endAngle < Math.PI)
                    ? labelArc2.centroid(d)
                    : labelArc.centroid(d);
                return "translate(" + translate + ") rotate(-90) rotate(" + (midAngle * 180/Math.PI) + ")"; })

            .attr('dy', '.35em')
            .attr('font-size', '12')
            .text(function(d) { return d.data.key; })
            .style('font-family', 'sans-serif');

        // Define the div for the tooltip
        var toolTip = select(parent)
            .append('div')
            .attr('class', 'tooltip hide')
            .style('position', 'absolute');

        // Mouse events
        select(node)
            .selectAll('path')
            // Show tooltip on mouseover
            .on('mouseover', function(d) {
                // Show number of element
                toolTip.attr('class', 'tooltip show')
                    .html('[ ' + d.data.value + ' ]')
                    .style('left', (event.layerX + 10) + 'px')
                    .style('top', (event.layerY - 20) + 'px')
            })
            // Hide tooltip on mouse out
            .on('mouseout',  function(d) {
                toolTip.attr('class', 'tooltip hide')
            });
    }

    render() {
        return (
            <div ref={parent => this.parent = parent}>
            <svg ref={node => this.node = node}
                 width={this.state.width}
                 height={this.state.height}
                 className="donutChart">
                {(!this.props.data)
                    ? <ChartMessage width={this.state.width}
                                    height={this.state.height} />
                    : null}
            </svg>
                </div>
        )
    }
}

export default DonutChart