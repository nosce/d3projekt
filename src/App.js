import React, { Component } from 'react'
import FileBox from './FileBox'
import './App.css'
import ChartSelector from './ChartSelector'
import DonutChart from './DonutChart'
import WordBubbles from './WordBubbles'
import Footer from './Footer'
import Legend from './Legend'
import DownloadButton from './DownloadButton'
import Brush from './Brush'
import { hierarchy } from 'd3-hierarchy'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileData: null,
            fileDepth: 0,
            brushExtent: [0, 5],
            fileHierarchy: null
        };
        this.donutRef = React.createRef();
        this.bubbleRef = React.createRef();
    }

    getFileData = (uploadedFile) => {
        // Reset values
        this.setState({fileDepth: 0});
        this.setState({fileHierarchy: null});
        this.setState({fileData: null});
        // Load data
        this.setState({ fileData: uploadedFile });

        if(uploadedFile) {
            // Get hierarchy of json file
            const data = hierarchy(uploadedFile, function (d) {
                // Filter out all empty nodes
                var childNodes = [];
                if (d.children) {
                    for (var child of d.children) {
                        if (!(child.type === 'text' && child.content.match(/\n+\s*\W*/g))) {
                            childNodes.push(child);
                        }
                    }
                }
                return childNodes;
            });
            this.setState({fileDepth: data.height + 1});
            this.setState({fileHierarchy: data});
            this.setState({fileData: data.copy()});
        }
    };

    onBrush = (brushRange) => {
        this.setState({ brushExtent: brushRange });
        // Get copy of original hierarchy
        const root = this.state.fileData.copy();
        var startDepth = brushRange[0];
        var endDepth = brushRange[1]-1;
        root.children.forEach(trim);
        trimFront(root);
        this.setState({ fileHierarchy: root });
        console.log(root);

        // Trims the tree branches from the front
        function trimFront(d) {
            if(d === root) {
                d._children = d.children;
                root.children = null;
                d._children.forEach(trimFront);
            } else {
                if (d.depth === startDepth) {
                    d.parent = root;
                    if(!root.children) { root.children = []; }
                    root.children.push(d)
                }
                d.depth = d.depth - startDepth + 1;
                if (d.children) {
                    d._children.forEach(trimFront);
                }
            }
        }
        
        // Trims the tree branches from the back
        function trim(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(trim);
                if (d.depth >= endDepth) {
                    d.children = null;
                }
            }
        }
    };

    render() {
        var fileData = this.state.fileHierarchy;
        var fileDepth = this.state.fileDepth;
        return (
            <div className='App'>
                <div className='App-header'>
                    <h2>web page analyzer</h2>
                </div>
                
                <FileBox submitFileData={this.getFileData} />
                {(fileData)
                    ? <Brush changeBrush={this.onBrush} size={[600, 50]} extend={fileDepth}/>
                    : null }
                <Legend />
                <ChartSelector data={fileData} defaultChartType="tree"/>
                <div className="chartGroup">
                    <DonutChart data={fileData} ref={this.donutRef}/>
                    {(fileData)
                        ? <DownloadButton chart={this.donutRef}
                                          width='500'
                                          height='500'/>
                        : null}
                </div>
                <div className="chartGroup">
                    <WordBubbles data={fileData} ref={this.bubbleRef}/>
                    {(fileData)
                        ? <DownloadButton chart={this.bubbleRef}
                                          width='500'
                                          height='500'/>
                        : null}
                </div>
                <Footer />
            </div>


        )
    }
}
export default App