import React, { Component } from 'react'
import './App.css'
import { select, event } from 'd3-selection'
import { treemap, treemapBinary } from 'd3-hierarchy'
import { zoom } from 'd3-zoom'
import ColorSetter from './ColorSetter'
import ChartMessage from './ChartMessage'
import ShowTooltips from './ShowTooltips'

class TreemapChart extends Component {
    constructor(props){
        super(props);
        this.createContainer = this.createContainer.bind(this);
        this.createTreemap = this.createTreemap.bind(this);
        this.state = {
            width: 500,
            height: 500
        };
    }

    componentDidMount() {
        this.createContainer();
        this.createTreemap();
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
        this.createTreemap();
    }

    createContainer() {
        const node = this.node;
        select(node)
            .append('g')
            .attr('class', 'parent')
            .attr('transform', 'translate(' + 50 + ',' + 20 + ')');
    }

    createTreemap() {
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
        const width = this.state.width - 100;
        const height = this.state.height - 40;

        // Add zoom function to chart
        select(node).call(zoom()
            .scaleExtent([1 / 2, 8])
            .on('zoom', zoomed));

        function zoomed() {
            select(node)
                .select('.parent')
                .attr('transform', event.transform);
        }

        // Layout
        root.sum(function (d) { return 1; });
        const treemapChart = treemap()
            .size([width, height])
            .tile(treemapBinary)
            .paddingOuter(5)
            .paddingInner(2);
        treemapChart(root);

        // Add nodes
        select(node)
            .select('.parent')
            .selectAll('rect')
            .data(root.descendants())
            .enter()
            .append('rect')
            .attr('fill', function(d) {
                if(d.data.type === 'element') {
                    return ColorSetter(d.data.tagName)
                }
                return ColorSetter(d.data.type)
            })
            .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'})
            .attr('width', function(d) { return d.x1 - d.x0; })
            .attr('height', function(d) { return d.y1 - d.y0; })
            .style('stroke', 'white')
            .style('opacity', '0.7');

        // Define the div for the tooltip
        var toolTip = select(parent)
            .append('div')
            .attr('class', 'tooltip hide')
            .style('position', 'absolute');

        // Mouse events
        select(node)
            .selectAll('rect')
            // Show tooltip on mouseover
            .on('mouseover', function(d) {
                ShowTooltips(d, toolTip, true);
            })
            // Hide tooltip on mouse out
            .on('mouseout',  function(d) {
                ShowTooltips(d, toolTip, false);
            });
    }

    render() {
        return (
            <div ref={parent => this.parent = parent} className="treemapChart">
            <svg ref={node => this.node = node}
                 width={this.state.width}
                 height={this.state.height} >
                {(!this.props.data)
                    ? <ChartMessage width={this.state.width}
                                    height={this.state.height} />
                    : null}
            </svg>
                </div>
        );
    }
}

export default TreemapChart
