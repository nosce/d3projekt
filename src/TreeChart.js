import React, { Component } from 'react'
import './App.css'
import { select, event } from 'd3-selection'
import { linkVertical } from 'd3-shape'
import { tree } from 'd3-hierarchy'
import { zoom } from 'd3-zoom'
import ColorSetter from './ColorSetter'
import ShowTooltips from './ShowTooltips'
import StrokeSetter from './StrokeSetter'
import ChartMessage from './ChartMessage'

class TreeChart extends Component {
    constructor(props){
        super(props);
        this.createContainer = this.createContainer.bind(this);
        this.createTreeChart = this.createTreeChart.bind(this);
        this.state = {
            width: 850,
            height: 400
        };
    }

    componentDidMount() {
        this.createContainer();
        this.createTreeChart();
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
        this.createTreeChart();
    }

    createContainer() {
        const node = this.node;
        select(node)
            .append('g')
            .attr('class', 'parent')
            .attr('transform', 'translate(' + 50 + ',' + 20 + ')');
    }

    createTreeChart() {
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

        // Containers for links and nodes
        select(node)
            .select('.parent')
            .append('g')
            .attr('class', 'links');
        select(node)
            .select('.parent')
            .append('g')
            .attr('class', 'nodes');

        // Layout
        const treeChart = tree().size([width, height]);
        treeChart(root);

        // Add nodes
        select(node)
            .select('.nodes')
            .selectAll('circle')
            .data(root.descendants())
            .enter()
            .append('circle')
            .attr('fill', function(d) {
                if(d.data.type === 'element') {
                    return ColorSetter(d.data.tagName)
                }
                return ColorSetter(d.data.type)
            })
            .attr('stroke', function(d) {
                if(d.data.type === 'element') {
                    return StrokeSetter(d.data.tagName)
                }
                return StrokeSetter(d.data.type)
            })
            .attr('cx', function(d) {return d.x;})
            .attr('cy', function(d) {return d.y;})
            .attr('r', 3);

        // Add links
        var linkLines = linkVertical()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; });
        select(node)
            .select('.links')
            .selectAll('.link')
            .data(root.links())
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', linkLines)
            .attr('fill', 'none')
            .attr('stroke', '#DCDCDC');

        // Define the div for the tooltip
        var toolTip = select(parent)
            .append('div')
            .attr('class', 'tooltip hide')
            .style('position', 'absolute');
        
        // Mouse events
        select(node)
            .selectAll('circle')
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
            <div ref={parent => this.parent = parent} className="treeChart">
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

export default TreeChart