import React, {Component} from 'react'
import './App.css'
import {select, event} from 'd3-selection'
import {scaleLinear} from 'd3-scale'
import {brushX} from 'd3-brush'
import {axisBottom} from 'd3-axis'

class Brush extends Component {
    constructor(props) {
        super(props);
        this.createBrush = this.createBrush.bind(this)
    }

    componentDidMount() {
        this.createBrush();
    }

    componentDidUpdate() {
        this.createBrush();
    }

    createBrush() {
        const node = this.node;
        const max = this.props.extend;
        const scale = scaleLinear().domain([1, max])
            .range([0, this.props.size[0]-50]);

        const levelBrush = brushX()
            .extent([[25, 0], [this.props.size[0]-25, this.props.size[1]]])
            .on("brush", brushed)
            .on("end", brushend);

        const levelAxis = axisBottom()
            .scale(scale)
            .ticks((max < 20) ? max : max/2);

        select(node)
            .selectAll("g.brushaxis")
            .data([0])
            .enter()
            .append("g")
            .attr("class", "brushaxis")
            .attr("transform", "translate(25,25)");

        select(node)
            .select("g.brushaxis")
            .call(levelAxis);

        select(node)
            .selectAll("g.brush")
            .data([0])
            .enter()
            .append("g")
            .attr("class", "brush");

        select(node)
            .select("g.brush")
            .call(levelBrush);

        const brushFn = this.props.changeBrush;
        function brushed() {
            if (event.sourceEvent.type === "brush") return;
            if (event.selection === null) return;
            const selectedExtent = event.selection.map(d => scale.invert(d-25));
            const rounded = selectedExtent.map(d => Math.round(d));
            select(this).call(event.target.move, [rounded.map(scale)[0]+25, rounded.map(scale)[1]+25]);
        }

        function brushend() {
            if (event.selection === null) return;
            const selectedExtent = event.selection.map(d => scale.invert(d-25));
            brushFn(selectedExtent);
        }

    }

    render() {
        return (
            <div className="brushBox">
                <svg ref={node => this.node = node}
                     width={this.props.size[0]} height={this.props.size[1]}/>
            </div>
        );
    }
}

export default Brush