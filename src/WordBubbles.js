import React, { Component } from 'react'
import './App.css'
import { select } from 'd3-selection'
import { hierarchy } from 'd3-hierarchy'
import { pack } from 'd3-hierarchy'
import ChartMessage from './ChartMessage'

class WordBubbles extends Component {
    constructor(props){
        super(props);
        this.createContainer = this.createContainer.bind(this);
        this.createWordBubbles = this.createWordBubbles.bind(this);
        this.wordCounter = this.wordCounter.bind(this);
        this.state = {
            width: 500,
            height: 500
        };
    }

    componentDidMount() {
        this.createContainer();
    }

    componentDidUpdate() {
        const node = this.node;
        // Delete previous content and redraw
        select(node)
            .select('.parent')
            .selectAll('*')
            .remove();
        this.createWordBubbles();
    }

    createContainer() {
        const node = this.node;
        select(node)
            .append('g')
            .attr('class', 'parent')
            .attr('transform', 'translate(' + 50 + ',' + 20 + ')');
    }

    createWordBubbles() {
        const node = this.node;
        
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

        // Flatten hierarchical data, filter out text nodes and count words
        const flatData = root.descendants();
        var textData = "";
        for (var element of flatData) {
            if (element.data.type === 'text') {
                textData += element.data.content + " ";
            }
        }
        const wordCount = {children: this.wordCounter(textData)};

        // Prepare data for display
        const nodes = hierarchy(wordCount)
            .sum(function(d) { return d.frequency; });
        const bubbles = pack(root)
            .size([width, height])
            .padding(1);

        // Containers
        var elements = select(node)
            .select('.parent')
            .selectAll('.bubble')
            .data(bubbles(nodes).descendants())
            .enter()
            .append('g')
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        // Bubbles
        elements.append('circle')
            .attr('fill', function(d) {
                if(d.data.word) {
                    return '#BD4F6C';
                }
                return 'none'
            })
            .attr('opacity', '0.')
            .attr('r', function(d) {
                return d.r;
            });

        // Text content
        elements.append('text')
            .text(function(d) {
                return d.data.word;
            })
            .attr('dy', '.2em')
            .attr('font-size', function(d){
                return d.r/3;
            })
            .style('text-anchor', 'middle')
            .style('font-family', 'sans-serif');

    }

    wordCounter(text) {
        // Taken from: https://gist.github.com/rocktronica/2625413
        var sWords = text.toLowerCase().trim().replace(/[\W\d]/g, ' ').split(/[\s]+/g).sort();
        var iWordsCount = sWords.length;

        var ignore = ['and', 'the', 'to', 'a', 'of', 'for', 'as', 'i', 'with', 'it', 'is', 'on', 'that', 'this', 'can', 'in', 'be', 'has', 'if',
            'und', 'der', 'die', 'das', 'ein', 'eine', 'einen', 'einem', 'eines', 'dass', 'zu', 'in', 'an', 'am', 'es', 'von', 'wie', 'ist'];
        ignore = (function () {
            var o = {};
            var iCount = ignore.length;
            for (var i = 0; i < iCount; i++) {
                o[ignore[i]] = true;
            }
            return o;
        }());

        var counts = {};
        for (var i = 0; i < iWordsCount; i++) {
            var sWord = sWords[i];
            if (!ignore[sWord]) {
                counts[sWord] = counts[sWord] || 0;
                counts[sWord]++;
            }
        }

        var wordCounts = [];
        for (sWord in counts) {
            wordCounts.push({
                word: sWord,
                frequency: counts[sWord]
            });
        }
        wordCounts.sort(function (a, b) {
            return (a.frequency > b.frequency) ? -1 : ((a.frequency < b.frequency) ? 1 : 0);
        });
        // Truncate array to 20 elements
        if (wordCounts.length >= 20) {
            wordCounts.length = 20;
        }
        return wordCounts;
    }

    render() {
        return (
            <svg ref={node => this.node = node}
                 width={this.state.width}
                 height={this.state.height}
                 className="wordBubbles">
                {(!this.props.data)
                    ? <ChartMessage width={this.state.width}
                                    height={this.state.height} />
                    : null}
            </svg>
        )
    }
}

export default WordBubbles