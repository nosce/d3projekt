import { event } from 'd3-selection'

function ShowTooltips(d, parent, show) {
    if(show) {
        if (d.data.type === 'element') {
            // Show attributes
            var attributes = 'attributes: none';
            if (d.data.attributes) {
                attributes = '';
                for (var attr of d.data.attributes) {
                    attributes += attr.key + ': ' + attr.value + '<br/>';
                }
            }
            // Show tooltip with tag name and attributes
            parent.attr('class', 'tooltip show')
                .html('[ ' + d.data.tagName + ' ]<br/>' + attributes)
                .style('left', (event.layerX + 10) + 'px')
                .style('top', (event.layerY - 20) + 'px')

        } else if (d.data.type === 'text') {
            // Show content of text nodes
            parent.attr('class', 'tooltip show')
                .html('[ ' + d.data.type + ' ]<br/>' + d.data.content)
                .style('left', (event.layerX + 10) + 'px')
                .style('top', (event.layerY - 20) + 'px')

        } else {
            // Show element type
            parent.attr('class', 'tooltip show')
                .html('[ ' + d.data.type + ' ]')
                .style('left', (event.layerX + 10) + 'px')
                .style('top', (event.layerY - 20) + 'px')
        }
    } else {
        return (
        parent.attr('class', 'tooltip hide')
        );
    }

    return null;
}

export default ShowTooltips
