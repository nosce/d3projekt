function ColorSetter(element) {
    // Defines colors for visualizing the node types
    switch (element) {
        case 'html':
            return 'white';
        case 'comment':
            return '#93B5C6';
        case 'text':
            return '#BD4F6C';
        case 'div':
        case 'span':
            return '#93c6be';
        case 'a':
            return '#DDEDAA';
        case 'script':
        case 'link':
            return '#D7816A';
        case 'img':
        case 'svg':
        case 'canvas':
            return '#F0CF65';
        default:
            return '#DCDCDC';
    }

}

export default ColorSetter
