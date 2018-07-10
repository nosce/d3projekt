import React, { Component } from 'react'
import './App.css'
import { select, event, selection } from 'd3-selection'
import { partition } from 'd3-hierarchy'
import { arc } from 'd3-shape'
import { zoom } from 'd3-zoom'
import ColorSetter from './ColorSetter'
import ChartMessage from './ChartMessage'
import ShowTooltips from './ShowTooltips'

class SunburstChart extends Component {
    constructor(props){
        super(props);
        this.createContainer = this.createContainer.bind(this);
        this.createSunburst = this.createSunburst.bind(this);
        this.state = {
            width: 500,
            height: 500
        };
    }

    componentDidMount() {
        this.createContainer();
        this.createSunburst();
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
        this.createSunburst();
    }

    createContainer() {
        const node = this.node;
        select(node)
            .append('g')
            .attr('class', 'parent')
            .attr('transform', 'translate(' + (this.state.width - 100)/2 + ',' + (this.state.height - 40)/2 + ')');
    }

    createSunburst() {
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
        const radius = Math.min(width, height) / 2;
        
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
        const sunburstChart = partition().size([2 * Math.PI, radius]);
        sunburstChart(root);

        const sunburstArc = arc()
            .startAngle(function (d) { return d.x0 })
            .endAngle(function (d) { return d.x1 })
            .innerRadius(function (d) { return d.y0 })
            .outerRadius(function (d) { return d.y1 });

        // Add nodes
        select(node)
            .select('.parent')
            .selectAll('path')
            .data(root.descendants())
            .enter()
            .append('path')
            .attr('d', sunburstArc)
            .attr('x', function(d) { return d.x0; })
            .attr('y', function(d) { return d.y0; })
            .attr('width', function(d) { return d.x1 - d.x0; })
            .attr('height', function(d) { return d.y1 - d.y0; })
            .attr('fill', function(d) {
                if(d.data.type === 'element') {
                    return ColorSetter(d.data.tagName)
                }
                return ColorSetter(d.data.type)
            })
            .style('stroke', '#fff');

        // Define the div for the tooltip
        var toolTip = select(parent)
            .append('div')
            .attr('class', 'tooltip hide')
            .style('position', 'absolute');

        // Moving elements to front of hierarchy
        selection.prototype.moveToFront = function() {
            return this.each(function(){
                this.parentNode.appendChild(this);
            });
        };

        // Moving elments back in hierarchy
        selection.prototype.moveToBack = function() {
            return this.each(function () {
                var firstChild = this.parentNode.firstChild;
                if (firstChild) {
                    this.parentNode.insertBefore(this, firstChild);
                }
            });
        };

        // Mouse events
        select(node)
            .selectAll('path')
            // Show tooltip on mouseover
            .on('mouseover', function(d) {
                ShowTooltips(d, toolTip, true);
                select(this).moveToFront();
            })
            // Hide tooltip on mouse out
            .on('mouseout',  function(d) {
                ShowTooltips(d, toolTip, false);
                select(this).moveToBack();
            });
    }

    render() {
        return (
            <div ref={parent => this.parent = parent} className="sunburstChart">
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

export default SunburstChart